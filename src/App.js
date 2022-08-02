import  { useState} from "react" 
import PostsTable from "./components/main/PostsTable"
import Header from "./components/navbar/Header"
import Login from "./components/login/Login"
import Privileges from "./components/privileges/Privileges"
import CreatePost from "./components/main/CreatePost"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Swal from 'sweetalert2';
import './App.css';
import SignUp from "./components/Registration/SignUp"


const ProtectedRoute = ({ currentUser, children }) => {
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
};



const loginUser = async (credentials) =>{
  try{
    const userLoginResponse = await fetch('https://safe-ridge-27689.herokuapp.com/login', {
      method: 'POST',
      body: JSON.stringify({
        username: credentials.username,
        password: credentials.password,
     }),
     headers: {
        'Content-type': 'application/json; charset=UTF-8',
     },
    })

    const data = await userLoginResponse.json()

    return data;
  }catch(err){
    console.log(err)
  }
}

function App() {


  //login implementation
  const [loginInput, setLoginInput] = useState({
    username:'',
    password:''
  })
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')));  
  

  const handleInputLogin = (e) =>{
    e.preventDefault();

    setLoginInput({
      ...loginInput,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmitLogin =async function(e) {
    e.preventDefault();
    
    const response = await loginUser(loginInput);

    if('token' in response){
      Swal.fire({
        title: 'Success',
        text: 'You`re log in',
        icon: 'success',
        confirmButtonText: 'Ok'
      }).then((value)=>{
        localStorage.setItem('token', response['token']);
        localStorage.setItem('user', JSON.stringify(response['user']));
        setCurrentUser(JSON.parse(localStorage.getItem('user')));
        window.location.href = '/';
      })
    }
    else{
      Swal.fire({
        title: 'Error!',
        text: 'Do you want to continue',
        icon: 'error',
        confirmButtonText: 'Cool'
      })
    }

  }

  
  const handleLogout = async function(e){
    e.preventDefault()
    
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setCurrentUser(null);
    window.location.href = '/';
  }



  return (
    <div className="App">
      <BrowserRouter>
        <Header handleLogout={handleLogout}  currentUser={currentUser}/>
        <Routes>
          <Route path="member-only-front/" element={<PostsTable  currentUser={currentUser}/>}/>
          <Route path="member-only-front/post" element={
            <ProtectedRoute currentUser={currentUser}>
              <CreatePost/>
            </ProtectedRoute>
          }/>
          <Route path="member-only-front/login" element={<Login handleSubmitLogin= {handleSubmitLogin} handleInputLogin={handleInputLogin}/>}/>
          <Route path="member-only-front/privileges" element={
            <ProtectedRoute currentUser={currentUser}>
              <Privileges/>
            </ProtectedRoute>   
          }/>
          <Route path="signup" element={<SignUp />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Swal from 'sweetalert2';
import  { useState} from "react"



const SignUp = (props)=>{

    const [userInput, setUserInput] = useState({
        firstname: '',
        lastname: '',
        username: '',
        password: ''
    })

    const handleUserInput = (e) =>{
        e.preventDefault();
        setUserInput({
            ...userInput,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmitSignUp = async (e)=>{
        e.preventDefault();

        try{
            const response = await fetch('https://safe-ridge-27689.herokuapp.com/signup', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify({
                    firstname: userInput.firstname,
                    lastname: userInput.lastname,
                    username: userInput.username,
                    password: userInput.password
                })
            })
    
            const data = await response.json();
            
            if(data.status ==='OK'){
                Swal.fire({
                    title: 'Success',
                    text: data.message,
                    icon: 'success',
                    confirmButtonText: 'Ok'
                }).then((value)=>{ window.location.href = 'member-only-front/login'})
            }else{
                Swal.fire({
                    title: 'Error!',
                    text: 'Do you want to continue',
                    icon: 'error',
                    confirmButtonText: 'Cool'
                  })
            }
        }catch(err){
            console.log(err)
        }
       
    }

    return (
        <div className="divCreateUser">
            <Box sx={{display:"flex", justifyContent: "center"}}>
                <Card sx={{minWidth: 500, minHeight: 350, marginTop:25, display: "flex", flexDirection: "column"}}>
                    <Typography variant='h5'>Please sign up</Typography>
                    <CardContent sx={{ display: "flex", flexDirection: "column"}}>
                        <TextField id="outlined-basic" label="Enter a firstname" variant="outlined" name="firstname" onChange={handleUserInput} sx={{minWidth: 300, marginBottom:3}}/>
                        <TextField id="outlined-basic" label="Enter a lastname" variant="outlined" name="lastname"  onChange={handleUserInput}  sx={{minWidth: 300, marginBottom:3}}/>
                        <TextField id="outlined-basic" label="Enter a username" variant="outlined" name="username"  onChange={handleUserInput} sx={{minWidth: 300, marginBottom:3}}/>
                        <TextField id="outlined-basic" label="Enter a password" type="password" variant="outlined" name="password" onChange={handleUserInput}   sx={{minWidth: 300, marginBottom:3}}/>
                    </CardContent>
                    <CardActions  sx={{display:"flex", justifyContent: "center"}}>
                        <Button variant='outlined' onClick={handleSubmitSignUp}>Sign up</Button>
                    </CardActions>
                </Card>
            </Box>
            
        </div>
    )
}

export default SignUp
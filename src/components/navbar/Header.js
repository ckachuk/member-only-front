import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";

const LoggedIn = (props)=>{
    return(
        <div>
            <Link to='privileges'><Button color="inherit">Privileges</Button></Link>
            <Link to='/'><Button color="inherit" onClick={props.handleLogout}>Logout</Button></Link>
            <Link to='post'><Button color="inherit">Create a post</Button></Link>
        </div>
    )
}


const LoggedOut = (props)=>{
    return(
        <div>
            <Link to='/login'><Button color="inherit">Login</Button></Link>
            <Link to='/signup'><Button color="inherit">SignUp</Button></Link>
        </div>
    )
}

const Header = (props)=>{
    const loginStatus = props.currentUser;

    return(    
        <div className="divHeader">
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Link to='/'><Typography variant="h6" component="div" >Member only app</Typography></Link>
                        <Box sx={{ display: "flex", flexDirection:"row-reverse", flexGrow: 1  }}>
                            {loginStatus? (<LoggedIn handleLogout={props.handleLogout}/> ): (<LoggedOut />)}
                        </Box>     
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    )
}


export default Header
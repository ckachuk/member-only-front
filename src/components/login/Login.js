import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

const Login = (props)=>{

    return(
        <div className="divLogin">
            <Box sx={{display:"flex", justifyContent: "center"}}>
                <Card sx={{minWidth: 500, minHeight: 300, marginTop:25, display: "flex", flexDirection: "column"}}>
                    <Typography variant='h5'>Please login</Typography>
                    <CardContent sx={{ display: "flex", flexDirection: "column"}}>
                        <TextField id="outlined-basic" label="username" variant="outlined" name='username' onChange={props.handleInputLogin} sx={{minWidth: 300, marginBottom:3}}/>
                        <TextField id="outlined-basic" label="password" variant="outlined" name='password' type='password' onChange={props.handleInputLogin} sx={{minWidth: 300, marginBottom:3}}/>
                    </CardContent>
                    <CardActions  sx={{display:"flex", justifyContent: "center"}}>
                        <Button variant='outlined' onClick={props.handleSubmitLogin}>Login</Button>
                    </CardActions>
                </Card>
            </Box>
            
        </div>
    )
}


export default Login

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

const PrivilegeCard = (props)=>{


    return(
        <div className="divPrivileges">
            
                <Card sx={{minWidth: 400, margin: 4 }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Enter the key to become {props.status}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <TextField id="outlined-basic" label="Enter a key" variant="outlined" onChange={props.handleInput} sx={{minWidth: 300, marginRight:2}}/>
                        <Button size="large" variant="contained" onClick={props.handleSubmit}>Enter</Button>
                    </CardActions>
                </Card>
           
        </div>
    )
}


export default PrivilegeCard
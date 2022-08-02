import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Swal from 'sweetalert2';

const Post = (props)=>{

    const postInfo = props.postInfo;
    const currentUser =  JSON.parse(localStorage.getItem('user'))

    const deletePost = async (e)=>{
        
        const response = await fetch('https://safe-ridge-27689.herokuapp.com/post/'+ props.postid + '/delete', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization' : `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                userid: currentUser._id
            })
        }) 
        
        const data = await response.json();

        if(data.status === 'FAILED CREDENTIALS'){
            Swal.fire({
                title: 'Error',
                text: data.message,
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }
        else if(data.status === 'OK'){
            Swal.fire({
                title: 'Success',
                text: data.message,
                icon: 'success',
                confirmButtonText: 'Ok'
            })
        }
    }
    
    const formattedDate = Array.from(postInfo.timestamp).splice(0, 10)

    return(
        <div className="divPost">
            <Box sx={{ display:"flex",
                justifyContent:"center",
                margin:2 
            }}>
                <Card variant="outlined" sx={{ minWidth: 500,
                    minHeight: 300,
                    display:"grid",
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: 1,
                    gridTemplateRows: 'auto',
                    gridTemplateAreas: `". body body ."
                    ". . . ."
                    "body2 body2 actions actions"`,
                }}>
                    <CardContent sx={{ gridArea:"body" }}>
                        <Typography variant='body1' sx={{marginBottom: 5}}>Title: {postInfo.title}</Typography>
                        <Typography variant='body1'>{postInfo.text}</Typography>
                    </CardContent>
                    <CardActions sx={{ gridArea:"actions",display:"flex", flexDirection:"row-reverse"}}>
                        <Button variant="outlined" color="error" onClick={deletePost}  sx={{ maxWidth:150, maxHeight:30, marginRight:3 }}>
                            DELETE POST
                        </Button>
                    </CardActions>
                    <CardContent sx={{ gridArea:"body2", display:"flex", alignItems:"center", justifyContent:"center"}}>
                        <Typography variant='body2' sx={{marginRight:5}}>{currentUser ? postInfo.user.username : 'Anonymous'}</Typography>
                        <Typography variant='body2'>{currentUser ? formattedDate : ''}</Typography>
                    </CardContent>
                </Card>
            </Box>
          
        </div>
    );
}


export default Post;
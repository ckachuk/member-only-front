import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Swal from 'sweetalert2';
import  { useState} from "react"


const CreatePost = (props)=>{

    const [postInput, setPostInput] = useState({
        title: '',
        text: '',
    })

    const handlePostInput = (e) =>{
        e.preventDefault()
        setPostInput({
            ...postInput,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmitPost = async (e) =>{
        e.preventDefault();

        try{
            const response = await fetch('https://safe-ridge-27689.herokuapp.com/post', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'Authorization' : `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    title: postInput.title,
                    text: postInput.text,
                }),

            })
    
            const data = await response.json();
            if(data.status ==='OK'){
                Swal.fire({
                    title: 'Success',
                    text: data.message,
                    icon: 'success',
                    confirmButtonText: 'Ok'
                }).then((value)=>{ window.location.href = 'member-only-front/'})
            }else{
                Swal.fire({
                    title: 'Error!',
                    text: 'Do you want to continue',
                    icon: 'error',
                    confirmButtonText: 'Cool'
                  })
            }
        }
        catch(err){
            console.log(err)
        }
        
    }

    return (
        <div className="divCreatePost">
            <Box sx={{display:"flex", justifyContent: "center"}}>
                <Card sx={{minWidth: 500, minHeight: 350, marginTop:25, display: "flex", flexDirection: "column"}}>
                    <Typography variant='h5'>Create a new post</Typography>
                    <CardContent sx={{ display: "flex", flexDirection: "column"}}>
                        <TextField id="outlined-basic" label="Enter a title" variant="outlined" name="title" onChange={handlePostInput} sx={{minWidth: 300, marginBottom:3}}/>
                        <TextField
                            id="outlined-multiline-static"
                            label="Enter a text"
                            multiline
                            rows={4}
                            name="text" onChange={handlePostInput}
                        />
                    </CardContent>
                    <CardActions  sx={{display:"flex", justifyContent: "center"}}>
                        <Button variant='outlined' onClick={handleSubmitPost}>Create</Button>
                    </CardActions>
                </Card>
            </Box>
            
        </div>
    )
}


export default CreatePost
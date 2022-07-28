import Post from "./Post"
import Box from '@mui/material/Box';
import  { useEffect, useState} from "react"



const PostsTable = (props)=>{
    const [posts, setPosts] = useState([])

    useEffect(()=>{
        const getPosts = async ()=>{
          try{
            const response = await fetch('http://localhost:5000/posts')
    
            const data = await response.json();
    
            setPosts(data.posts)
          }
          catch(err){
            console.log(err)
          }
        }
    
        getPosts()
    },[posts])


    const generatePosts = posts.map(element => {
        return <Post key={element._id} postInfo={element} postid={element._id} />
    })
    return(
        <div className="divPostsTable">
            <Box sx={{
                display: "flex",
                flexDirection: "column",
            }}>
                {generatePosts}
            </Box>
        </div>
    );
}
 

export default PostsTable;
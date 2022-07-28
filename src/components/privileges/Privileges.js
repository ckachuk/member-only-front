import Box from '@mui/material/Box';
import PrivilegeCard from './PrivilegeCard';
import  { useState} from "react"
import Swal from 'sweetalert2';

const Privileges = (props)=>{

    const [adminKey, setAdminKey] = useState(null)  
    const [membershipKey, setMembershipKey] = useState(null)  

    const handleAdminKeyInput = (e)=>{
        setAdminKey(e.target.value)
    }
   
    const handleMembershipKeyInput = (e)=>{
        setMembershipKey(e.target.value)
    }
   

    const handleSubmitAdminKey =async (e)=>{
        const user = JSON.parse(localStorage.getItem('user'))

        const response = await fetch('http://localhost:5000/privileges/admin', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization' : `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                adminKey: adminKey,
                userid: user._id
            })
        })

        const data = await response.json();

        if(data.status === 'FAILED ADMIN TRUE'){
            Swal.fire({
                title: 'Error!',
                text:  data.message,
                icon: 'error',
                confirmButtonText: 'Cool'
            })
        }else if(data.status === 'FAILED'){
            Swal.fire({
                title: 'Error!',
                text:  data.message,
                icon: 'error',
                confirmButtonText: 'Cool'
            })
        }else{
            Swal.fire({
                title: 'Success',
                text: data.message,
                icon: 'success',
                confirmButtonText: 'Ok'
            })
        }
    }

    const handleSubmitMembershipKey =async (e)=>{
        const user = JSON.parse(localStorage.getItem('user'))

        const response = await fetch('http://localhost:5000/privileges/membership', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization' : `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                membershipKey: membershipKey,
                userid: user._id
            })
        })

        const data = await response.json();

        if(data.status === 'FAILED MEMBERSHIP TRUE'){
            Swal.fire({
                title: 'Error!',
                text:  data.message,
                icon: 'error',
                confirmButtonText: 'Cool'
            })
        }else if(data.status === 'FAILED'){
            Swal.fire({
                title: 'Error!',
                text:  data.message,
                icon: 'error',
                confirmButtonText: 'Cool'
            })
        }else{
            Swal.fire({
                title: 'Success',
                text: data.message,
                icon: 'success',
                confirmButtonText: 'Ok'
            })
        }
    }

    return(
        <div className="divPrivileges">
            <Box sx={{ display: "flex", justifyContent:"center", marginTop:10}}>
                <PrivilegeCard status="Membership" handleInput={handleMembershipKeyInput} handleSubmit={handleSubmitMembershipKey}/>
                <PrivilegeCard status="Admin" handleInput={handleAdminKeyInput} handleSubmit={handleSubmitAdminKey}/>
            </Box>
        </div>
    )
}


export default Privileges
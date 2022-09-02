import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { changePassword } from '../../features/authSlice';
import { useAppDispatch } from '../../hooks';

const ChangePassword = ({show,setShow}) => {
    const [formData,setFormData] = useState({
        email:show?.email,code:"",password:""
    }) 
    console.log(show?.email);
    
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const ChangepasswordHandle = (e) =>{
      e.preventDefault()
      dispatch(changePassword({formData,navigate,toast}))
      console.log(formData);
     
  }
    const handleChange = (e:any) =>{
      setFormData({...formData,[e.target.name]:e.target.value})
       
  }
  return (
    <div  style={{height:"100vh",backgroundColor:"rgb(163, 163, 73)"}}>
            <Link to="/auth"> <i className="fa-solid fa-backward mt-5" style={{color:"yellow",marginLeft:"20px",fontSize:"25px"}}></i><span style={{color:"black",marginLeft:"10px",fontWeight:"bolder",fontSize:"25px"}}>Back to Login Page</span></Link>
       <div className='container w-50 position-fixed' style={{backgroundImage: "linear-gradient(to right, blue , green)",padding:"40px",top:"50%",left:"50%", transform: "translate(-50%, -50%)"}}>
        <form className='container' onSubmit={ChangepasswordHandle} autoComplete="off">
        <input type="email" className='form-control mb-3' name='email' defaultValue={show?.email} disabled placeholder='Email'/>
          <input type="password" className='form-control mb-3' name='password' placeholder='Password' onChange={handleChange}/>
          <input type="text" className='form-control mb-3 w-25' name='code' placeholder='OTP' onChange={handleChange}/>
          <button type='submit' className='btn btn-danger d-flex align-items-center'>Change Password</button>
        </form>
    </div>
    </div>
  )
}

export default ChangePassword
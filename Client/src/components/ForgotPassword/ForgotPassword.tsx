import React, { useState } from 'react'
import {  Link, useNavigate } from 'react-router-dom';
import { emailPasswordVerify } from '../../api';
import ChangePassword from '../ChangePassword/ChangePassword';

const ForgotPassword = () => {
    const [formData,setFormData] = useState({
        email:"",code:"",password:""
    }) 
    const [show,setShow] = useState(false)
    const navigate = useNavigate();
    const handleClick = () =>{
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        emailPasswordVerify(formData)
        setShow(true)
    }
    const handleChange = (e:any) =>{
      setFormData({...formData,[e.target.name]:e.target.value}) 
  }
  return (
    <div style={{height:"100vh",backgroundColor:"rgb(163, 163, 73)"}}>
       <Link to="/posts"> <i className="fa-solid fa-backward mt-5" style={{color:"yellow",marginLeft:"20px",fontSize:"25px"}}></i><span style={{color:"black",marginLeft:"10px",fontWeight:"bolder",fontSize:"25px"}}>Back to Profile Page</span></Link>
    <div className='container w-50 position-fixed' style={{backgroundImage: "linear-gradient(to right, blue , green)",padding:"40px",top:"50%",left:"50%", transform: "translate(-50%, -50%)"}}>
   
        {!show ? <form onSubmit={handleSubmit} autoComplete="off">
        <input className='form-control mb-3' type="email" name='email' placeholder='Please enter your Email Address' onChange={handleChange}/>
        <button type="submit" className='btn btn-danger w-100' style={{fontSize:"20px",fontWeight:"bolder"}} onClick={handleClick}>Submit</button>
        </form>
      :<ChangePassword />  
      }
     
    </div>
    </div>
  )
}

export default ForgotPassword
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { changePassword } from '../../features/authSlice';
import { useAppDispatch } from '../../hooks';
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from "yup";
import { useForm } from "react-hook-form";
const ChangePassword = ({show,setShow}) => {
  const schema = yup.object().shape({
      
    password: yup
      .string()
      .min(
        6,
        "Passwords must be at least 6 characters"
      )
      .max(24)
      .required("Enter your password"),
   
  });
  
   
    const {
      register,
      handleSubmit,
      formState: { errors }
    } = useForm({
      defaultValues:{
        email:show?.email,
        password:"",
        code:""
      },
      resolver: yupResolver(schema)
    });
    console.log(show?.email);
    
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
   
 
const ChangepasswordHandle = (formData) =>{ 
  dispatch(changePassword({formData,navigate,toast}))
  console.log(formData);
 
}
  return (
    <div  style={{height:"100vh",backgroundColor:"rgb(163, 163, 73)"}}>
            <Link to="/auth"> <i className="fa-solid fa-backward mt-5" style={{color:"yellow",marginLeft:"20px",fontSize:"25px"}}></i><span style={{color:"black",marginLeft:"10px",fontWeight:"bolder",fontSize:"25px"}}>Back to Login Page</span></Link>
       <div className='container w-50 position-fixed' style={{backgroundImage: "linear-gradient(to right, blue , green)",padding:"40px",top:"50%",left:"50%", transform: "translate(-50%, -50%)"}}>
      <form className='container' onSubmit={handleSubmit(ChangepasswordHandle)} autoComplete="off">
        <input type="email" className='form-control mb-3'  value={show?.email} disabled 
       {...register("email")}
        placeholder='Email'/>
          <input type="password" className={`form-control shadow-none ${errors.password?"mb-0":"mb-3"}`} {...register("password")} placeholder='Password' />
                  {errors&& <small className="text-danger">{errors.password?.message}</small>}
          <input type="text" className='form-control mb-3 w-25' {...register("code")} placeholder='OTP' />
          
          <button type='submit' className='btn btn-danger d-flex align-items-center'>Change Password</button>
        </form>
    </div>
    </div>
  )
}

export default ChangePassword
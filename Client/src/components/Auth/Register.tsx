import { gapi } from 'gapi-script';
import  { useEffect } from 'react'
import { useState } from 'react'
import { GoogleLogin } from 'react-google-login';
import { Link, useNavigate } from 'react-router-dom';
import { googleSignIn, login, registerr } from '../../features/authSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from "yup";
import { useForm } from "react-hook-form";

//@ts-expect-error
import video from '../../assets/video.mp4'

const Register = () => {
  
    const schema = yup.object().shape({
        firstName: yup
          .string()
          .required("Please enter your first name")
          .min(2)
          .max(24),
        email: yup.string().email().required("Email is invalid"),
        password: yup
          .string()
          .min(
            6,
            "Passwords must be at least 6 characters, and contain one special character"
          )
          .max(24)
          .required("Enter your password"),
        confirmPassword: yup
          .string()
          .required("Type your password again")
          .oneOf([yup.ref("password")], "Passwords must match")
      });
    const {
        register,
        handleSubmit,
        formState: { errors }
      } = useForm({
        resolver: yupResolver(schema)
      });
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    


    const onSubmit = (formData) =>{
     
            dispatch(registerr({formData,navigate}))
        }
       
 
        
    

 
  
   
   


   return (
    <div className='container'>
        {//@ts-expect-error
        <video src={video} controls={false}  type="video/mp4" loop autoPlay className='position-fixed' style={{right:0,bottom:0,objectFit:"cover"}}/>}
        <div className='position-fixed mb' style={{backgroundColor:'rgba(255, 255, 0, 0.7)',paddingTop:"50px",paddingBottom:"70px",width:"50%", left:"50%",top:"50%",transform: "translate(-50%, -50%)"}}>
        <p className='text-center text-primary' style={{fontWeight:600,fontSize:"25px"}}>Sign Up</p>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off"> 
            <div className='container w-75'>
              
                
                 <>
                <input type="text" className={`form-control shadow-none ${errors.firstName?"mb-0":"mb-3"}`} 
                style={{borderColor:`${errors.firstName? "red":"green"}` }}
                {...register("firstName")} 
                placeholder="First Name" />
                {//@ts-expect-error
                 errors&& <small className="text-danger">{errors.firstName?.message}</small>}
                </>
              
                 

                <input type="email"  className={`form-control shadow-none ${errors.email?"mb-0":"mb-3"}`} 
                style={{borderColor:`${errors.email? "red":"green"}` }} 
                 placeholder="Email Address" {...register("email")}/>
                 {//@ts-expect-error
                  errors&& <small className="text-danger">{errors.email?.message}</small>}

                <input type='password' className={`form-control shadow-none ${errors.password?"mb-0":"mb-3"}`} 
                style={{borderColor:`${errors.password? "red":"green"}` }}
                placeholder="Password" {...register("password")}/>
                {//@ts-expect-error
                  errors&& <small className="text-danger">{errors.password?.message}</small>}
               
             
                 <>
                <input type='password' className={`form-control shadow-none ${errors.confirmPassword?"mb-0":"mb-3"}`} 
                style={{borderColor:`${errors.confirmPassword? "red":"green"}` }}
                {...register("confirmPassword")} placeholder="Confirm Password" />
                 {//@ts-expect-error
                 errors&& <small className="text-danger">{errors.confirmPassword?.message}</small>}
                </>
                
                
                <div className='d-flex justify-content-around mb-3'>
               
                <button type='submit' className='btn btn-outline-success w-25' >Sign Up</button>
                <button type='button' className="btn btn-secondary">
                    <Link to = "/auth"><span style={{color:"black"}}>Already have an account?Sign In</span></Link>
                </button>
                </div>
            </div>
        </form>
      
        </div>
    </div>

  )
}

export default Register
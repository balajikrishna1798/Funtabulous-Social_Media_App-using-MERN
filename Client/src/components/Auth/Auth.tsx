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
import './Auth.css'
//@ts-expect-error
import video from '../../assets/video.mp4'

const Auth = () => {
  
    const schema = yup.object().shape({
      
        email: yup.string().email().required("Email is invalid"),
        password: yup
          .string()
          .min(
            6,
            "Passwords must be at least 6 characters, and contain one special character"
          )
          .max(24)
          .required("Enter your password"),
       
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
    const clientId="205061424218-08uogm1rqah0jsn9ulmbaqr3iskh7q4g.apps.googleusercontent.com"

    
    const onSubmit = (formData) =>{
            dispatch(login({formData,navigate,toast}))
        
    }

  
    const googleSuccess = async(res:any) =>{
        const email = res?.profileObj?.email;
        const name = res?.profileObj?.name;
        const token = res?.tokenId;
        const googleId = res?.googleId;
        const imageUrl = res?.profileObj?.imageUrl;

        const result = {email,name,token,googleId,imageUrl}
        try {
            dispatch(googleSignIn({result,navigate}))
            navigate("/")
            
        } catch (error) {
            console.log(error)
        }
        
    }
    const googleFailure = (err:any) =>{
        console.log(err)
        console.log("Google Login was not successfull")
    }

   
   
  
    
    useEffect(()=>{
        function start(){
        gapi.client.init({
            clientId:clientId,
            scope:"profile"
        })
    }
    gapi.load('client:auth2',start)
    })

   return (
    <div className='container'>
        {//@ts-expect-error
        <video src={video} controls={false}  type="video/mp4" loop autoPlay className='position-fixed' style={{right:0,bottom:0,objectFit:"cover"}}/>}
        <div className='position-fixed videoBG' >
        <p className='text-center text-primary' style={{fontWeight:600,fontSize:"25px"}}>Sign In</p>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off"> 
            <div className='container w-75'>
                 

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
               
                
                
              
                
                <div className='d-flex justify-content-around mb-3'>
                <GoogleLogin
                 
                 clientId={`${clientId}`}
                 render={(renderprops)=>(
                        <button onClick={renderprops.onClick} className="btn btn-outline-danger"  disabled={renderprops.disabled}>
                            Google Login
                        </button>
                    )}
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                    cookiePolicy="single_host_origin"
                />
                <button type='submit' className='btn btn-outline-success' >Sign In</button>
                <button type='button' className="btn btn-secondary">
                  <Link to="/register"><span className='text-light'>If you don't have and account.Create New!!</span></Link>
                </button>
                </div>
            </div>
        </form>
        <Link to="/forgotPassword">
          <p className='text-center text-primary fw-bold' style={{fontSize:"15px"}}>Forgot Password?</p>
        </Link>
        </div>
    </div>

  )
}

export default Auth
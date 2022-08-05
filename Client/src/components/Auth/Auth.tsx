import { gapi } from 'gapi-script';
import React, { useEffect } from 'react'
import { useState } from 'react'
import { GoogleLogin } from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';


const Auth = () => {
    const [formData,setFormdata] = useState({
        firstName:"",email:"",Password:"",Confirm_Password:""
    })
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const clientId="205061424218-08uogm1rqah0jsn9ulmbaqr3iskh7q4g.apps.googleusercontent.com"
    const [isSignup,setIsSignup] = useState(false);
    const [showPassword,setShowPassword] = useState(false)
    const handleSubmit = (e:any) =>{
        e.preventDefault()
        console.log(formData);
        
    }

    const handleChange = (e) =>{
        setFormdata({...formData,[e.target.name]:e.target.value})
         
    }
    const googleSuccess = async(res:any) =>{
        const result = res?.profileObj;
        const token = res?.tokenId;
        try {
            dispatch({type:'Auth',data:{result,token}})
            navigate("/")
            
        } catch (error) {
            
        }
        
    }
    const googleFailure = (err:any) =>{
        console.log(err)
        console.log("Google Login was not successfull")
    }

    const handleShowPassword = () =>{
        setShowPassword((prevShowPassword=>!prevShowPassword))
    }

    const switchMode = () =>{
        setIsSignup((previsSignUp=>!previsSignUp))
    }
    
    useEffect(()=>{
        function start(){
        gapi.client.init({
            clientId:clientId,
            scope:""
        })
    }
    gapi.load('client:auth2',start)
    })
  return (
    <div>
        {isSignup ?'signup' : 'signin'}
        <form onSubmit={handleSubmit} autoComplete="off"> 
            <div>
                 {(
                 isSignup && 
                 <>
                <input type="text" required name="First Name" placeholder="First Name" onChange={handleChange}/>
                </>
                )}
                <input type="email" required name="Email Address" placeholder="Email Address" onChange={handleChange}/>
                <input type={showPassword?'text':'password'} required name="Password" placeholder="Password" onChange={handleChange}/>
                {(
                 isSignup && 
                 <>
                <input type='password' required name="Confirm_Password" placeholder="Confirm Password" onChange={handleChange}/>
                </>
                )}
                <GoogleLogin
                 clientId={`${clientId}`}
                 render={(renderprops)=>(
                        <button onClick={renderprops.onClick} disabled={renderprops.disabled}>
                            Google Login
                        </button>
                    )}
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                />
                <button type='submit'>{isSignup ? 'Sign Up' : 'Sign In'}</button>
                <button type='button' onClick={switchMode}>
                    {!isSignup?"If you don't have and account.Create New!!":"Already have an account?Sign In"}
                </button>
            </div>

        </form>
    </div>

  )
}

export default Auth
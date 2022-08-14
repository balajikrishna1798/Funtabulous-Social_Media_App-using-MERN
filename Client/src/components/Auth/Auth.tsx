import { gapi } from 'gapi-script';
import  { useEffect } from 'react'
import { useState } from 'react'
import { GoogleLogin } from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import { googleSignIn, login, register } from '../../features/authSlice';
import { useAppDispatch } from '../../hooks';


const Auth = () => {
    const [formData,setFormdata] = useState({
        firstName:"",email:"",password:"",confirmPassword:""
    })
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const clientId="205061424218-08uogm1rqah0jsn9ulmbaqr3iskh7q4g.apps.googleusercontent.com"
    const [isSignup,setIsSignup] = useState(false);

    const handleSubmit = (e:any) =>{
        e.preventDefault()
        if(isSignup){
            //@ts-expect-error
            dispatch(register({formData,navigate}))
        }
        else{
            //@ts-expect-error
            dispatch(login({formData,navigate}))
        }
        
    }

    const handleChange = (e:any) =>{
        setFormdata({...formData,[e.target.name]:e.target.value})
         
    }
    const googleSuccess = async(res:any) =>{
        const email = res?.profileObj?.email;
        const name = res?.profileObj?.name
        const token = res?.tokenId;
        const googleId = res?.googleId;
        const result = {email,name,token,googleId}
        try {
            //@ts-expect-error
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
    <div className='container'>
        <p className='text-center text-success' style={{fontWeight:600,fontSize:"25px"}}>{isSignup ?'Sign Up' : 'Sign In'}</p>
        <form onSubmit={handleSubmit} autoComplete="off"> 
            <div className='container w-50'>
                 {(
                 isSignup && 
                 <>
                <input type="text" className="form-control mb-3" required name="firstName" placeholder="First Name" onChange={handleChange}/>
                </>
                )}
                <input type="email" className="form-control mb-3" required name="email" placeholder="Email Address" onChange={handleChange}/>
                <input type='password' className="form-control mb-3" required name="password" placeholder="Password" onChange={handleChange}/>
                {(
                 isSignup && 
                 <>
                <input type='password' className="form-control mb-3"  required name="confirmPassword" placeholder="Confirm Password" onChange={handleChange}/>
                </>
                )}
                <div className='d-flex justify-content-around'>
                <GoogleLogin
                 
                 clientId={`${clientId}`}
                 render={(renderprops)=>(
                        <button onClick={renderprops.onClick} className="btn btn-outline-danger"  disabled={renderprops.disabled}>
                            Google Login
                        </button>
                    )}
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                />
                <button type='submit' className='btn btn-outline-success' >{isSignup ? 'Sign Up' : 'Sign In'}</button>
                <button type='button' onClick={switchMode} className="btn btn-secondary">
                    {!isSignup?"If you don't have and account.Create New!!":"Already have an account?Sign In"}
                </button>
                </div>
            </div>

        </form>
    </div>

  )
}

export default Auth
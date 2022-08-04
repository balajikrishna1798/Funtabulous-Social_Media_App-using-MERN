import React from 'react'
import { useState } from 'react'

const Auth = () => {
    const isSignup = false
    const [showPassword,setShowPassword] = useState(false)
    const handleSubmit = () =>{
    }
    const handleChange = () =>{
    }
    const handleShowPassword = () =>{
        setShowPassword((prevShowPassword=>!prevShowPassword))
    }
    const switchMode = () =>{
        setShowPassword((prevShowPassword=>!prevShowPassword))
    }
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
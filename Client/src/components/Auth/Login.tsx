import React from 'react'

const Login = () => {
  return (
    <div>Login</div>
  )
}

export default Login
// import { useState } from "react"
// import { Link, useNavigate } from "react-router-dom"
// import ts from "typescript"
// import { login } from "../../features/authSlice"
// import { useAppDispatch } from "../../hooks"

// export const Login = () => {
//     const initialstate = {
//         email:"",
//         password:""
//     }

//         const [formData,setFormdata] = useState(initialstate)
//         const {email,password} = formData
//         const dispatch = useAppDispatch()
//         const navigate = useNavigate()
//         const handleSubmit = (e:any) =>{
//             e.preventDefault()        
//             if(email&&password){
//                 //@ts-expect-error
//                 dispatch(login({formData,navigate}))
//             }
//         }
//         const handleChange = (e:any) =>{
//             let {name,value} = e.target;
//             setFormdata({...formData,[name]:value})
//         }
//         return(
//             <div className='container'>
//              <p className='text-center text-success' style={{fontWeight:600,fontSize:"25px"}}>Sign In</p>
//              <form onSubmit={handleSubmit} autoComplete="off"> 
//             <div className='container w-50'>
                
           
      
//                            <input type="email" className="form-control mb-3" required name="email" value={email} placeholder="Email Address" onChange={handleChange}/>
         
           
//                             <input type='password' className="form-control mb-3"  required name="password" value={password} placeholder="password" onChange={handleChange}/>
                            
                            
                            
//                              <button type='submit' className='btn btn-outline-success' >Login</button>
//                             <button type='button' className="btn btn-secondary"><Link to ="/register">
//                             If you don't have and account.Create New!!":"Already have an account?Sign In
//                             </Link>
//                             </button>
//                            </div>
//                        </form>
//                        </div>   
//         )
//     }
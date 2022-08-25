import React, { useState } from 'react'
import { useAppDispatch } from '../../hooks';

const ForgotPassword = () => {
    const dispatch = useAppDispatch()
    const [formData,setFormData] = useState({
        email:""
    }) 
    const handleSubmit = (e) =>{
        e.preventDefault();
        //@ts-expect-error
        dispatch(emailPasswordVerify({formData}))
    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
        <input type="email" name='email' placeholder='EmailId' value={formData.email} onChange={(e)=>setFormData({email:e.target.value})}/>
        <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default ForgotPassword
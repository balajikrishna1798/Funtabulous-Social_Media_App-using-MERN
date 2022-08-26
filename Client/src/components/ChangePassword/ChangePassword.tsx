import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { changePassword } from '../../api';

const ChangePassword = () => {
    const [formData,setFormData] = useState({
        email:"",code:"",password:""
    }) 
    const navigate = useNavigate();
    const ChangepasswordHandle = (e) =>{
      e.preventDefault()
      changePassword(formData)
      console.log(formData);

      navigate("/profile")
  }
    const handleChange = (e:any) =>{
      setFormData({...formData,[e.target.name]:e.target.value})
       
  }
  return (
    <div>
     
        <form onSubmit={ChangepasswordHandle} autoComplete="off">
        <input type="email" className='form-control mb-3' name='email' placeholder='Email' onChange={handleChange}/>
          <input type="password" className='form-control mb-3' name='password' placeholder='Password' onChange={handleChange}/>
          <input type="text" className='form-control mb-3 w-25' name='code' placeholder='OTP' onChange={handleChange}/>
          <button type='submit' className='btn btn-danger d-flex align-items-center'>Change Password</button>
        </form>
    </div>
  )
}

export default ChangePassword
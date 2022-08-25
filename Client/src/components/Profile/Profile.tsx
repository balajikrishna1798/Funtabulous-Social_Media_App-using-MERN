import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {  getMyProfile, updateUser } from '../../features/authSlice'
import { getPostByUser,getPostByGoogleUser} from '../../features/postSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'

const Profile = () => {
  const [formData,setFormdata] = useState({
    name:"",email:""
})

    const user = JSON.parse(localStorage.getItem('profile'));
    const userPosts = useAppSelector((state)=>(state.posts.userPosts))
    const userId = user?.result?._id 
    const googleUserId = user?.result?.googleId;
    const dispatch = useAppDispatch()
    console.log(userId);
    const location = useLocation()
    const submitHandler =  async (e:any) =>{
      e.preventDefault();
        //@ts-expect-error
       await dispatch(updateUser({formData}))
 //@ts-expect-error
       await dispatch(getMyProfile({userId}))
      
    }
    const handleChange = (e:any) =>{
      setFormdata({...formData,[e.target.name]:e.target.value})
       
  }
 
useEffect(()=>{
  
    if(userId){
        //@ts-expect-error
        dispatch(getPostByUser({userId}))
    }
    if(googleUserId){
      //@ts-expect-error
      dispatch(getPostByGoogleUser({googleUserId}))
  }
 
},[userId,googleUserId])
  return (
    <div className='container'>

        <div className='position-relative' style={{zIndex:100}}>
      <Link to="/posts"> <i className="fa-solid fa-backward" style={{color:"blue"}}></i></Link>
      <p className='text-center text-danger' style={{fontWeight:600,fontSize:"40px"}}>Profile</p>
      
      <p ><span style={{fontSize:"25px"}}>Name:</span><span className='text-success' style={{fontWeight:600,fontSize:"25px"}}>&nbsp;{user?.result?.name}</span></p>
      <p className='text-center' style={{fontWeight:600,fontSize:"30px",color:"blue"}}>My Posts</p>
      <form onSubmit={submitHandler}>
        <input type="text" className="form-control mb-3" defaultValue={user?.result?.name} placeholder='Name' name="name" onChange={handleChange}/>
        <input type="text" placeholder='Email' className="form-control mb-3" name="email" onChange={handleChange}/>
        <button type='submit' className='btn btn-danger w-100 mb-5'>Submit</button>
        <Link to="/forgotPassword">
          <p>Forgot Password?</p>
        </Link>
      </form>
      
      <div className="row">
      {
        
        userPosts && userPosts.map((item)=>(
          <div className="col-md-4">
          <div key={item._id}>
          <div className='card'>
         <img src={item.selectedFile} className="card-img-top img-fluid"/>
         <div className="card-body">
         <h6 className='mb-3'>{item.title}</h6>
         {item.tags && <h6>{item.tags.map((tag:any)=>(`#${tag}`))}</h6>}
         <h6>{item.message}.</h6>
         </div>
         </div>
         </div>
    </div>
        ))
      }
      </div>
      </div>
    </div>
 
  )
}

export default Profile
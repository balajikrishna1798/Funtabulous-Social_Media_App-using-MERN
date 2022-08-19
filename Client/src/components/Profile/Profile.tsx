import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getPostByUser,getPostByGoogleUser} from '../../features/postSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'

const Profile = () => {
    const user = JSON.parse(localStorage.getItem('profile'))
    const userPosts = useAppSelector((state)=>(state.posts.userPosts))
    const userId = user?.result?._id 
    const googleUserId = user?.result?.googleId;
    const dispatch = useAppDispatch()
    console.log(userId);
    
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
    <div className='container' style={{}}>
   

        <div className='position-relative' style={{zIndex:100}}>
      <Link to="/posts"> <i className="fa-solid fa-backward" style={{color:"blue"}}></i></Link>
      <p className='text-center text-danger' style={{fontWeight:600,fontSize:"40px"}}>Profile</p>
      
      <p ><span style={{fontSize:"25px"}}>Name:</span><span className='text-success' style={{fontWeight:600,fontSize:"25px"}}>&nbsp;{user?.result?.name}</span></p>
      <p className='text-center' style={{fontWeight:600,fontSize:"30px",color:"blue"}}>My Posts</p>
      <div className="row">
      {
        
        userPosts && userPosts.map((item)=>(
          <div className="col-md-4">
          <div className='card '>
         <img src={item.selectedFile} className="card-img-top img-fluid"/>
         <div className="card-body">
         <h6 className='mb-3'>{item.title}</h6>
         {item.tags && <h6>{item.tags.map((tag:any)=>(`#${tag}`))}</h6>}
         <h6>{item.message}.</h6>
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
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { usersProfile,googleusersProfile } from '../../features/authSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';

const UserProfile = () => {
    const user = useAppSelector(state=>state.auth.user)
    const {id} = useParams()
    const {googleid} = useParams()
    console.log(id);
    const dispatch = useAppDispatch()
    useEffect(()=>{
        if(id){
            //@ts-expect-error
        dispatch(usersProfile({id}))
        }
        if(googleid){
            //@ts-expect-error
        dispatch(googleusersProfile({googleid}))
        }
     },[])
  
  return (
    <div>
        <h4>{user?.user?.name}</h4>
        <h5>{user?.user?.email}</h5>{
            
       user&& user.posts && user.posts.map((item:any)=>(
          <div key={item._id}>
          <div className="col-md-4">
          <div className='card '>
         <img src={item.selectedFile} className="card-img-top img-fluid"/>
         <div className="card-body">
         <h6 className='mb-3'>{item.title}</h6>
         </div>
         </div>
         </div>
         </div>
        
         ))}
        </div>
   
  )
}

export default UserProfile
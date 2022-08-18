import React, { useEffect } from 'react'
import { getPostByUser } from '../../features/postSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'

const Dashboard = () => {
    const user = JSON.parse(localStorage.getItem('profile'))
    const userTours = useAppSelector((state)=>({...state.posts.userPosts}))
    const userId = user?.result?._id;
    const GoogleUserId = user?.result?.googleId;
    const dispatch = useAppDispatch()
    console.log(userId);
    
useEffect(()=>{
    if(userId){
        //@ts-expect-error
        dispatch(getPostByUser({GoogleUserId}))
    }
},[userId])
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard
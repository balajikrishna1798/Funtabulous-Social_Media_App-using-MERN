import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {  getMyProfile, updateUser } from '../../features/authSlice'
import { getPostByUser,getPostByGoogleUser} from '../../features/postSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'
import FileBase64 from 'react-file-base64'

const Profile = () => {
//   const [formData,setFormData] = useState({
//     name:"",email:"",pic:""
// })

const [email,setEmail] = useState("")
const [name,setName] = useState("")
const [pic,setPic] = useState()


    const user = JSON.parse(localStorage.getItem('profile'));
    const userPosts = useAppSelector((state)=>(state.posts.userPosts))
    const userId = user?.result?._id 
    const googleUserId = user?.result?.googleId;
    const dispatch = useAppDispatch()
    const [selectedFile, setSelectedFile] = useState();
    console.log(userId);
    const location = useLocation()
    const submitHandler =  async (e:any) =>{
      e.preventDefault();
    const formData = new FormData();
    formData.append("email",email)
    formData.append("name",name)
    formData.append("pic",pic)


       await dispatch(updateUser(formData))
       await dispatch(getMyProfile(userId))
      
    }
  //   const handleChange = (e:any) =>{
  //     setFormData({...formData,[e.target.name]:e.target.value})
  // }
  // const changeHandler = (event) => {
	// 	setPic({...formData,pic:event.target.files[0]});
  //   console.log(formData.pic);
    
	// };

 
useEffect(()=>{
  
    if(userId){
        dispatch(getPostByUser(userId))
    }
    if(googleUserId){
      dispatch(getPostByGoogleUser(googleUserId))
  }
 
},[userId,googleUserId])
  return (
    <div className='container mb-5'>

        <div className='position-relative' style={{zIndex:100}}>
      <Link to="/posts"> <i className="fa-solid fa-backward" style={{color:"blue"}}></i></Link>
      <p className='text-center text-danger' style={{fontWeight:600,fontSize:"40px"}}>Profile</p>
      
      <p ><span style={{fontSize:"25px"}}>Name:</span><span className='text-success' style={{fontWeight:600,fontSize:"25px"}}>&nbsp;{user?.result?.name}</span></p>
      
      <form onSubmit={submitHandler} encType="multipart/form-data">
        <input type="text" className="form-control mb-3" defaultValue={user?.result?.name} placeholder='Name' name="name" onChange={(e)=>{setName(e.target.value)}}/>
        <input type="text" placeholder='Email' defaultValue={user?.result?.email} className="form-control mb-3" name="email" disabled onChange={(e)=>{setEmail(e.target.value)}}/>
        <label htmlFor="pic"></label>
        <input type="file"
         name="pic" 
         id="pic"
         //@ts-expect-error
         onChange={(e)=>{setPic(e.target.files[0])}} />
        <button type='submit' className='btn btn-danger w-100 mb-1 mt-3'>Submit</button>
        
      </form>
      <p className='text-center' style={{fontWeight:600,fontSize:"30px",color:"blue"}}>My Posts</p>
      <div className="row">
      {
        
        userPosts && userPosts.map((item)=>(
          <div className="col-md-4">
          <div key={item._id}>
          <div className='card'>
         <img src={item.selectedFile} className="card-img-top img-fluid" style={{height:250}}/>
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
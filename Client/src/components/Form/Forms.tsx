import React, { useState,useEffect } from 'react'
import FileBase64 from 'react-file-base64'
import { useSelector } from 'react-redux';
import { Link, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { createPost, updatePost } from '../../features/postSlice';
import { useAppDispatch, useAppSelector } from "../../hooks";
import Navbar from '../NavBar/NavBar';
interface post{
  name:string;
   title:string;
    message:string;
    tags:string[];
    selectedFile:string;
}
const Forms = (props:any) => {
  const user = JSON.parse(localStorage.getItem('profile'))
  const navigate=useNavigate();
  const [postData,setPostdata] = useState<post>({
    name:user?.result?.name,
    title:"",
    message:"",
    tags:[],
    selectedFile:""
  })


  const post = useAppSelector((state:any)=>props.currentId?state.posts.posts.find((p:any)=>p._id===props.currentId):null)
  const dispatch = useAppDispatch()
  const handleSubmit = (e:any) =>{
    e.preventDefault();
    console.log(postData)
    if(props.currentId){
      dispatch(updatePost({id:props.currentId ,postData,navigate}))
      
    }
    else{
      dispatch(createPost({postData,navigate}))
    }
    clear()
  }
  const clear = () =>{
    props.setCurrentId(null);
    setPostdata({name:user?.result?.name,title:"",message:"",tags:[],selectedFile:""})
  }

useEffect(() => {
 if(post){
  setPostdata(post)
 }
}, [post,navigate,dispatch])


  return (
    <>
    <Navbar />
    <div className='container'>
      <form onSubmit={handleSubmit} className='mt-4' autoComplete='off'>
       <div className='text-center fw-bold mb-2'>{!props.currentId?'Creating' : 'Editing'} a Memory</div>
       <input type="text" placeholder='Name' className="form-control mb-3" name="name" value={user?.result?.name} disabled/>

        <input type="text" placeholder='Title' className="form-control mb-3" name="title" value={postData.title} onChange={(e)=>setPostdata({...postData, title:e.target.value})}/>
        <input type="text" placeholder='Tags' className="form-control mb-3" name="tags" value={postData.tags} onChange={(e)=>setPostdata({...postData, tags:e.target.value.split(",")})}/>
        <input type="text" placeholder='Description' className="form-control mb-3" name="message" value={postData.message} onChange={(e)=>setPostdata({...postData, message:e.target.value})}/>
        <div>
          <FileBase64 
          type="file"
          multiple={false}
          onDone={({base64}:any)=>setPostdata({...postData, selectedFile:base64})}
          />
        </div>
        <button className="btn btn-primary mb-3 mt-3" style={{display:"block",width:"100%"}} type='submit'>Submit</button>
        <button className="btn btn-danger" type="button" style={{display:"block",width:"100%"}} onClick={clear}>Clear</button>

      </form>
      </div>
      </>
  
  )
}

export default Forms
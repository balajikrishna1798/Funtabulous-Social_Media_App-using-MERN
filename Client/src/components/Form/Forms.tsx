import React, { useState,useEffect } from 'react'
import FileBase64 from 'react-file-base64'
import { useSelector } from 'react-redux';
import { createPosts, updatePosts } from '../../actions/posts'
import { useAppDispatch } from "../../hooks";
interface post{
   title:string;
    message:string;
    tags:string[];
    selectedFile:string;
}
const Forms = (props:any) => {
  
  const [postData,setPostdata] = useState<post>({
    title:"",
    message:"",
    tags:[],
    selectedFile:""
  })
const user = JSON.parse(localStorage.getItem('profile'))
  const post = useSelector((state:any)=>props.currentId?state.posts.find((p:any)=>p._id===props.currentId):null)
  const dispatch = useAppDispatch()
  const handleSubmit = (e:any) =>{
    e.preventDefault();
    console.log(postData)
    if(props.currentId){
      dispatch(updatePosts(props.currentId ,{...postData,name:user?.result?.name}))
      
    }
    else{
      dispatch(createPosts({...postData,name:user?.result?.name}))
    }
    clear()
  }
  const clear = () =>{
    props.setCurrentId(null);
    setPostdata({title:"",message:"",tags:[],selectedFile:""})
  }
 
useEffect(() => {
 if(post){
  setPostdata(post)
 }
}, [post])

if(!user?.result?.name){
  return(
    <div>
      <h2>SignIn To create your own post</h2>
    </div>
  )
}


  return (
    <div className='container'>
      <form onSubmit={handleSubmit} className='mt-4' autoComplete='off'>
       <div className='text-center fw-bold mb-2'>{!props.currentId?'Creating' : 'Editing'} a Memory</div>
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
  
  )
}

export default Forms
import moment from 'moment'
import { useAppDispatch } from '../../hooks'

import {  useNavigate } from 'react-router-dom'
import { deletePost, likePost } from '../../features/postSlice'

const Post = ({post,setCurrentId}) => {
  const navigate = useNavigate();
  
  const user = JSON.parse(localStorage.getItem('profile'))
    const dispatch = useAppDispatch()


const Likes = () =>{
  
  if(post.likes.length>0){
    return post.likes.find((like:any)=>like===(user?.result?.googleId || user?.result?._id ))
    ?
    (
    <>
    <i className="fa-solid fa-thumbs-up "></i>{post.likes.length>2 ? `you and ${post.likes.length-1} others liked` : `${post.likes.length} like${post.likes.length>1 ? 's':""}`}
    </>
    )
    :
    (
      <><i className="fa-solid fa-thumbs-up "></i>{post.likes.length}{post.likes.length===1?'Like':'Likes'}</>
    )
  }
  return <> <i className="fa-solid fa-thumbs-up "></i>Like</>
}
const openPost = () =>{
  navigate(`/posts/${post._id}`)
}
  return (
    
    <div className='d-flex-column justify-content-center mb-5'>  
   
        <div className='card mt-5' style={{width:"18rem"}} key={post._id}>
          
          <h6 className='position-absolute' style={{zIndex:10}}>{moment(new Date(post.createdAt)).fromNow()}</h6>
          {(user?.result?.googleId===post.creator||user?.result?._id===post.creator)&&(
          <button className='position-absolute'  style={{zIndex:10,marginLeft:"260px",border:"none"}} onClick={()=>setCurrentId(post._id)}>
          <i className="fa-solid fa-ellipsis" style={{marginLeft:"auto"}}></i>
          </button>
          )}
          
        <img src={post.selectedFile} className="card-img-top position-relative" style={{cursor:'pointer'}} onClick={openPost}/>
        
        <div className="card-body">
        <h5 className='position-absolute' style={{top:"19px"}}>{post.name}</h5>
        <h6 className='mb-3'>{post.title}</h6>
        <h6>{post.tags.map((tag:any)=>(`#${tag}`))}</h6>
        <h5>{post.message}</h5>
        {//@ts-expect-error
        <button style={{border:"none",backgroundColor:"white"}} disabled={!user?.result} onClick={()=>dispatch(likePost({id:post._id,navigate}))}>
        <Likes /> 
        </button>}
        {(user?.result?.googleId===post.creator||user?.result?._id===post.creator)&&(
          //@ts-expect-error
        <button style={{border:"none",backgroundColor:"white",marginLeft:"100px"}} onClick={()=>dispatch(deletePost({id:post._id,navigate}))}><i className="fas fa-trash"></i>
         <span style={{color:"blue"}}>Delete</span></button>
        )}
        
        </div>
        
        </div>
       
    </div> 
  )
  }

export default Post
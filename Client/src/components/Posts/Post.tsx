import moment from 'moment'
import { useAppDispatch } from '../../hooks'

import {  Link, useNavigate } from 'react-router-dom'
import { deletePost, likePost } from '../../features/postSlice'
import Comments from '../Comments/Comments'

const Post = ({post,setCurrentId}) => {
  const navigate = useNavigate();
  
  const user = JSON.parse(localStorage.getItem('profile'))
  const userId = user?.result?.googleId || user?.result?._id 
    const dispatch = useAppDispatch()
const handleLike = async () =>{
  //@ts-expect-error
   await dispatch(likePost({id:post._id}))
   
  }
const Likes = () =>{
  
  if(post.likes.length>0){
    return post.likes.find((like:any)=>like===userId)
    ?
    (
    <>
     <i className="fa-solid fa-handshake" style={{color:"blue"}}></i>{post.likes.length>2 ? `you and ${post.likes.length-1} others liked` : `${post.likes.length} like${post.likes.length>1 ? 's':""}`}
    </>
    )
    :
    (
      <> <i className="fa-solid fa-thumbs-up "></i>{post.likes.length}{post.likes.length===1?'Like':'Likes'}</>
    )
  }
  return <> <i className="fa-solid fa-thumbs-up "></i>Like</>
}

const openPost = () =>{
  navigate(`/posts/${post._id}`)
}

  return (
    
    <div className='d-flex-column justify-content-center mb-3'>  
   
        <div className='card mt-5' style={{width:"50%",marginLeft:"auto",marginRight:"auto"}} key={post._id}>
          
          <h6 className='position-absolute' style={{zIndex:10,marginLeft:"10px",color:"yellow"}}>{moment(new Date(post.createdAt)).fromNow()}</h6>
          {(user?.result?.googleId===post.creator||user?.result?._id===post.creator)&&(
          <button className='position-absolute'  style={{zIndex:10,border:"none",right:0,backgroundColor:" rgba(240, 248, 255, 0)"}} onClick={()=>setCurrentId(post._id)}>
          <Link to="/forms"> <i className="fa-solid fa-ellipsis-vertical" style={{color:"black"}}></i></Link>
          </button>
          )}
          
        <img src={post.selectedFile} alt="" className="card-img-top position-relative" style={{cursor:'pointer',height:"500px"}} onClick={openPost}/>
        
        <div className="card-body">
        {
          
       <Link to = {`/${isNaN(post?.creator)?"userProfile":"googleuserProfile"}/${post?.creator}`}>{user && <h5 style={{color:"red"}}>{`Uploaded by ${post.name}`}</h5>}</Link>}
       
        <h6 className='mb-2'>{post?.title}</h6>
        <h6>{post.tags.map((tag:any)=>(`#${tag}`))}</h6>
        <h5>{post.message}</h5>
        <div className='d-flex justify-content-between'>
      
        <button style={{border:"none",backgroundColor:"white"}} disabled={!user?.result} onClick={handleLike}>
        <Likes />
        </button>                                   
        <Comments post={post}/>
        {(user?.result?.googleId===post.creator||user?.result?._id===post.creator)&&(
          //@ts-expect-error
        <button className='' style={{border:"none",backgroundColor:"white"}} onClick={()=>dispatch(deletePost({id:post._id,navigate}))}><i className="fas fa-trash"></i>
         <span>Delete</span></button>
        )}
        </div>
        </div>
        
        </div>
       
    </div> 
  )
  }

export default Post
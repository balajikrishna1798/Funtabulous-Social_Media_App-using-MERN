import moment from 'moment'
import { useAppDispatch } from '../../hooks'
import { deletePosts , likePosts} from '../../actions/posts'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Post = ({post,setCurrentId}) => {
  const location = useLocation()
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('profile'))
    const dispatch = useAppDispatch()
    useEffect(()=>{
     
    },[location])

    const onPost = () =>{
      
      navigate(`/posts/${post._id}`)
    }
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

  return (
    
    <div className='d-flex-column justify-content-center mb-5'>  
   
        <div className='card mt-5' style={{width:"18rem"}} key={post._id}>
          <button onClick={onPost}>
          <h6 className='position-absolute' style={{zIndex:10}}>{moment(new Date(post.createdAt)).fromNow()}</h6>
          {(user?.result?.googleId===post.creator||user?.result?._id===post.creator)&&(
          <button className='position-absolute'  style={{zIndex:10,marginLeft:"260px",border:"none"}} onClick={()=>setCurrentId(post._id)}>
          <i className="fa-solid fa-ellipsis" style={{marginLeft:"auto"}}></i>
          </button>
          )}
        <img src={post.selectedFile} className="card-img-top position-relative"/>
        <div className="card-body">
        <h5 className='position-absolute' style={{top:"19px"}}>{post.name}</h5>
        <h6 className='mb-3'>{post.title}</h6>
        <h6>{post.tags.map((tag:any)=>(`#${tag}`))}</h6>
        <h5>{post.message}</h5>
        
        <button style={{border:"none",backgroundColor:"white"}} disabled={!user?.result} onClick={()=>dispatch(likePosts(post._id))}>
        <Likes /> 
        </button>
        {(user?.result?.googleId===post.creator||user?.result?._id===post.creator)&&(
        <button style={{border:"none",backgroundColor:"white",marginLeft:"100px"}} onClick={()=>dispatch(deletePosts(post._id))}><i className="fas fa-trash"></i>
         <span style={{color:"blue"}}>Delete</span></button>
        )}
        
        </div>
        </button>
        </div>
       
    </div> 
  )
  }

export default Post
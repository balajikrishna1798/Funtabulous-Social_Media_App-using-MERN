import { useSelector } from 'react-redux'
import moment from 'moment'
import { useAppDispatch } from '../../hooks'
import { deletePosts , likePosts} from '../../actions/posts'

const Posts = (props:any) => {
    const posts = useSelector((state:any)=>state.posts)
    console.log(posts)
    const dispatch = useAppDispatch()
    
  return (
    <div className='d-flex-column justify-content-center mb-5'>
      {posts.map((post:any)=>(
    
        <div className='card mt-5' style={{width:"18rem"}} key={post._id}>
          
          <h6 className='position-absolute' style={{zIndex:10}}>{moment(new Date(post.createdAt)).fromNow()}</h6>
          <button className='position-absolute'  style={{zIndex:10,marginLeft:"260px",border:"none"}} onClick={()=>props.setCurrentId(post._id)}>
          <i className="fa-solid fa-ellipsis" style={{marginLeft:"auto"}}></i>
          </button>
        <img src={post.selectedFile} className="card-img-top position-relative"/>
        <div className="card-body">
        <h5 className='position-absolute' style={{top:"19px"}}>{post.creator}</h5>
        <h6 className='mb-3'>{post.title}</h6>
        <h6>{post.tags.map((tag:any)=>(`#${tag}`))}</h6>
        <h5>{post.message}</h5>
        <button style={{border:"none",backgroundColor:"white"}} onClick={()=>dispatch(likePosts(post._id))}><i className="fa-solid fa-thumbs-up "></i>
         <span style={{color:"blue"}}>Like</span>
        {post.likeCount}</button>
        <button style={{border:"none",backgroundColor:"white",marginLeft:"100px"}} onClick={()=>dispatch(deletePosts(post._id))}><i className="fas fa-trash"></i>
         <span style={{color:"blue"}}>Delete</span></button>
        </div>
        </div>
      ))}
    </div> 
  )
}

export default Posts
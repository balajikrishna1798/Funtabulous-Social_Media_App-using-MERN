import moment from 'moment';
import { useEffect } from 'react'
import { useSelector } from 'react-redux';
import {  useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { getPost } from '../features/postSlice';
import { useAppDispatch, useAppSelector } from '../hooks';
import CommentSections from './CommentSections';

const PostDetails = () => {
    const post = useAppSelector((state:any) => state.posts.posts);
    const dispatch = useAppDispatch()
    const {id} = useParams()
    useEffect(()=>{
      //@ts-expect-error
        dispatch(getPost({id}))
    },[id])
  return (
    <div className='container' style={{width:"60%"}}>
       <Link to="/posts"> <i className="fa-solid fa-backward" style={{color:"blue"}}></i></Link>
        <div className='card mt-1 mb-5' key={post._id}>
          <h6 className='position-absolute' style={{zIndex:10}}>{moment(new Date(post.createdAt)).fromNow()}</h6>
        <img src={post.selectedFile} className="card-img-top position-relative" style={{height:500}}/>
        <div className="card-body">
        <h5 className='position-absolute' style={{top:"19px"}}>{post.name}</h5>
        <h6 className='mb-3'>{post.title}</h6>
        {post.tags && <h6>{post.tags.map((tag:any)=>(`#${tag}`))}</h6>}
        <h5>{post.message}</h5>
        <CommentSections/>
        </div>
        </div>
        </div>
  )
}

export default PostDetails
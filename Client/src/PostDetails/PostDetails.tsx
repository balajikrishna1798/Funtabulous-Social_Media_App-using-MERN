import moment from 'moment';
import { useEffect } from 'react'
import { useSelector } from 'react-redux';
import {  useParams } from 'react-router';
import { getPost } from '../features/postSlice';
import { useAppDispatch } from '../hooks';

const PostDetails = () => {
    const post = useSelector((state:any) => state.posts.posts);
    const dispatch = useAppDispatch()
    const {id} = useParams()
    useEffect(()=>{
      //@ts-expect-error
        dispatch(getPost({id}))
    },[id])
  return (
    <div className='container '>  
        <div className='card mt-5' style={{width:"18rem"}} key={post._id}>
          <h6 className='position-absolute' style={{zIndex:10}}>{moment(new Date(post.createdAt)).fromNow()}</h6>
        <img src={post.selectedFile} className="card-img-top position-relative" />
        <div className="card-body">
        <h5 className='position-absolute' style={{top:"19px"}}>{post.name}</h5>
        <h6 className='mb-3'>{post.title}</h6>
        <h6>{post.tags}</h6>
        <h5>{post.message}</h5>
        </div>
        </div>
        </div>
  )
}

export default PostDetails
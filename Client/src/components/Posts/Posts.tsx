import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import Post from './Post'

const Posts = ({ setCurrentId }) => {
  const location = useLocation()
  const posts = useSelector((state:any) => state.posts);
 useEffect(()=>{

 },[location])
  return (
        posts.map((post:any) => (
          <div key={post._id} >
            <Post post={post} setCurrentId={setCurrentId} />
          </div>
        )
        )
        
    )
}

export default Posts;
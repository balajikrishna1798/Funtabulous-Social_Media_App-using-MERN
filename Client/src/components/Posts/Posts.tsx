import { useSelector } from 'react-redux';
import Post from './Post'

const Posts = ({ setCurrentId }) => {
  const posts = useSelector((state:any) => state.posts);
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
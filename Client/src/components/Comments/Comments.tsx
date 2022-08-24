import React, { useState } from 'react'
import { commentPost } from '../../features/postSlice';
import { useAppDispatch } from '../../hooks'

const Comments = ({post}) => {
    const user = JSON.parse(localStorage.getItem('profile'))

  const dispatch = useAppDispatch();
  
  
  const [comment,setComment] = useState("")
  const submitHandler = async (e) =>{
    e.preventDefault();
  console.log(comment);
  const text = ` ${user?.result?.name}:${comment}`
    //@ts-expect-error
    await dispatch(commentPost({postId:post._id,text:{content:text}}))
    setComment("")
    
}
    return (
    <div>
       {
       post.comments && post?.comments?.map((c,i)=>(
            <div>
             {c.content}
            </div>
        ))
       }
        <form onSubmit={submitHandler}>
        <input type="text" placeholder='Comment' name="content" value={comment} onChange={(e)=>setComment(e.target.value)}/>
        <button type='submit'>Comment</button>
        </form>

    </div>
  )
}

export default Comments
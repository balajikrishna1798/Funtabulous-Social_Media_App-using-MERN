import React, { useState } from 'react'
import { commentPost } from '../../features/postSlice';
import { useAppDispatch } from '../../hooks'

const Comments = ({post}) => {
    const user = JSON.parse(localStorage.getItem('profile'))

  const dispatch = useAppDispatch();
  
  
  const [comment,setComment] = useState("")
  const submitHandler = async (e) =>{
    e.preventDefault();
  const text = ` ${user?.result?.name}:${comment}`
    await dispatch(commentPost({postId:post._id,text:{content:text}}))
    setComment("")
    
}
    return (
    <div>
       <div className='container card'>
        <div style={{overflowY: "scroll", height: "150px"}}>{
       post.comments && post?.comments?.map((c:any)=>(
            <div>
             {c.content}
            </div>
        ))
       }
       </div>
       </div>
        <form onSubmit={submitHandler}>
          <div className='container d-flex'>
        <input type="text" placeholder='Comment' className='w-100 mb-3' name="content" value={comment} onChange={(e)=>setComment(e.target.value)}/>
        <button type='submit' className='w-25 btn btn-outline-info mb-3' style={{marginLeft:""}}>Comment</button>
        </div>
        </form>

    </div>
  )
}

export default Comments
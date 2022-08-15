import React, { useState } from 'react'
import { commentPost } from '../features/postSlice'
import { useAppDispatch, useAppSelector } from '../hooks'

const CommentSections = () => {
    const post = useAppSelector((state:any) => state.posts.posts);
    const [comments,setComments] = useState(post?.comments)
    const [comment,setComment] = useState('')
    const user = JSON.parse(localStorage.getItem('profile'))

    const dispatch = useAppDispatch()
    const handleClick = async () =>{
        const value = `${user.result.name}:${comment}`
        //@ts-expect-error
        const newComments = await dispatch(commentPost({value,id:post._id}))
        setComments(newComments)
        setComment("")
    }
  return (
    <div>
        <div>
            <p>Comments</p>
            {comments && comments.map((comment:any,index:any)=>(
               <div key={index}>
               <h4>{comment&&  comment.split(':')[0]}  </h4>
               <span>{ comment&&comment.split(':')[1]}  </span>
               </div>
            ))}
            </div>
            <p>Write a Comment</p>
            <textarea cols={70} rows={3} placeholder='comment'
            onChange={(e)=>setComment(e.target.value)}
            />
            <button disabled={!comment} onClick={handleClick}>Comment</button>
        </div>
  )
}

export default CommentSections
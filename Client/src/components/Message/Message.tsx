import React from 'react'
import { format } from "timeago.js";

import './Message.css'
const Message = ({message,own}) => {
   
  return (
    <div className={own?'message own':"message"}>
        <div className="messageTop">
            <img className='messageImg' src="https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock--480x320.jpg" alt="" />
            <p className='messageText'>{message.text}</p>
        </div>
        <div className='messageBottom'>{format(message.createdAt)}</div>
    </div>
  )
}

export default Message
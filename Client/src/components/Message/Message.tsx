import React from 'react'
import './Message.css'
const Message = ({own}) => {
  return (
    <div className={own?'message own':"message"}>
        <div className="messageTop">
            <img className='messageImg' src="https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock--480x320.jpg" alt="" />
            <p className='messageText'>Hello!!! This is Message</p>
        </div>
        <div className='messageBottom'>1 hour ago</div>
    </div>
  )
}

export default Message
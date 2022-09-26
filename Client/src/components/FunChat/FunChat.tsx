import React from 'react'
import ChatOnline from '../ChatOnline/ChatOnline';
import Conversation from '../Conversation/Conversation';
import Message from '../Message/Message';
import Navbar from '../NavBar/NavBar'
import './FunChat.css';
const FunChat = () => {
  return (
    <div>
      <Navbar />
      <div className='funchat'>
        <div className='chatMenu'>
          <div className='chatMenuWrapper'>
            <input type="text" placeholder='Search for friends' className='form-control w-50 shadow-none'/>
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
          </div>
        </div>
        <div className='chatBox'>
        <div className='chatBoxWrapper'>
        <div className='chatBoxTop'>
          <Message own={false}/>
          <Message own={true}/>
          <Message own={false} />
          <Message own={true}/><Message own={true}/><Message own={true}/><Message own={true}/><Message own={true}/><Message own={true}/><Message own={true}/><Message own={true}/><Message own={true}/><Message own={true}/><Message own={true}/><Message own={true}/><Message own={true}/><Message own={true}/><Message own={true}/><Message own={true}/>
        </div>
        <div className='chatBoxBottom'>
          <textarea className='chatMessageInput' placeholder='Write Something...'></textarea>
          <button className='chatSubmitButton'>Send</button>
        </div>
        </div>
        </div>
        <div className='chatOnline'>
          <div className='chatOnlineWrapper'>
            <ChatOnline />
          </div>
        </div>
      </div>
    </div>
  )
}

export default FunChat
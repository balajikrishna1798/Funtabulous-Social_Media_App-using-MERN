import React, { useEffect, useRef, useState } from 'react'
import { getMessages, postMessages } from '../../api';
import { getConversation } from '../../features/authSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import ChatOnline from '../ChatOnline/ChatOnline';
import Conversation from '../Conversation/Conversation';
import Message from '../Message/Message';
import Navbar from '../NavBar/NavBar'
import './FunChat.css';
const FunChat = () => {
  const dispatch = useAppDispatch()

  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const user = JSON.parse(localStorage.getItem("profile"));
  const scrollRef:any = useRef();
  console.log(user?.result?._id);
  const convo = useAppSelector(state=>state.auth.convo)
  console.log(messages);
  
  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await dispatch(getConversation(user?.result?._id));
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user?._id]);

  useEffect(() => {
    const getMessage = async () => {
      try {
        const res = await getMessages(currentChat?._id);
        console.log(res)
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessage();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user?.result?._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

  
    try {
      const res = await postMessages(message);
      console.log(message)
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages])


  return (
    <div>
      <Navbar />
      <div className='funchat'>
        <div className='chatMenu'>
          <div className='chatMenuWrapper'>
            <input type="text" placeholder='Search for friends' className='form-control w-50 shadow-none'/>
            {convo?.map(c=>(
              <div onClick={() => setCurrentChat(c)}>
              <Conversation  conversation={c} currentUser={user} />
              </div>

            )
            )}
            
           
          </div>
        </div>
        <div className='chatBox'>
        <div className='chatBoxWrapper'>
        {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    
                    <div ref={scrollRef}>
                     
                      
                      <Message message={m} own={m.sender === user?.result?._id} />
                    </div>
                  ))}
          
          
        </div>
        <div className='chatBoxBottom'>
        <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
          <button className='chatSubmitButton' onClick={handleSubmit}>Send</button>
        </div>
        </>):(
          <span className="noConversationText">
          Open a conversation to start a chat.
        </span>
      )}
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
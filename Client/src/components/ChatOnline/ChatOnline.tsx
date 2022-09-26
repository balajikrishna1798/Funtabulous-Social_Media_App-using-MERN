import React from 'react'
import './ChatOnline.css'

const ChatOnline = () => {
  return (
    <div className='chatOnline'>
        <div className="chatOnlineFriend">
            <div className="chatOnlineImgContainer">
                <img className='chatOnlineImg' src="https://cdn2.psychologytoday.com/assets/styles/manual_crop_1_91_1_1528x800/public/field_blog_entry_images/2018-09/shutterstock_648907024.jpg?itok=7lrLYx-B" alt="" />
                <div className="chatOnlineBadge"></div>
            </div>
            <span className='chatOnlineName'>Pooja shetty</span>
        </div>
    </div>
  )
}

export default ChatOnline
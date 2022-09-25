import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { getFriends } from '../../api';

const RightBar = () => {
    const [friends,setFriends] = useState([]);
    const user = JSON.parse(localStorage.getItem("profile"));
useEffect(()=>{
    const getFriend = async()=>{
    const friendList = await getFriends(user?.result?._id)
    setFriends(friendList.data)
    }
     getFriend()
},[user?.result?._id])
  return (
    <div>
        <h3>User Friends</h3>
        {friends.map(friend=>(
 <Link 
 to={`/${
   isNaN(friend?._id) ? "userProfile" : "googleuserProfile"
 }/${friend?._id}`}
>
        <img src={friend.pic?`http://localhost:5000/uploads/${friend.pic}`:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"} 
        style={{width:"60px",borderRadius:"50%",height:50}}
        />
        <p style={{color:"black"}}>{friend.name}</p>
        </Link>
        ))}
        
        
    </div>
  )
}

export default RightBar
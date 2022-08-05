import { useEffect, useState } from "react";
import {useAppDispatch}  from "../../hooks";
import './NavBar.css'
import { Link, useLocation } from "react-router-dom";
import Posts from "../Posts/Posts";

function Navbar() {
  const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useAppDispatch();
  const location = useLocation()
  const logout = () =>{
    dispatch({type:"LOGOUT"})
    setUser(null)
  }
  useEffect(()=>{
    const token = user?.token;
    setUser(JSON.parse(localStorage.getItem('profile')))
  },[location])

  return (
    <div className="container position-relative">
    <div className="card text-center">
      <div className="memories"><Link to = "/">Bahnapost</Link>
     <img className="" src="https://dcassetcdn.com/design_img/3401269/577133/577133_18643225_3401269_120b1173_image.jpg"
      style={{width: "5rem"}}/>
        {user ? (
            <div>
                <img src={user.result.imageUrl}></img>
                <h5>{user.result.name}</h5>
                <button onClick={logout}>Logout</button>
                </div> 
        ):(
          <Link to="/auth">
            <button className="Signin position-absolute end-0">SignIn</button>
            </Link>
        ) }
    </div>
    </div>
    </div>

  );
}

export default Navbar;


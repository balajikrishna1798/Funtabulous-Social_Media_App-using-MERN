import { useEffect, useState } from "react";
import { getPosts } from "../../actions/posts";
import Forms from "../Form/Forms";
import Posts from "../Posts/Posts";
import {useAppDispatch}  from "../../hooks";
import './NavBar.css'
import { Link } from "react-router-dom";

function Navbar() {
  const [currentId,setCurrentId] = useState(null);
  const user = null;
  const dispatch = useAppDispatch();

  useEffect(()=>{
    dispatch(getPosts())
  },[dispatch])
  
  return (
    <div className="container position-relative">
    <div className="card text-center">
      <div className="memories"><Link to = "/">Bahnapost</Link>
     <img className="" src="https://dcassetcdn.com/design_img/3401269/577133/577133_18643225_3401269_120b1173_image.jpg"
      style={{width: "5rem"}}/>
        {user ? (
            <div>
                
                <img src={user.result.imageUrl}>{user.result.name.charAt(0)}</img>
                <h5>{user.result.name}</h5>
                <button>Logout</button>
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


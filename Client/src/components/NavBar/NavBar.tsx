import { useEffect, useState } from "react";
import {useAppDispatch}  from "../../hooks";
import './NavBar.css'
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const Navigate = useNavigate()
  const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useAppDispatch();
  const location = useLocation()
  const logout = () =>{
    dispatch({type:"LOGOUT"})
    setUser(null)
    Navigate("/")
  }
  
  useEffect(()=>{
    const token = user?.token;
    return setUser(JSON.parse(localStorage.getItem('profile')))
  },[location])

  return (
    <div className="container position-relative">
    <div className="card text-center">
      <div className="memories"><Link to = "/posts">Bahnapost</Link>
     <img className="" src="https://dcassetcdn.com/design_img/3401269/577133/577133_18643225_3401269_120b1173_image.jpg"
      style={{width: "5rem"}}/>
        {user ? (
            <div className="position-absolute end-0 d-flex align-items-center justify-content-around" 
            style={{marginRight:"20px",marginTop:"-60px"}}>
                {/* <img src={user.result.imageUrl}></img> */}
                <h5 className="text-success" style={{marginRight:"50px"}}>{user.result.name}</h5>
                <button onClick={logout} className="btn btn-danger">Logout</button>
                </div> 
        ):(
          <Link to="/auth">
            <button className="Signin position-absolute end-0 btn btn-outline-danger">SignIn</button>
            </Link>
        ) }
    </div>
    </div>
    </div>

  );
}

export default Navbar;


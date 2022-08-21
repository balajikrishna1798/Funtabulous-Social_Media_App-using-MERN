import { useEffect, useState } from "react";
import {useAppDispatch}  from "../../hooks";
import './NavBar.css'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Logout } from "../../features/authSlice";

function Navbar() {
  const Navigate = useNavigate()
  const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useAppDispatch();
  const location = useLocation()
  const logout = () =>{
    //@ts-expect-error
    dispatch(Logout())
    setUser(null)
    Navigate(0)
    
    
  }
  console.log(user);
  
  useEffect(()=>{
    const token = user?.token;
    return setUser(JSON.parse(localStorage.getItem('profile')))
  },[location])

  return (
    
    
    <div className="sticky-top" >
      
    <div className="card text-center p-1" style={{backgroundColor:"yellow"}}>
      <div className="memories"><Link to = "/">Funtabulous</Link>
     <img className="" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvMh3EctbWvjFZJhEgxxXIM5QwismuTZyFnBuuz2fpjDGBzMJv8K2Y-fZbCStP1vS0oEM&usqp=CAU"
      style={{width: "3rem",opacity:0.3}}/>
        {user?.result ? (
            <div className="position-absolute end-0 d-flex align-items-center justify-content-around" 
            style={{marginRight:"20px",marginTop:"-44px"}}>
                
                <h5 className="text-light" style={{marginRight:"50px",borderRadius:"50%",height:40,border:"2px solid red",width:"40px",padding:"2px",backgroundColor:"black"}}>{user?.result?.name.charAt(0)}</h5>
                <h5 className="text-success" style={{marginRight:"50px"}}>{user?.result?.name}</h5>
                <button onClick={logout} className="btn btn-danger" style={{marginBottom:"10px"}}>Logout</button>
                </div> 
        ):(
          <Link to="/auth  ">
            <button className="Signin position-absolute end-0 btn btn-outline-danger" style={{marginTop:"5px"}}>SignIn</button>
            </Link>
        ) }
    </div>
    </div>
    </div>

  );
}

export default Navbar;


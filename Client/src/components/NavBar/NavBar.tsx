import { useEffect, useState } from "react";
import {useAppDispatch}  from "../../hooks";
import './NavBar.css'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Logout } from "../../features/authSlice";

function Navbar() {
  const navigate = useNavigate()
  const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useAppDispatch();
  const location = useLocation()
  const logout = () =>{
    //@ts-expect-error
    dispatch(Logout())
    setUser(null)
    navigate(0)
    
  }
  console.log(user);
  
  useEffect(()=>{
    const token = user?.token;
    return setUser(JSON.parse(localStorage.getItem('profile')))       
  },[location])

  return (
    
    
    <div className="sticky-top" >
      
    <div className="card text-center p-1" style={{backgroundColor:"yellow",overflowX:"hidden"}}>
      <div className="row">
      <div className="offset-md-4 col-md-4 col-sm-5 col-6 memories"><Link to = "/">Funtabulous</Link>
     <img className="navbarLogo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvMh3EctbWvjFZJhEgxxXIM5QwismuTZyFnBuuz2fpjDGBzMJv8K2Y-fZbCStP1vS0oEM&usqp=CAU"
     /> </div>
        {user?.result ? (
            <>
                 {user.result.pic ?<img className="col-md-2 col-sm-5 col-2 mt-1 userDp"
                  src={user && !user?.result?.googleId ? `http://localhost:5000/uploads/${user.result.pic}`:`${user.result.pic}`}></img>
                :<h5 className="text-light col-md-2 col-sm-5 col-2 p-1 defaultDp">{user?.result?.name.charAt(0)}</h5>}

                <h5 className="text-success col-md-2 col-sm-3 col-2 mt-3" >{user?.result?.name}</h5>
               

                <button onClick={logout} className="btn btn-danger col-md-2 col-lg-1 col-sm-2 col-2 mt-2" style={{height:40}}>Logout</button>
                </> 
        ):(
          <div className="col-md-4 p-2">
          <Link to="/auth  ">
            <button className="Signin btn btn-dark">SignIn</button>
            </Link>
            </div>
        ) }
  
    </div>
    </div>
    </div>

  );
}

export default Navbar;

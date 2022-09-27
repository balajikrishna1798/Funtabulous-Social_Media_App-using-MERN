import { useEffect, useState } from "react";
import {useAppDispatch}  from "../../hooks";
import './NavBar.css'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Logout } from "../../features/authSlice";
import { Modal } from "react-bootstrap";
import Donate from "../Donate/Donate";
import { getPosts,getPostBySearch } from "../../features/postSlice";

function Navbar() {
  const [show,setShow] = useState(false);
  const navigate = useNavigate()
  const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useAppDispatch();
  const location = useLocation()
  const [search,setSearch] = useState('')
  const logout = () =>{
    //@ts-expect-error
    dispatch(Logout())
    setUser(null)
    navigate(0)
    
  }
  const searchPost = () =>{
    if(search.trim()){
      dispatch(getPostBySearch(search))
  
      setSearch("")
    }
    else{
      navigate("/")
    }
  } 
  useEffect(()=>{
    return setUser(JSON.parse(localStorage.getItem('profile')))       
  },[location])
  const handleModal = () =>{
    setShow(!show)
  }
  

  return (
    
    
<nav className="navbar navbar-expand-lg bg-light sticky-top">
<button onClick={handleModal} title="Donate to Funtabulous if you wish.ThankYou!!!" 
       className="btn btn-outline-danger col-md-1 shadow-none" style={{marginLeft:"1rem"}}>
         Donate
      </button>
      <Modal show={show} onHide={handleModal}>
     <Modal.Header closeButton>
     Thanks For your Contribution <span style={{fontWeight:600,color:"blue",marginRight:"auto",marginLeft:"3px"}}>{user&&user.result?.name}</span>
   </Modal.Header>
   <Modal.Body>
   <Donate handleModal={handleModal}/>
    </Modal.Body>
   </Modal>
  <div className="container">
 
    <a className="navbar-brand offset-1"><Link to = "/posts" className="text">Funtabulous</Link></a>
   
    <div className="menu" id="navbarSupportedContent">
    
      <ul className="navbar-nav">
        
        <li className="nav-item" >
        <Link to="/forms"> <i className="fa-solid fa-square-plus mb-2 mt-2" style={{color:"blue",fontSize:"25px"}}></i></Link>
        </li>
        <li className="nav-item"  style={{marginLeft:"30px"}}>
        <Link to="/searchCreator"><i className="fa-brands fa-searchengin mb-2 mt-2" style={{color:"brown",fontSize:"25px",cursor:"pointer"}}></i></Link></li>
        <li className="nav-item dropdown" style={{marginLeft:"30px"}}>
          <a className="nav-link dropdown-toggle text-success align-items-center" role="button" data-bs-toggle="dropdown" >
            
          {!user?.result ? <i className="fa-solid fa-user" style={{fontSize:"25px"}}></i>:
(
               <>
                    {user&&user.result.pic ?<img className="col-md-2 col-2" style={{borderRadius:"50%",width:"40px",height:"30px"}}
                     src={user && !user?.result?.googleId ? `http://localhost:5000/uploads/${user?.result.pic}`:`${user?.result.pic}`}></img>
                   :<img className="col-md-2 col-2" style={{borderRadius:"50%",width:"20px"}} src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"></img>
                   
                   }
</>
)}

          <span style={{fontSize:"16px",marginLeft:"10px"}}>{user?.result?.name}</span>
          </a>
          {user?.result ? (
          <ul className="dropdown-menu">
            
            <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
            <li><button className="dropdown-item" onClick={logout}>Logout</button></li>
          </ul>
          ):(
            <ul className="dropdown-menu">
            
            <li><Link className="dropdown-item" to="/auth">Sign in</Link></li>
            </ul>
          )}
        </li>
      
       
      </ul>
      
    </div>
  </div>
  <form className="d-flex" style={{marginRight:"80px"}}>
        <input className="form-control me-2 shadow-none" placeholder="Search with title" value={search} aria-label="Search"  onChange={(e)=>setSearch(e.target.value)}/>
        <button className="btn btn-outline-success w-25 " onClick={searchPost} type="button"><i className="fab fa-affiliatetheme"></i></button>
      </form>
</nav>
  );
}

export default Navbar;

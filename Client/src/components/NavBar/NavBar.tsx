import { useEffect, useState } from "react";
import {useAppDispatch}  from "../../hooks";
import './NavBar.css'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Logout } from "../../features/authSlice";
import { Modal } from "react-bootstrap";
import Donate from "../Donate/Donate";

function Navbar() {
  const [show,setShow] = useState(false);
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
  
  useEffect(()=>{
    return setUser(JSON.parse(localStorage.getItem('profile')))       
  },[location])
  const handleModal = () =>{
    setShow(!show)
  }
  

  return (
    
    
    <div className="sticky-top" >

    <div className="card text-center p-1" style={{backgroundColor:"yellow",overflowX:"hidden"}}>
      <div className="row">
      <button onClick={handleModal} title="Donate to Funtabulous if you wish.ThankYou!!!" 
       className="offset-lg-1 offset-md-1 position-relative btn btn-outline-danger col-lg-1 col-md-2 shadow-none">
        Donate
      </button>
<Modal show={show} onHide={handleModal}>
  <Modal.Header closeButton>
    Thanks For your Contribution <span style={{fontWeight:600,color:"blue",marginRight:"auto",marginLeft:"3px"}}>{user&&user.result.name}</span>
  </Modal.Header>
<Modal.Body>
  <Donate handleModal={handleModal}/>
</Modal.Body>


</Modal>



      
      <div className="offset-lg-2 col-md-4 col-8 memories"><Link to = "/">Funtabulous</Link>
     
    </div>
        {user?.result ? (
            <>
                 {user?.result.pic ?<img className="col-md-2 offset-md-0  offset-3 col-2 mt-1 userDp"
                  src={user && !user?.result?.googleId ? `http://localhost:5000/uploads/${user?.result.pic}`:`${user?.result.pic}`}></img>
                :<h5 className="text-light col-md-2 col-sm-5 col-2 p-1 defaultDp">{user?.result?.name.charAt(0)}</h5>}

                <h5 className="text-success col-md-2 col-sm-3 col-3 mt-3" >{user?.result?.name}</h5>

                <button onClick={logout} className="btn btn-danger col-md-2 col-lg-1 col-4 mt-2">Logout</button>
                </> 
        ):(
          <div className="col-md-4 p-2">
          <Link to="/auth">
            <button className="Signin btn btn-dark w-25">SignIn</button>
            </Link>
            </div>
        ) }
  
    </div>
    </div>
    </div>

  );
}

export default Navbar;

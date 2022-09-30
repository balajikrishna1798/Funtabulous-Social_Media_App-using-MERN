import { useEffect, useState } from "react";
import Forms from "../Form/Forms";
import {useAppDispatch, useAppSelector}  from "../../hooks";
import Posts from "../Posts/Posts";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getPosts,getPostBySearch } from "../../features/postSlice";
import ChipInput from "material-ui-chip-input";
import Navbar from "../NavBar/NavBar";
import RightBar from "../RightBar/RightBar";


function Home({setCurrentId}) {
  const user = JSON.parse(localStorage.getItem("profile"));

  const dispatch = useAppDispatch();




 

  useEffect(()=>{
    dispatch(getPosts())
    
   
  },[dispatch])
  

  return (
         <div className="container-fluid">
          <div className="row">
            <div className="offset-md-3 col-md-6 mb-5">
            <Posts setCurrentId={setCurrentId}/>
            </div>
         <div className="col-md-2 mt-5 position-fixed" style={{marginLeft:"100px"}}>
        
       
         <RightBar />
         </div>
         </div>
          </div> 

  );
}

export default Home;


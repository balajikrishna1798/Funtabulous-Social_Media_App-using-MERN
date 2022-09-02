import { useEffect, useState } from "react";
import Forms from "../Form/Forms";
import {useAppDispatch, useAppSelector}  from "../../hooks";
import Posts from "../Posts/Posts";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getPosts,getPostBySearch } from "../../features/postSlice";
import ChipInput from "material-ui-chip-input";
import Navbar from "../NavBar/NavBar";


function Home({setCurrentId}) {
  const user = JSON.parse(localStorage.getItem("profile"));

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [search,setSearch] = useState('')
  const [ tags,setTags] = useState([])

const handleAdd = (tag:any)=>{
setTags([...tags,tag])
}
const handleDelete = (tagToDelete:any) =>{
  setTags(tags.filter((tag)=>tag!==tagToDelete))
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
    dispatch(getPosts())
    
   
  },[dispatch])
  

  return (
    
      <div>

        <Navbar />

      <div>
         </div>
          <div>
            <Posts setCurrentId={setCurrentId}/>
            </div>
            <div>
         </div>
        
         {user?.result?.name&&<div style={{marginBottom:"70px"}}>
             <div className="d-flex justify-content-around fixed-bottom" style={{backgroundColor:"pink"}}>  
    <Link to="/forms" ><i className="fa-solid fa-square-plus mb-2 mt-2" style={{color:"blue",fontSize:"20px"}}></i></Link>
    <div className="d-flex">
    <i className="fab fa-affiliatetheme mb-2 mt-2" onClick={searchPost} style={{color:"brown",fontSize:"20px",cursor:"pointer"}}></i>
    <input type="text" className="form-control mb-2 mt-2" style={{height:25,marginLeft:"10px"}} name="search" value={search} placeholder="Search with title" autoComplete="off" onChange={(e)=>setSearch(e.target.value)}/>
   </div>
    <Link to="/profile" ><i className="fa-solid fa-id-badge mb-2 mt-2" style={{color:"red",fontSize:"20px"}}></i></Link>
    <Link to="/searchCreator"><i className="fa-brands fa-searchengin mb-2 mt-2" style={{color:"brown",fontSize:"20px",cursor:"pointer"}}></i></Link>
    </div>
              </div>}
          </div> 

  );
}

export default Home;


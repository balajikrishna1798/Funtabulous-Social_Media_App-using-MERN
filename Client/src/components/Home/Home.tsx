import { useEffect, useState } from "react";
import Forms from "../Form/Forms";
import {useAppDispatch}  from "../../hooks";
import Posts from "../Posts/Posts";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getPosts,getPostBySearch } from "../../features/postSlice";
import ChipInput from "material-ui-chip-input";
import Navbar from "../NavBar/NavBar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css'
function useQuery() {
   return new URLSearchParams(useLocation().search)
}

function Home({setCurrentId}) {
 
  const dispatch = useAppDispatch();
  const query = useQuery();
  const navigate = useNavigate();
  const searchQuery = query.get('searchQuery')
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
      //@ts-expect-error
      dispatch(getPostBySearch({search}))
      navigate(`/posts/search?title=${search}`)
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
        
            <div style={{marginBottom:"70px"}}>
             <div className="d-flex justify-content-around fixed-bottom" style={{backgroundColor:"pink"}}>  
    <Link to="/forms" ><i className="fa-solid fa-square-plus mb-2 mt-2" style={{color:"blue",fontSize:"20px"}}></i></Link>
    <div className="d-flex">
    <i className="fa-brands fa-searchengin mb-2 mt-2" onClick={searchPost} style={{color:"brown",fontSize:"20px",cursor:"pointer"}}></i>
    <input type="text" className="form-control mb-2 mt-2" style={{height:25,marginLeft:"10px"}} name="search" value={search} placeholder="Search with title" onChange={(e)=>setSearch(e.target.value)}/>
    </div>
    <Link to="/profile" ><i className="fa-solid fa-id-badge mb-2 mt-2" style={{color:"red",fontSize:"20px"}}></i></Link>
    </div>
              </div>
          </div>

  );
}

export default Home;


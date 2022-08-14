import { useEffect, useState } from "react";
import Forms from "../Form/Forms";
import {useAppDispatch}  from "../../hooks";
import Posts from "../Posts/Posts";
import { useLocation, useNavigate } from "react-router-dom";
import { getPosts,getPostBySearch } from "../../features/postSlice";
import ChipInput from "material-ui-chip-input";

function useQuery() {
   return new URLSearchParams(useLocation().search)
}

function Home() {
  const [currentId,setCurrentId] = useState(null);
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
  },[dispatch,currentId])
  
  return (
    <div className="container"> 
      <div className='row'>
      <div className='col-md-3 col-sm-3 col-2'>
         </div>
          <div className='col-md-3 col-sm-9 col-6'>
            <Posts setCurrentId={setCurrentId}/>
            </div>
            <div className='col-md-2'>
         </div>
            <div className='col-md-4'>
              <input type="text" className="form-control mb-3" name="search" value={search} placeholder="Search with title" onChange={(e)=>setSearch(e.target.value)}/>
              <ChipInput style={{marginBottom:"20px",width:"100%"}} value={tags} onAdd={handleAdd} onDelete={handleDelete} placeholder="Search for tags" variant="outlined"/>
              {/* <input type="text" className="form-control mb-3" name="tags" value={tags} placeholder="Search with tags" onChange={(e)=>setTags([e.target.value])}/> */}
              <button className="btn btn-outline-success " style={{width:"100%"}} type="button" onClick={searchPost}> Search</button>
           <Forms currentId={currentId} setCurrentId={setCurrentId}/>
          </div>
    </div>
    </div>
  );
}

export default Home;


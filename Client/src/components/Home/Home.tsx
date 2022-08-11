import { useEffect, useState } from "react";
import { getPosts,getPostsBySearch } from "../../actions/posts";
import Forms from "../Form/Forms";
import {useAppDispatch}  from "../../hooks";
import Posts from "../Posts/Posts";
import { useLocation, useNavigate } from "react-router-dom";

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

  const searchPost = () =>{
    if(search.trim() || tags){
      dispatch(getPostsBySearch({search,tags:tags.join(',')}))
      navigate(`/posts/search?title=${search||'none'}&tags=${tags.join(",")}`)
    }
    else{
      navigate("/")
    }
  } 

  useEffect(()=>{
    dispatch(getPosts())
  },[dispatch,currentId,navigate])
  
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
              <input type="text" className="form-control mb-3" name="tags" value={tags} placeholder="Search with tags" onChange={(e)=>setTags([e.target.value])}/>
              <button className="btn btn-outline-success " style={{width:"100%"}} type="button" onClick={searchPost}> Search</button>
           <Forms currentId={currentId} setCurrentId={setCurrentId}/>
          </div>
    </div>
    </div>
  );
}

export default Home;


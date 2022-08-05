import { useEffect, useState } from "react";
import { getPosts } from "../../actions/posts";
import Forms from "../Form/Forms";
import Posts from "../Posts/Posts";
import {useAppDispatch}  from "../../hooks";

function Home() {
  const [currentId,setCurrentId] = useState(null);
  const dispatch = useAppDispatch();

  useEffect(()=>{
    dispatch(getPosts())
  },[dispatch])
  
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
           <Forms currentId={currentId} setCurrentId={setCurrentId}/>
          </div>
    </div>
    </div>
  );
}

export default Home;


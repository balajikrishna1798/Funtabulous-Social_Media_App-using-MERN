import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { searchUsers } from '../../api';
import { getPosts } from '../../features/postSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';

const SearchCreator = ({setCurrentId}) => {
    const [search,setSearch] = useState("")
    const dispatch = useAppDispatch()
    const [userDetails,setUserDetails] = useState([])
    const posts = useAppSelector((state:any) => (state.posts.posts));
    const fetchUsers = (name) =>{
      setSearch(name)
      searchUsers({name:name}).then(results =>{
        console.log(results)
        setUserDetails(results?.data?.user)
        
      })
    }
    useEffect(()=>{
        dispatch(getPosts())
        
       
      },[dispatch])
  return (
    <div className='container'>
   
     <div className='d-flex justify-content-center align-items-center w-100'><i className="fa-solid fa-magnifying-glass"></i>
     <input type="text" className="form-control mb-2 mt-2 col-md-4 p-3" style={{height:25,marginLeft:"10px"}} name="name" value={search} placeholder="Search user" autoComplete="off" onChange={(e)=>fetchUsers(e.target.value)}/></div>
    <ul>
      {userDetails && userDetails.map(item=>{
        return(
          <div key={item._id}>
          
        <Link to={`${item.googleId ? "/googleuserProfile/"+item.googleId : "/userProfile/"+item._id}`}> 
        <div className="row">
        
        <li className='card m-1 p-2 position-relative col-12' key={item._id} style={{listStyle:"none",color:"black"}}>
          {item.name}
        {item.pic?<img className='position-absolute ' src={item.pic} style={{width:"2%",height:23,borderRadius:"50%",left:80}}/>:
        <h5 className="text-light position-absolute" style={{borderRadius:"50%",border:"2px solid red",width:"2%",height:23,backgroundColor:"black",left:80,fontSize:"17px",paddingLeft:"0.5%"}}>{item.name.charAt(0)}</h5>
        }
        </li>
        
        </div>
        </Link>
        </div>
        
        )
      })}
      

    </ul>
    </div>
   /* { posts.length>0 && posts.filter((val)=>{
        if(name==""){
         return val
        }
        else if(val.name.toLowerCase().includes(name.toLowerCase())){
         return val
        }
        }).
        map((post:any) => (
         <div key={post._id} >
            {post?.name}
         </div>))
}
         </div>
  ) */
)}


export default SearchCreator
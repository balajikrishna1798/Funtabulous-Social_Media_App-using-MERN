import {BrowserRouter as Router,Routes,Route, Navigate} from 'react-router-dom'
import Home from "./components/Home/Home";
import PostDetails from "./PostDetails/PostDetails";
import Auth from "./components/Auth/Auth";
import Forms from "./components/Form/Forms";
import { useEffect, useState } from "react";
import Profile from "./components/Profile/Profile";
import UserProfile from './components/userProfile/UserProfile';
import { useAppDispatch } from './hooks';
import { setUser } from './features/authSlice';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import ChangePassword from './components/ChangePassword/ChangePassword';
import SearchCreator from './components/searchCreator/SearchCreator';
import Register from './components/Auth/Register';




function App() {
  const [currentId,setCurrentId] = useState(null);
  const dispatch = useAppDispatch()
  const user = JSON.parse(localStorage.getItem('profile'))
  useEffect(()=>{
    dispatch(setUser(user))
  })
  const [show,setShow] = useState();
  return (
    <Router>

      <Routes>
      <Route path="/" element={<Navigate to="/posts"/>}/>

        <Route path="/posts" element={<Home setCurrentId={setCurrentId}/>} />
        <Route path="/searchCreator" element={<SearchCreator/>} />

        <Route path="/forms" element={<Forms currentId={currentId} setCurrentId={setCurrentId}/>}/>
        <Route path="/posts/:id" element={<PostDetails/>}/>
        <Route path="/profile" element={<Profile />} />
        <Route path="/auth" element={!user?.result.name?<Auth/>:<Navigate to="/posts"></Navigate>}/>
        <Route path="/register" element={!user?.result.name?<Register/>:<Navigate to="/posts"></Navigate>}/>

        <Route path="/userProfile/:id" element={<UserProfile />} />
        <Route path="/googleuserProfile/:googleid" element={<UserProfile />} />
        <Route path="/forgotPassword" element={<ForgotPassword show={show} setShow={setShow}/>} />
        <Route path="/ChangePassword" element={<ChangePassword show={show} setShow={setShow}/>} />
        
      </Routes>
    </Router>
   
  );
}

export default App;


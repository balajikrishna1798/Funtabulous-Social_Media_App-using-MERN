import {BrowserRouter as Router,Routes,Route, Navigate} from 'react-router-dom'
import Home from "./components/Home/Home";
import PostDetails from "./PostDetails/PostDetails";
import Auth from "./components/Auth/Auth";
import Forms from "./components/Form/Forms";
import { useState } from "react";
import Profile from "./components/Profile/Profile";




function App() {
  const [currentId,setCurrentId] = useState(null);
  const user = JSON.parse(localStorage.getItem('profile'))
  return (
    <Router>

      <Routes>
      <Route path="/" element={<Navigate to="/posts"/>}/>
        <Route path="/posts" element={<Home setCurrentId={setCurrentId}/>} />
        <Route path="/forms" element={<Forms currentId={currentId} setCurrentId={setCurrentId}/>}/>
        <Route path="/posts/search" element={<Home setCurrentId={setCurrentId}/>}/>
        <Route path="/posts/:id" element={<PostDetails/>}/>
        <Route path="/profile" element={<Profile />} />
        <Route path="/auth" element={!user?.result ?<Auth/>:<Navigate to="/"/>}/>
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
   
  );
}

export default App;


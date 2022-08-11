import Navbar from "./components/NavBar/NavBar";
import {BrowserRouter as Router,Routes,Route, useNavigate, Navigate, useLocation} from 'react-router-dom'
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./PostDetails/PostDetails";



function App() {
  const user = JSON.parse(localStorage.getItem('profile'))
  return (
    <Router>
    <Navbar />
      <Routes>
      <Route path="/" element={<Navigate to="/posts"/>}/>
        <Route path="/posts" element={<Home/>}/>
        <Route path="/posts/search" element={<Home/>}/>
        <Route path="/posts/:id" element={<PostDetails/>}/>
        <Route path="/auth" element={!user?<Auth/>:<Navigate to="/"/>}/>
      </Routes>

    </Router>
   
  );
}

export default App;


import Navbar from "./components/NavBar/NavBar";
import {BrowserRouter as Router,Routes,Route, useNavigate, Navigate, useLocation} from 'react-router-dom'
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import { useEffect } from "react";


function App() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('profile'))
  return (
    <Router>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/auth" element={<Auth/>}/>
      </Routes>

    </Router>
   
  );
}

export default App;


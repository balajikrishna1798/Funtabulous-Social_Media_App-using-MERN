import Navbar from "./components/NavBar/NavBar";
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";


function App() {
  
  return (
    <Router>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/auth" element={<Auth />}/>
      </Routes>

    </Router>
   
  );
}

export default App;


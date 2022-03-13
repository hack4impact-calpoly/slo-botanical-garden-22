import "./App.css";
import Navbar from "./components/Navbar/navbar";
import Login from "./components/Login/login";
import Footer from "./components/Footer/footer";
import Home from "./components/Home/home";
import awsconfig from './aws-exports'; 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Login></Login>
    // <Router>
    //   <Navbar />

    //   <Routes>
    //     <Route exact path="/" element={<Home />} />
    //     {/* <Route path="/about" element={<About />} /> */}
    //   </Routes>
    //   <Footer />
    // </Router>
  );
}

export default App;

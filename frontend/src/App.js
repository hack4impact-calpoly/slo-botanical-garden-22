import "./App.css";
import Navbar from "./components/Navbar/navbar";
import Login from "./components/Login/login";
import Footer from "./components/Footer/footer";
import Home from "./components/Home/home";
import SignUpForm from "./components/SignUp/SignUpForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import awsconfig from './aws-exports';
import { Auth } from 'aws-amplify';

function App(props) {
  const [username, setUsername] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <>
      <ChakraProvider>
        <div>username: {username}    isAdmin: {isAdmin ? "true" : "false"}</div>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            {/* <Route path="/about" element={<About />} /> */}
            <Route
              path="signup"
              element={<SignUpForm/>}
            />
            <Route
              path="/login"
              element={<Login setUsername = {setUsername}/>}
            />
          </Routes>
        </Router>
      </ChakraProvider>
      <Footer />
    </>
  );
}

export default App;
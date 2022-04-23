import "./App.css";
import Navbar from "./components/Navbar/navbar";
import Login from "./components/Login/login";
import Footer from "./components/Footer/footer";
import Home from "./components/Home/home";
import SignUpForm from "./components/SignUp/SignUpForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import awsconfig from "./aws-exports";
import { Auth } from "aws-amplify";
import React, { useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import VolunteerTable from "./components/VolunteerTable/volunteerTable";
import ContribitionTable from "./components/ContributionsTable/ContributionTable";

function App(props) {
  const [username, setUsername] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <>
      <ChakraProvider>
        <Router>
          {username !== null ? <Navbar user={username} /> : null}
          <Routes>
            <Route exact path="/home" element={<Home user={username} />} />
            <Route
              exact
              path="/profile"
              element={<ContribitionTable user={username} />}
            />
            <Route
              path="/signup"
              element={<SignUpForm setUsername={setUsername} />}
            />
            <Route path="/" element={<Login setUsername={setUsername} />} />
            <Route
              path="/volunteer"
              element={<VolunteerTable user={username} />}
            />
          </Routes>
        </Router>
      </ChakraProvider>
      <Footer />
    </>
  );
}

export default App;

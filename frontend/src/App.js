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
import { GlobalProvider } from "./GlobalState";

function App(props) {
  return (
    <>
      <GlobalProvider>
        <ChakraProvider>
          <Router>
            <Navbar />
            {/* <Login> */}
            <Routes>
              <Route exact path="/home" element={<Home />} />
              <Route exact path="/profile" element={<ContribitionTable />} />
              <Route path="/signup" element={<SignUpForm />} />
              <Route path="/" element={<Login />} />
              <Route path="/volunteer" element={<VolunteerTable />} />
            </Routes>
            {/* </Login> */}
          </Router>
        </ChakraProvider>
        <Footer />
      </GlobalProvider>
    </>
  );
}

export default App;

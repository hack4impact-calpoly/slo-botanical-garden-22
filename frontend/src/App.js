import "./App.css";
import Navbar from "./components/Navbar/navbar";
import Footer from "./components/Footer/footer";
import Home from "./components/Home/home";
import InfoForm from "./components/InfoForm/InfoForm";
import SignUpForm from "./components/SignUp/SignUpForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import awsconfig from "./aws-exports";
<<<<<<< HEAD
import { Auth } from "aws-amplify";
import React, { useContext, useState, useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import VolunteerTable from "./components/VolunteerTable/volunteerTable";
import ContribitionTable from "./components/ContributionsTable/ContributionTable";
import { GlobalProvider } from "./GlobalState";
import { GlobalContext } from "./GlobalState";

=======
import Amplify, { Auth } from "aws-amplify";
import React, { useState, useContext } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import VolunteerTable from "./components/VolunteerTable/volunteerTable";
import Profile from "./components/Profile/profile";
import { GlobalProvider, GlobalContext } from "./GlobalState";
import { Authenticator } from "@aws-amplify/ui-react";
import { getComp, getUserInfoCandD } from "./components/Login/login";
import { Link, Navigate } from "react-router-dom";
import Login from "./components/Login/login";
import { AuthRoute } from "./AuthRoutes";
>>>>>>> 88571c20d6d1a400bdb72f7ef4c6e2fd7c45775c

function App(props) {
  const { setCurrentUser, currentUserInfo } = useContext(GlobalContext);
  const [showNavBar, setShowNavBar] = useState(false)
  useEffect(() => {
    if (Object.keys(currentUserInfo).length !== 0){
      setShowNavBar(true);
    }}, []);
  return (
    <>
      <Authenticator.Provider>
        <GlobalProvider>
          <ChakraProvider>
            <Router>
              <Navbar />
              <Routes>
                <Route
                  exact
                  path="/home"
                  element={
                    <AuthRoute>
                      <Home />
                    </AuthRoute>
                  }
                />
                <Route
                  exact
                  path="/profile"
                  element={
                    <AuthRoute>
                      <Profile />
                    </AuthRoute>
                  }
                />
                <Route path="/signup" element={<SignUpForm />} />
                <Route path="/" element={<Login />} />
                <Route
                  path="/volunteer"
                  element={
                    <AuthRoute>
                      <VolunteerTable />
                    </AuthRoute>
                  }
                />
                <Route path="*" element={<p>404</p>} />
              </Routes>
            </Router>
          </ChakraProvider>
          <Footer />
        </GlobalProvider>
      </Authenticator.Provider>
    </>
  );
}

export default App;

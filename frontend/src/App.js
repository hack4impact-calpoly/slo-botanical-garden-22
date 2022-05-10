import "./App.css";
import Navbar from "./components/Navbar/navbar";
import Footer from "./components/Footer/footer";
import Home from "./components/Home/home";
import InfoForm from "./components/InfoForm/InfoForm";
import SignUpForm from "./components/SignUp/SignUpForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import awsconfig from "./aws-exports";
import Amplify, { Auth } from "aws-amplify";
import React, { useState, useContext, useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import VolunteerTable from "./components/VolunteerTable/volunteerTable";
import Profile from "./components/Profile/profile";
import { GlobalProvider, GlobalContext } from "./GlobalState";
import { Authenticator } from "@aws-amplify/ui-react";
import { getComp, getUserInfoCandD } from "./components/Login/login";
import { Link, Navigate } from "react-router-dom";
import Login from "./components/Login/login";
import { AuthRoute } from "./AuthRoutes";

function App(props) {
  const { setCurrentUser, currentUserInfo } = useContext(GlobalContext);
  const [showNavBar, setShowNavBar] = useState(false);
  useEffect(() => {
    if (Object.keys(currentUserInfo).length !== 0) {
      setShowNavBar(true);
    }
  }, []);
  return (
    <>
      <Authenticator.Provider>
        <GlobalProvider>
          <ChakraProvider>
            <Router>
              <Routes>
                <Route
                  exact
                  path="/home"
                  element={
                    <AuthRoute disAllowedStatus="NONE">
                      <Home />
                    </AuthRoute>
                  }
                />
                <Route
                  exact
                  path="/profile"
                  element={
                    <AuthRoute disAllowedStatus="NONE">
                      <Profile />
                    </AuthRoute>
                  }
                />
                <Route path="/signup" element={<SignUpForm />} />
                <Route path="/" element={<Login />} />

                <Route
                  path="/volunteer"
                  element={
                    <AuthRoute disAllowedStatus="False">
                      <VolunteerTable />
                    </AuthRoute>
                  }
                />
                <Route
                  path="/info"
                  element={
                    <AuthRoute disAllowedStatus="NONE">
                      <InfoForm />
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

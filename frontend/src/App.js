import "./App.css";
import Navbar from "./components/Navbar/navbar";
import Login from "./components/Login/login";
import Footer from "./components/Footer/footer";
import Home from "./components/Home/home";
import InfoForm from "./components/InfoForm/InfoForm";
import SignUpForm from "./components/SignUp/SignUpForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import awsconfig from "./aws-exports";
import { Auth } from "aws-amplify";
import React, { useContext, useState, useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import VolunteerTable from "./components/VolunteerTable/volunteerTable";
import ContribitionTable from "./components/ContributionsTable/ContributionTable";
import { GlobalProvider } from "./GlobalState";
import { GlobalContext } from "./GlobalState";


function App(props) {
  const { setCurrentUser, currentUserInfo } = useContext(GlobalContext);
  const [showNavBar, setShowNavBar] = useState(false)
  useEffect(() => {
    if (Object.keys(currentUserInfo).length !== 0){
      setShowNavBar(true);
    }}, []);
  return (
    <>
      <GlobalProvider>
        <ChakraProvider>
          <Router>
            {console.log(currentUserInfo) }
            {console.log(showNavBar)}
           {showNavBar ? <Navbar /> : null}
            {/* <Login> */}
            <Routes>
              <Route exact path="/home" element={<Home />} />
              <Route exact path="/profile" element={<ContribitionTable />} />
              <Route path="/signup" element={<SignUpForm />} />
              <Route path="/info" element={<InfoForm />} />
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

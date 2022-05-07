import React, { useState, useContext, useEffect } from "react";
import {
  Authenticator,
  useTheme,
  Heading,
  useAuthenticator,
  View,
  Button,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import "./login.css";
import SignUpForm from "../SignUp/SignUpForm";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../GlobalState";
import { fetchUser } from "../../dynoFuncs";

export const getComp = () => {
  return {
    SignIn: {
      Header() {
        const { tokens } = useTheme();
        return (
          <Heading
            padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
            level={3}
            className="signInHeading"
          >
            PLEASE SIGN IN
          </Heading>
        );
      },
    },
    Footer() {
      const { route } = useAuthenticator((context) => [context.route]);
      return route === "resetPassword" ? null : (
        <View textAlign="center">
          <h2 style={{ marginTop: ".5em" }} className="OR">
            <span>OR</span>
          </h2>
          <Link to="/signup">
            <Button
              fontWeight="normal"
              variation="primary"
              size="Large"
              isFullWidth={true}
              style={{
                width: "45%",
                marginTop: "1em",
                background: "#aeb5ad",
                color: "#576754",
                fontFamily: "SBG",
              }}
            >
              Sign Up
            </Button>
          </Link>
        </View>
      );
    },
  };
};

export const getUserInfoCandD = (user, setCurrentUser) => {
  var userInfo;

  fetchUser("volunteers_group", user.username).then((data) => {
    userInfo = data;
    if (userInfo) {
      userInfo["volunteerTable"] = "volunteers_group";
    }
    console.log(userInfo);
    if (!userInfo) {
      fetchUser("volunteers_individual", user.username).then((data) => {
        userInfo = data;
        userInfo["volunteerTable"] = "volunteers_individual";
        setCurrentUser(data);
      });
    } else {
      setCurrentUser(userInfo);
    }
  });
};

export default function Login(props) {
  const { setCurrentUser, currentUserInfo } = useContext(GlobalContext);
  let location = useLocation();
  let navigate = useNavigate();

  let from = location.state?.from?.pathname || "/home";

  function getUserInfoCandD(user) {
    var userInfo;

    fetchUser("volunteers_group", user.username).then((data) => {
      userInfo = data;
      if (userInfo) {
        userInfo["volunteerTable"] = "volunteers_group";
        userInfo["userLoggedIn"] = true;
      }
      //console.log(userInfo);
      if (!userInfo) {
        fetchUser("volunteers_individual", user.username).then((data) => {
          userInfo = data;
          userInfo["volunteerTable"] = "volunteers_individual";
          userInfo["userLoggedIn"] = true;

          setCurrentUser(data);
        });
      } else {
        setCurrentUser(userInfo);
      }
    });
  }

  return (
    <div className="signInPage">
      <Authenticator
        className="signIn"
        hideSignUp={true}
        components={getComp()}
      >
        {({ signOut, user }) => (
          <main>
            {getUserInfoCandD(user)}
            {props.children}
            {navigate(from, { replace: true })}
          </main>
        )}
      </Authenticator>
    </div>
  );
}

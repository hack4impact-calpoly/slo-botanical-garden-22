import React, { useContext } from "react";
import {
  Authenticator,
  useTheme,
  Heading,
  useAuthenticator,
  View,
  Button,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css"; // eslint-disable-line
import "./login.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../GlobalState";
import { fetchUser } from "../../dynoFuncs";

export const getComp = () => ({
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
        {/* <h2>
            Returning users, please do not use the reset password link. Entering
            any password with your old username will prompt you through a
            password reset. You may need to resend code if one does not come
            immediately. Then use your username and new password as usual.
          </h2>
          <br />
          <h2>If you have any problems, please contact mreed16@calpoly.edu.</h2>
          <br /> */}

        <h2 style={{ marginTop: ".5em" }} className="OR">
          <span>OR</span>
        </h2>
        <Link to="/signup">
          <Button
            fontWeight="normal"
            variation="primary"
            size="Large"
            isFullWidth
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
});

export const getUserInfoCandD = (user, setCurrentUser) => {
  let userInfo;

  fetchUser("volunteers_group", user.username).then((data) => {
    userInfo = data;
    if (userInfo) {
      userInfo.volunteerTable = "volunteers_group";
    }
    console.log(userInfo);
    if (!userInfo) {
      fetchUser("volunteers_individual", user.username).then((data) => { // eslint-disable-line
        userInfo = data;
        userInfo.volunteerTable = "volunteers_individual";
        setCurrentUser(data);
      });
    } else {
      setCurrentUser(userInfo);
    }
  });
};

export default function Login({ children }) {
  const { setCurrentUser, currentUserInfo } = useContext(GlobalContext); // eslint-disable-line
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/home";

  function getUserInfoCandD(user) { // eslint-disable-line
    let userInfo;

    fetchUser("volunteers_group", user.username).then((data) => {
      userInfo = data;
      if (userInfo) {
        userInfo.volunteerTable = "volunteers_group";
        userInfo.userLoggedIn = true;
      }
      // console.log(userInfo);
      if (!userInfo) {
        fetchUser("volunteers_individual", user.username).then((data) => { // eslint-disable-line
          userInfo = data;
          userInfo.volunteerTable = "volunteers_individual";
          userInfo.userLoggedIn = true;

          setCurrentUser(data);
        });
      } else {
        setCurrentUser(userInfo);
      }
    });
  }

  return (
    <div className="signInPage">
      <Authenticator className="signIn" hideSignUp components={getComp()}>
        {({ signOut, user }) => ( // eslint-disable-line
          <main>
            {getUserInfoCandD(user)}
            {children}
            {navigate(from, { replace: true })}
          </main>
        )}
      </Authenticator>
    </div>
  );
}

import React, { useState } from "react";
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
import { Navigate } from "react-router-dom";

const getComp = (setSignUpUser) => {
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
          <Button
            fontWeight="normal"
            variation="primary"
            size="Large"
            isFullWidth={true}
            onClick={() => setSignUpUser(true)}
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
      </View>
    );
  },
};
}
export default function Login({ setUsername }) {
  const [signUpUser, setSignUpUser] = useState(false);
  return (
    <>
      {signUpUser ? (
        <SignUpForm setUsername={setUsername}/>
      ) : (
        <div className="signInPage">
          <Authenticator
            className="signIn"
            hideSignUp={true}
            components={getComp(setSignUpUser)}
            authState={setSignUpUser}
          >
            {({ signOut, user }) => (
              <main>
                {setUsername(user.username)}
                <Navigate replace to="/home" />

                {/* <h1>Hello {user.username}</h1>
            <button onClick={signOut}>Sign out</button> */}
              </main>
            )}
          </Authenticator>
        </div>
      )}
    </>
  );
}

import React from 'react';
import { Authenticator, useTheme, Heading, useAuthenticator, View, Button } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import './login.css';

const components = {
  SignIn: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3} className="signInHeading">
        PLEASE SIGN IN
        </Heading>
      );
    },
  }, 
  Footer() {
    const { route } = useAuthenticator(context => [context.route]);
    return route === 'resetPassword' ? null :
    (
      <View textAlign="center">
        <Button
          fontWeight="normal"
          onClick={() => alert('route to sign up')}
          variation="primary"
          size="Large"
          isFullWidth={true}
          style={{width: '45%', background: "#aeb5ad", color: "#576754", fontFamily: "SBG"}}
        >
          Sign Up
        </Button>
      </View>
    );
  },
};

export default function Login() {
  return (
    <div className="signInPage">
      <Authenticator className="signIn" hideSignUp={true} components={components}>
        {({ signOut, user }) => (
          <main>
            <h1>Hello {user.username}</h1>
            <button onClick={signOut}>Sign out</button>
          </main>
        )}
      </Authenticator>
    </div>
  );
}

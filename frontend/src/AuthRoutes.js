import React, { useState, useContext, useEffect } from "react";
import { GlobalContext } from "./GlobalState";
import { fetchUser } from "./dynoFuncs";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";

export const AuthRoute = ({ children }) => {
  const { route, cognitoUser } = useAuthenticator((context) => {
    return [context.route, context.user];
  });

  const { setCurrentUser, currentUserInfo } = useContext(GlobalContext);

  useEffect(() => {
    if (route === "authenticated" && cognitoUser) {
      var userInfo;
      fetchUser("volunteers_group", cognitoUser.username).then((data) => {
        userInfo = data;
        if (!userInfo) {
          fetchUser("volunteers_individual", cognitoUser.username).then(
            (data) => {
              userInfo = data;
              userInfo["volunteerTable"] = "volunteers_individual";
              userInfo["userLoggedIn"] = true;
              setCurrentUser(userInfo);
            }
          );
        } else {
          userInfo["volunteerTable"] = "volunteers_group";
          userInfo["userLoggedIn"] = true;
          console.log(userInfo);
          setCurrentUser(userInfo);
        }
      });
    }
  }, [route, cognitoUser, setCurrentUser]);

  console.log("Current User Info in Auth Route");
  console.log(currentUserInfo);
  console.log(route);
  console.log(cognitoUser);

  if (route !== "authenticated" || !currentUserInfo.userLoggedIn) {
    console.log("HERE");
    return <Authenticator />;
  }

  //NEED TO CHANGE
  if (currentUserInfo.is_Admin === "False") {
    return (
      <p>
        You are not allowed to view this page. Logout and login to something
        with auth!
      </p>
    );
  }
  console.log("Children");
  console.log(children);
  return children;
};

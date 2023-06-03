import React from "react";
import { Amplify, Auth, API } from "aws-amplify";
// import awsconfig from "../../aws-exports";
import "./AdminPassReset.css";
import currentConfig from "../../aws-exports";

Amplify.configure(currentConfig);
API.configure(currentConfig);
// Amplify.configure(awsconfig);

// import cognitoiddentityserviceprovider;
// import { AdminSetUserPasswordRequest } from "aws-sdk/clients/cognitoidentityserviceprovider";

async function resetPassCall() {
  console.log("In reset Pass");
  // let apiName = "AdminQueries0feb2cd2";
  let apiName = "AdminQueries";
  let path = "/adminResetUserPassword";
  let myInit = {
    body: {
      // username: "test",
      // groupname: "test",
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `${(await Auth.currentSession())
        .getAccessToken()
        .getJwtToken()}`,
    },
  };
  return await API.post(apiName, path, myInit);
}

function AdminPassReset() {
  const clickReset = () => {
    console.log("CLICK");
    resetPassCall();
  };

  return (
    <div className="wholePage">
      <button onClick={clickReset}>Test</button>
    </div>
  );
}

export default AdminPassReset;

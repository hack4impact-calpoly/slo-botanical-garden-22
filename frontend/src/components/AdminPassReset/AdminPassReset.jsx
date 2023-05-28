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
  let apiName = "AdminQueries";
  let path = "/adminResetUserPassword";
  let myInit = {
    body: {
      username: "richard",
      groupname: "Editors",
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
  // var params = {
  //   Password: 'STRING_VALUE', /* required */
  //   UserPoolId: 'STRING_VALUE', /* required */
  //   Username: 'STRING_VALUE', /* required */
  //   Permanent: true || false
  // };

  const clickReset = () => {
    console.log("CLICK");
    resetPassCall();
    // cognitoidentityserviceprovider.adminSetUserPassword(params, function(err, data) {
    //   if (err) console.log(err, err.stack); // an error occurred
    //   else     console.log(data);           // successful response
    // });
  };

  return (
    <div className="wholePage">
      <button onClick={clickReset}>Test</button>
    </div>
  );
}

export default AdminPassReset;

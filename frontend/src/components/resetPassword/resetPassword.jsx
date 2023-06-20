import React, { useState } from "react";
import { Form } from "semantic-ui-react";
import Navbar from "../Navbar/navbar";


function ResetPassword() {
  const [formData, setFormData] = useState({
    userName: "",
    newPass: "",
    checkPass: "",
  });

  const [valid, setValid] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
    if (formData.newPass !== formData.checkPass){
      console.log("false")
      setValid("Passwords do not match.")
    }
    else
      setValid("Password has been reset.")
      // You can call back end stuff here now
  }

  const handleChange = (e, { name, value }) =>
    setFormData({ ...formData, [name]: value });

  return (
    <>
      <Navbar />
      <Form
        className="resetPasswordForm"
        style={{ padding: "100px", display: "flex", flexDirection: "column", backgroundColor: "white" }}
        onSubmit={handleSubmit}
      >
          <div >
            <h1
              style={{
                display: "flex",
                justifyContent: "center",
                paddingBottom: "5%",
                fontWeight: "bold",
              }}
            >
              Update a User's Password
            </h1>
            <Form.Group widths="equal">
              <Form.Input
                label="Username"
                name="userName"
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                label="New Password"
                name="newPass"
                onChange={handleChange}
                required
              />
              <Form.Input
                label="Confirm Password"
                name="checkPass"
                onChange={handleChange}
                required
              />

            </Form.Group>
            <p>{valid}</p>
            <Form.Button content="Reset Password" />
          </div>
      </Form>
    </>
  );
}

export default ResetPassword;

import React, { useState, useEffect } from "react";
import { Form, Checkbox, Message } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import { Auth } from "aws-amplify";
import { useNavigate, Link } from "react-router-dom";
import { putData, getRandomId } from "../../dynoFuncs";

import "./InfoForm.css";

import "react-datepicker/dist/react-datepicker.css";

const InfoForm = () => {
  const [signUp, setSignUp] = useState({});

  const navigate = useNavigate();

  const handleChange = (e, { name, value }) =>
    setSignUp({ ...signUp, [name]: value });

  const handleSubmit = async () => {
    console.log("handle submit");
  };

  const confirmSignUp = async () => {
    try {
      const item = {
        Emergency_Contact_Phone: signUp.emergencyNumber,
        Covid_Waiver_and_Release: signUp.covidWaiver,
        Group: signUp.groupName,
        "Total Hours Volunteered": 0,
        Emergency_Contact: signUp.emergencyName,
        is_Admin: false,
        "Safety Training Status": signUp.safetyStatus,
        "Photo-Permission": signUp.photoStatus,
        "Secondary Phone": signUp.phonetwo,
        "Primary Phone": signUp.phone,
        Volunter_Waiver_and_Release: signUp.volunteerWaiver,
        "Community Service": signUp.commService,
        username: signUp.username,
        hourGoal: signUp.hourGoal, //?
        mailing_address: signUp.address,
      };
      console.log(item);
      putData("volunteers_individual", item);

      // push data to dynamo
      navigate("/home");
    } catch (error) {
      console.log("error getting info", error);
    }
  };

  return (
    <Form
      className="signUpForm"
      style={{ padding: "40px", display: "flex", flexDirection: "column" }}
      onSubmit={handleSubmit}
    >
      <h1 style={{ color: "#4d602a" }} size="huge">
        {"Additional information is needed to complete sign up"}
      </h1>
      <hr style={{ backgroundColor: "green", width: "100%" }} />

      <hr style={{ backgroundColor: "green", width: "100%" }} />
      {
        <div>
          <Form.Group widths="equal">
            <Form.Input
              label="Emergency Contact Phone Number"
              name="emergencyNumber"
              value={signUp.emergencyNumber}
              onChange={handleChange}
              required
            />
            <Form.Input
              label="Emergency Contact Name"
              name="emergencyName"
              value={signUp.emergencyName}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Input
            label="Group Name"
            name="groupName"
            value={signUp.groupName}
            onChange={handleChange}
          />
          <Form.Input
            label="Hour Goal"
            name="hourGoal"
            value={signUp.hourGoal}
            onChange={handleChange}
          />
          <Checkbox
            className="photo-label"
            label="Photo Permission?"
            value={signUp.photoStatus}
            style={{ paddingBottom: "10px" }}
            required
            onChange={(e, data) =>
              setSignUp({ ...signUp, photoStatus: data.checked })
            }
          />
          <hr style={{ backgroundColor: "green", width: "100%" }} />
          <Form.Input
            label="Secondary Phone Number"
            name="phonetwo"
            value={signUp.phonetwo}
            onChange={handleChange}
          />
          <hr style={{ backgroundColor: "green", width: "100%" }} />
          <br />

          <Checkbox
            label="Safety Training Status Complete?"
            value={signUp.safetyStatus}
            onChange={(e, data) =>
              setSignUp({ ...signUp, safetyStatus: data.checked })
            }
            required
          />
          <Checkbox
            label="Volunteer Waiver and Release Complete?"
            value={signUp.volunteerWaiver}
            onChange={(e, data) =>
              setSignUp({ ...signUp, volunteerWaiver: data.checked })
            }
            required
          />
          <Checkbox
            label="Covid Waiver and Release Complete?"
            value={signUp.covidWaiver}
            onChange={(e, data) =>
              setSignUp({ ...signUp, covidWaiver: data.checked })
            }
            required
          />
          <Checkbox
            label="Community Service?"
            value={signUp.commService}
            onChange={(e, data) =>
              setSignUp({ ...signUp, commService: data.checked })
            }
            required
          />
          <br />
          <br />
        </div>
      }

      <br />
      {<Form.Button content="Submit" onSubmit={handleSubmit} />}
    </Form>
  );
};

export default InfoForm;

import React, { useState, useEffect, useContext } from "react";
import { Form, Checkbox, Message } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import { Auth } from "aws-amplify";
import { useNavigate, Link } from "react-router-dom";
import { updateVolunteerInformation } from "../../dynoFuncs";
import { GlobalContext } from "../../GlobalState";

import "./InfoForm.css";

import "react-datepicker/dist/react-datepicker.css";

const InfoForm = () => {
  const [signUp, setSignUp] = useState({});
  const { currentUserInfo } = useContext(GlobalContext);

  const handleChange = (e, { name, value }) =>
    setSignUp({ ...signUp, [name]: value });

  const handleSubmit = async () => {
    var groupName = "None Specified";
    if (signUp.groupName) {
      groupName = signUp.groupName;
    }

    var hourGoal = "None Specified";
    if (signUp.hourGoal) {
      hourGoal = signUp.hourGoal;
    }

    var phonetwo = "None Specified";
    if (signUp.phonetwo) {
      phonetwo = signUp.phonetwo;
    }

    var safetyStatus = "False";
    if (signUp.safetyStatus) {
      safetyStatus = signUp.safetyStatus;
    }

    var photoStatus = "False";
    if (signUp.photoStatus) {
      photoStatus = signUp.photoStatus;
    }

    var volunteerWaiver = "False";
    if (signUp.volunteerWaiver) {
      volunteerWaiver = signUp.volunteerWaiver;
    }

    var commService = "False";
    if (signUp.commService) {
      commService = signUp.commService;
    }

    var scannedStatus = "False";
    if (signUp.scannedStatus) {
      scannedStatus = signUp.scannedStatus;
    }

    var covidWaiver = "False";
    if (signUp.covidWaiver) {
      covidWaiver = signUp.covidWaiver;
    }
    console.log(signUp.mailing_address);
    var item = {
      Emergency_Contact_Phone: signUp.emergencyNumber,
      Covid_Waiver_and_Release: covidWaiver,
      Group: groupName,
      Emergency_Contact: signUp.emergencyName,
      "Safety Training Status": safetyStatus,
      "Photo-Permission": photoStatus,
      "Secondary Phone": phonetwo,
      Volunter_Waiver_and_Release: volunteerWaiver,
      "Community Service": commService,
      hourGoal: hourGoal,
      mailing_address: signUp.mailing_address,
      liveScanned: scannedStatus,
    };
    console.log(item);
    updateVolunteerInformation(currentUserInfo.username, item);
  };

  return (
    <Form
      className="signUpForm"
      style={{ padding: "40px", display: "flex", flexDirection: "column" }}
      onSubmit={handleSubmit}
    >
      <h1 style={{ color: "#4d602a" }} size="huge">
        Additional information is needed to complete your account. This will
        only be prompted once.
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
            <Form.Input
              label="Mailing Address"
              name="mailing_address"
              value={signUp.mailing_address}
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
          />
          <Checkbox
            label="Volunteer Waiver and Release Complete?"
            value={signUp.volunteerWaiver}
            onChange={(e, data) =>
              setSignUp({ ...signUp, volunteerWaiver: data.checked })
            }
          />
          <Checkbox
            label="Covid Waiver and Release Complete?"
            value={signUp.covidWaiver}
            onChange={(e, data) =>
              setSignUp({ ...signUp, covidWaiver: data.checked })
            }
          />
          <br />

          <Checkbox
            label="Community Service?"
            value={signUp.commService}
            onChange={(e, data) =>
              setSignUp({ ...signUp, commService: data.checked })
            }
          />
          <Checkbox
            className="liveScan"
            label="Lived Scanned? (Need to work with children)"
            value={signUp.scannedStatus}
            style={{ paddingBottom: "10px" }}
            onChange={(e, data) =>
              setSignUp({ ...signUp, scannedStatus: data.checked })
            }
          />
          <br />
          <br />
        </div>
      }

      <br />
      {<Form.Button content="Submit" onSubmit={handleSubmit} to="home" />}
    </Form>
  );
};

export default InfoForm;

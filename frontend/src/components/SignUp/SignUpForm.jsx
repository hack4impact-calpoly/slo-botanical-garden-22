import React, { useState, useEffect } from "react";
import { Form, Checkbox, Message } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import { Auth } from "aws-amplify";
import { useNavigate, Link } from "react-router-dom";
import { putData, getRandomId } from "../../dynoFuncs";

import "./SignUpForm.css";

import "react-datepicker/dist/react-datepicker.css";

const SignUpForm = () => {
  const [signUp, setSignUp] = useState({});
  const [signUpGroup, setSignUpGroup] = useState({});
  const [startDate, setStartDate] = useState();
  const [group, setGroup] = useState(false);
  const [indiv, setIndiv] = useState(true);
  const [confirmation, setConfirmation] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [usernameTaken, setUsernameTaken] = useState(false);
  const [correctEmailFormat, setCorrectEmailFormat] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e, { name, value }) =>
    setSignUp({ ...signUp, [name]: value });

  const handleChangeGroup = (e, { name, value }) =>
    setSignUpGroup({ ...signUpGroup, [name]: value });

  const signUpCognito = async () => {
    setPasswordsMatch(true);
    setUsernameTaken(false);
    setCorrectEmailFormat(true);
    setErrorMessage(null);
    var username = group ? signUpGroup.username : signUp.username;
    var password = group ? signUpGroup.password : signUp.password;
    var confirmPassword = group
      ? signUpGroup.confirmPassword
      : signUp.confirmPassword;
    var email = group ? signUpGroup.emailContact : signUp.email;
    if (password !== confirmPassword) {
      setPasswordsMatch(false);
      return;
    }

    try {
      const { user } = await Auth.signUp({
        username,
        password,
        attributes: {
          email, // optional
        },
      });
      setConfirmation(true);
      console.log(user);
    } catch (error) {
      console.log("error signing up:", error);
      if (error.code === "UsernameExistsException") {
        setUsernameTaken(true);
      } else if (error.message === "Invalid email address format.") {
        setCorrectEmailFormat(false);
      }
      else {
        setErrorMessage(error.message);
      }
    }
  };

  const confirmSignUp = async () => {
    var username = group ? signUpGroup.username : signUp.username;
    var password = group ? signUpGroup.password : signUp.password;
    var code = group ? signUpGroup.code : signUp.code;
    setErrorMessage(null);

    try {
      await Auth.confirmSignUp(username, code);
      await Auth.signIn(username, password);
      if (group) {
        var hourGoal = "None Specified";
        if (signUpGroup.hourGoal) {
          hourGoal = signUpGroup.hourGoal;
        }

        var safetyStatus = "False";
        if (signUp.safetyStatus) {
          safetyStatus = signUpGroup.safetyStatus;
        }

        var item = {
          username: signUpGroup.username,
          groupName: signUpGroup.groupName,
          nameContact: signUpGroup.nameContact,
          phoneContact: signUpGroup.phoneContact,
          emailContact: signUpGroup.emailContact,
          hourGoal: hourGoal,
          totalHours: 0,
          safetyStatus: safetyStatus,
          is_Admin: "False",
        };
        console.log(item);
        putData("volunteers_group", item);
      } else {
        var groupName = "None Specified";
        if (signUp.groupName) {
          groupName = signUp.groupName;
        }

        hourGoal = "None Specified";
        if (signUp.hourGoal) {
          hourGoal = signUp.hourGoal;
        }

        var phonetwo = "None Specified";
        if (signUp.phonetwo) {
          phonetwo = signUp.phonetwo;
        }

        var medicalConditions = "None Specified";
        if (signUp.medicalConditions) {
          medicalConditions = signUp.medicalConditions;
        }

        safetyStatus = "False";
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

        item = {
          Emergency_Contact_Phone: signUp.emergencyNumber,
          "Last Name": signUp.lastName,
          Covid_Waiver_and_Release: covidWaiver,
          "First Name": signUp.firstName,
          Group: groupName,
          "Total Hours Volunteered": 0,
          Emergency_Contact: signUp.emergencyName,
          Email: signUp.email,
          Birth_date: signUp.birthDate,
          is_Admin: "False",
          medicalConditions: medicalConditions,
          "Safety Training Status": safetyStatus,
          "Photo-Permission": photoStatus,
          "Secondary Phone": phonetwo,
          "Primary Phone": signUp.phone,
          Volunter_Waiver_and_Release: volunteerWaiver,
          "Community Service": commService,
          username: signUp.username,
          hourGoal: hourGoal,
          mailing_address: signUp.address,
          liveScanned: scannedStatus,
        };
        console.log(item);
        putData("volunteers_individual", item);
      }

      // push data to dynamo
      navigate("/home");
    } catch (error) {
      setErrorMessage(error.message);
      console.log("error confirming sign up", error);
    }
  };

  return (
    
    <Form
      className="signUpForm"
      style={{ padding: "40px", display: "flex", flexDirection: "column" }}
      onSubmit={confirmation ? confirmSignUp : signUpCognito}
    >{(group || indiv) && !confirmation &&(
      <Link to="/">
        <Form.Button content="Back to Sign In"/>
      </Link>
    )}

      <h1 style={{ color: "#4d602a" }} size="huge">
        {confirmation ? 'A verfication code has been sent to your email' : 'SIGN UP'}
      </h1>
      <hr style={{ backgroundColor: "green", width: "100%" }} />
      {confirmation ? null : (
        <div className="check-status">
          <Checkbox
            className="check-status indiv"
            label="Individual"
            style={{ paddingTop: "10px" }}
            onChange={() => {
              setIndiv(true);
              if (group) {
                setGroup(false);
              }
            }}
            checked={indiv}
          />
          {/* <div
            className="check-status line"
            style={{ borderLeft: "1px solid green", height: "30px" }}
          /> */}
          <Checkbox
            className="check-status group"
            label="Group"
            style={{ paddingTop: "10px" }}
            onChange={() => {
              setGroup(true);
              if (indiv) {
                setIndiv(false);
              }
            }}
            checked={group}
          />
        </div>
      )}
      <hr style={{ backgroundColor: "green", width: "100%" }} />
      {indiv && !confirmation && (
        <div>
          <Form.Group widths="equal">
            <Form.Input
              label="Username"
              name="username"
              value={signUp.username}
              onChange={handleChange}
              required
            />
            <Form.Input
              label="Password"
              name="password"
              type="password"
              value={signUp.password}
              onChange={handleChange}
              required
            />
            <Form.Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={signUp.confirmPassword}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input
              label="First Name"
              name="firstName"
              value={signUp.firstName}
              onChange={handleChange}
              required
            />
            <Form.Input
              label="Last Name"
              name="lastName"
              value={signUp.lastName}
              onChange={handleChange}
              required
            />
            <Form.Input
              label="Email"
              name="email"
              value={signUp.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
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
          <hr style={{ backgroundColor: "green", width: "100%" }} />
          <Form.Input
            label="Mailing Address"
            name="address"
            value={signUp.address}
            onChange={handleChange}
            required
          />
          <Form.Input
            label="Phone Number"
            name="phone"
            value={signUp.phone}
            onChange={handleChange}
            required
          />
          <Form.Input
            label="Secondary Phone Number"
            name="phonetwo"
            value={signUp.phonetwo}
            onChange={handleChange}
          />
          <hr style={{ backgroundColor: "green", width: "100%" }} />
          <h3 style={{ textAlign: "left" }}>Personal Information:</h3>
          <Form.Field
            required
            label="Birth Date:"
            control={DatePicker}
            selected={startDate}
            value={signUp.birthDate}
            onChange={(date) => {
              setStartDate(date);
              setSignUp({ ...signUp, birthDate: date });
            }}
          />
          <br />
          <Form.TextArea
            label="Medical Conditions"
            name="medicalConditions"
            value={signUp.medicalConditions}
            onChange={handleChange}
          />
          <div className="bool_top">
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
          </div>
          <div className="bool_top">
            <Checkbox
              label="Community Service?"
              value={signUp.commService}
              onChange={(e, data) =>
                setSignUp({ ...signUp, commService: data.checked })
              }
            />
            <Checkbox
              label="Photo Permission?"
              value={signUp.photoStatus}
              style={{ paddingBottom: "10px" }}
              required
              onChange={(e, data) =>
                setSignUp({ ...signUp, photoStatus: data.checked })
              }
            />
            <Checkbox
              className="liveScan"
              label="Lived Scanned? (Need to work with children)"
              value={signUp.scannedStatus}
              style={{ paddingBottom: "10px" }}
              required
              onChange={(e, data) =>
                setSignUp({ ...signUp, scannedStatus: data.checked })
              }
            />
          </div>
          <br />
          <br />
        </div>
      )}
      {group && !confirmation && (
        <Form>
          <Form.Input
            label="Group Name"
            name="groupName"
            value={signUpGroup.groupName}
            onChange={handleChangeGroup}
            required
          />
          <Form.Group widths="equal">
            <Form.Input
              label="Username"
              name="username"
              value={signUpGroup.username}
              onChange={handleChangeGroup}
              required
            />
            <Form.Input
              label="Password"
              name="password"
              type="password"
              value={signUpGroup.password}
              onChange={handleChangeGroup}
              required
            />
            <Form.Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={signUpGroup.confirmPassword}
              onChange={handleChangeGroup}
              required
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input
              label="Name of Person of Contact"
              name="nameContact"
              value={signUpGroup.nameContact}
              onChange={handleChangeGroup}
              required
            />
            <Form.Input
              label="Phone Number for Person of Contact"
              name="phoneContact"
              value={signUpGroup.phoneContact}
              onChange={handleChangeGroup}
              required
            />
            <Form.Input
              label="Email for Person of Contact"
              name="emailContact"
              value={signUpGroup.emailContact}
              onChange={handleChangeGroup}
              required
            />
          </Form.Group>
          <Form.Input
            label="Hour Goal"
            name="hourGoal"
            value={signUpGroup.hourGoal}
            onChange={handleChangeGroup}
          />
          <Checkbox
            label="Safety Training Status Complete?"
            value={signUpGroup.safetyStatus}
            onChange={(e, data) =>
              setSignUp({ ...signUp, safetyStatus: data.checked })
            }
          />
        </Form>
      )}
      {confirmation && (
        <Form>
          <Form.Input
            label="Verification Code"
            name="code"
            value={group ? signUpGroup.code : signUp.code}
            onChange={group ? handleChangeGroup : handleChange}
            required
          />
        </Form>
      )}
      {usernameTaken && (
        <Message negative>
          <Message.Header>Username is already taken</Message.Header>
        </Message>
      )}
      {!passwordsMatch && (
        <Message negative>
          <Message.Header>Passwords must match</Message.Header>
        </Message>
      )}
      {!correctEmailFormat && (
        <Message negative>
          <Message.Header>Must have a valid email</Message.Header>
        </Message>
      )}
      {errorMessage != null && (
        <Message negative>
          <Message.Header>{errorMessage}</Message.Header>
        </Message>
      )}
      <br />
      {(group || indiv || confirmation) && (
        <Form.Button content="Submit" onSubmit={signUpCognito} />
      )}
    </Form>
  );
};

export default SignUpForm;

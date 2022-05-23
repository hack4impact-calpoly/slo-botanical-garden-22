import React, { useState, useEffect, useContext } from "react";
import { Form, Checkbox, Message } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import { Auth } from "aws-amplify";
import { useNavigate, Link } from "react-router-dom";
import { updatePersonalInfo, fetchUser } from "../../dynoFuncs";
import { GlobalContext } from "../../GlobalState";

const UpdateInfoForm = () => {
  const { setCurrentUser, currentUserInfo } = useContext(GlobalContext);
  const formType = currentUserInfo.volunteerTable;
  const [signUp, setSignUp] = useState({
    Birth_date: currentUserInfo.Birth_date,
    "Community Service": currentUserInfo["Community Service"],
    Covid_Waiver_and_Release: currentUserInfo.Covid_Waiver_and_Release,
    Email: currentUserInfo.Email,
    Emergency_Contact: currentUserInfo.Emergency_Contact,
    Emergency_Contact_Phone: currentUserInfo.Emergency_Contact_Phone,
    "First Name": currentUserInfo["First Name"],
    Group: currentUserInfo.Group,
    "Last Name": currentUserInfo["Last Name"],
    Medical_Conditions: currentUserInfo.Medical_Conditions,
    "Photo-Permission": currentUserInfo["Photo-Permission"],
    "Primary Phone": currentUserInfo["Primary Phone"],
    "Safety Training Status": currentUserInfo["Safety Training Status"],
    "Secondary Phone": currentUserInfo["Secondary Phone"],
    Volunter_Waiver_and_Release: currentUserInfo.Volunter_Waiver_and_Release,
    hourGoal: currentUserInfo.hourGoal,
    is_Admin: currentUserInfo.is_Admin,
    liveScanned: currentUserInfo.liveScanned,
    mailing_address: currentUserInfo.mailing_address,
    totalHours: currentUserInfo.totalHours,
    userLoggedIn: currentUserInfo.userLoggedIn,
    username: currentUserInfo.username,
    volunteerTable: currentUserInfo.volunteerTable,
  });

  const [signUpGroup, setSignUpGroup] = useState({
    emailContact: currentUserInfo.emailContact,
    groupName: currentUserInfo.groupName,
    hourGoal: currentUserInfo.hourGoal,
    is_Admin: currentUserInfo.is_Admin,
    phoneContact: currentUserInfo.phoneContact,
    nameContact: currentUserInfo.nameContact,
    safetyStatus: currentUserInfo.safetyStatus,
    totalHours: currentUserInfo.totalHours,
    userLoggedIn: currentUserInfo.userLoggedIn,
    username: currentUserInfo.username,
    volunteerTable: currentUserInfo.volunteerTable,
  });
  const handleChangeGroup = (e, { name, value }) =>
    setSignUpGroup({ ...signUpGroup, [name]: value });
  const handleChange = (e, { name, value }) =>
    setSignUp({ ...signUp, [name]: value });
  const [startDate, setStartDate] = useState();
  const [refresh, setRefresh] = useState();
  const [updateUser, setUpdateUser] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {}, [refresh]);

  useEffect(() => {
    console.log("UPDATING CONTEXT");
    fetchUser("volunteers_group", currentUserInfo.username).then((data) => {
      var userInfo;
      console.log("Fetch Group Data");
      console.log(data);
      userInfo = data;
      if (!userInfo) {
        fetchUser("volunteers_individual", currentUserInfo.username).then(
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
    if (updateUser !== 0) {
      navigate("/profile");
    }
  }, [updateUser]);

  const updateData = () => {
    if (currentUserInfo.volunteerTable === "volunteers_group") {
      updatePersonalInfo(signUpGroup, "volunteers_group");
    } else {
      updatePersonalInfo(signUp, "volunteers_individual");
    }
    setUpdateUser(updateUser + 1);
  };

  console.log(currentUserInfo);
  return (
    <Form
      className="signUpForm"
      style={{ padding: "40px", display: "flex", flexDirection: "column" }}
      onSubmit={updateData}
    >
      {formType === "volunteers_individual" && (
        <div>
          <h1
            style={{
              display: "flex",
              justifyContent: "center",
              paddingBottom: "5%",
              fontWeight: "bold",
            }}
          >
            Update Your Account's Personal Information
          </h1>
          <Form.Group widths="equal">
            <Form.Input
              label="First Name"
              name="First Name"
              value={signUp["First Name"]}
              onChange={handleChange}
              required
            />
            <Form.Input
              label="Last Name"
              name="Last Name"
              value={signUp["Last Name"]}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input
              label="Emergency Contact Phone Number"
              name="Emergency_Contact_Phone"
              value={signUp.Emergency_Contact_Phone}
              onChange={handleChange}
              required
            />
            <Form.Input
              label="Emergency Contact Name"
              name="Emergency_Contact"
              value={signUp.Emergency_Contact}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Input
            label="Group Name"
            name="Group"
            value={signUp.Group}
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
            name="mailing_address"
            value={signUp.mailing_address}
            onChange={handleChange}
            required
          />
          <Form.Input
            label="Phone Number"
            name="Primary Phone"
            value={signUp["Primary Phone"]}
            onChange={handleChange}
            required
          />
          <Form.Input
            label="Secondary Phone Number"
            name="Secondary Phone"
            value={signUp["Secondary Phone"]}
            onChange={handleChange}
          />
          <hr style={{ backgroundColor: "green", width: "100%" }} />
          <h3 style={{ textAlign: "left" }}>Personal Information:</h3>
          <label style={{ fontWeight: "bold" }}>Date of Birth</label>
          <input
            type="date"
            onChange={(e) => {
              setStartDate(e.target.value);
            }}
            required
          />
          <br />
          <Form.TextArea
            label="Medical Conditions"
            name="Medical_Conditions"
            value={signUp.Medical_Conditions}
            onChange={handleChange}
          />
          <div className="bool_top">
            <Checkbox
              label="Safety Training Status Complete?"
              checked={signUp["Safety Training Status"]}
              onChange={(e, data) =>
                setSignUp({ ...signUp, "Safety Training Status": data.checked })
              }
            />
            <Checkbox
              label="Volunteer Waiver and Release Complete?"
              checked={signUp.Volunter_Waiver_and_Release}
              onChange={(e, data) =>
                setSignUp({
                  ...signUp,
                  Volunter_Waiver_and_Release: data.checked,
                })
              }
            />
            <Checkbox
              label="Covid Waiver and Release Complete?"
              checked={signUp.Covid_Waiver_and_Release}
              onChange={(e, data) =>
                setSignUp({ ...signUp, Covid_Waiver_and_Release: data.checked })
              }
            />
            <br />
          </div>
          <div className="bool_top">
            <Checkbox
              checked={signUp["Community Service"]}
              onChange={(e, data) =>
                setSignUp({ ...signUp, "Community Service": data.checked })
              }
              label="Community Service?"
            />
            <Checkbox
              label="Photo Permission?"
              checked={signUp["Photo-Permission"]}
              style={{ paddingBottom: "10px", paddingRight: "10%" }}
              required
              onChange={(e, data) =>
                setSignUp({ ...signUp, "Photo-Permission": data.checked })
              }
            />
            <Checkbox
              className="liveScan"
              label="Lived Scanned? (Need to work with children)"
              checked={signUp.liveScanned}
              style={{ paddingBottom: "10px" }}
              required
              onChange={(e, data) =>
                setSignUp({ ...signUp, liveScanned: data.checked })
              }
            />
          </div>
          <br />
          <br />
        </div>
      )}
      {formType === "volunteers_group" && (
        <Form>
          <h1
            style={{
              display: "flex",
              justifyContent: "center",
              paddingBottom: "5%",
              fontWeight: "bold",
            }}
          >
            Update Your Account's Personal Information
          </h1>
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
          </Form.Group>
          <Form.Input
            label="Group Name"
            name="groupName"
            value={signUpGroup.groupName}
            onChange={handleChangeGroup}
            required
          />
          <Form.Input
            label="Hour Goal"
            name="hourGoal"
            value={signUpGroup.hourGoal}
            onChange={handleChangeGroup}
          />

          <Checkbox
            label="Safety Training Status Complete?"
            checked={signUpGroup.safetyStatus}
            onChange={(e, data) =>
              setSignUpGroup({ ...signUpGroup, safetyStatus: data.checked })
            }
          />
        </Form>
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        {formType !== "" && (
          <Link to="/profile">
            <Form.Button content="Cancel Changes" />
          </Link>
        )}
        {formType !== "" && (
          //<Link to="/profile">
          <Form.Button content="Update My Information" onSubmit={updateData} />
          //</Link>
        )}
      </div>
    </Form>
  );
};

export default UpdateInfoForm;

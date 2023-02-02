import React, { useContext, useRef } from "react";
import "./profileSideBar.css";
import { CSVLink } from "react-csv";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../GlobalState";

function ProfileSideBar({ hours }) {
  const { currentUserInfo } = useContext(GlobalContext);
  const csvLog = useRef();

  const booleanConverter = (item) => {
    // console.log("Bool Converter");
    // console.log(item);
    if (item === "True" || item === true) {
      return <p>Completed</p>;
    }
    return <p>Not Completed</p>;
  };

  const getExport = () => {
    // console.log(hours);
    if (hours.length !== 0) {
      return (
        <>
          <button
            className="csvStack"
            onClick={() => {
              csvLog.current.link.click();
            }}
          >
            Click to Export Your Logged Hours
          </button>
          <CSVLink
            data={hours}
            filename="your_volunteer_data"
            className="hidden"
            ref={csvLog}
            target="_blank"
          />
        </>
      );
    }

    return null;
  };

  const getInfo = () => {
    // console.log("Current User Info");
    // console.log(currentUserInfo);
    if (currentUserInfo.volunteerTable === "volunteers_group-TEST") {
      return (
        <div className="profInfoG">
          {getExport()}
          <p className="BarHeader"> Contact Information</p>
          <p>Contact Name: </p>
          <p className="value">{currentUserInfo.nameContact}</p>
          <p>Phone Number: </p>
          <p className="value">{currentUserInfo.phoneContact}</p>
          <p>Email: </p>
          <p className="value">{currentUserInfo.emailContact}</p>
          <Link to="/updateInfo">
            <button className="csvStack">Modify My Information</button>
          </Link>
        </div>
      );
    }
    return (
      <div className="profInfoI">
        {getExport()}
        <div className="left">
          <p className="BarHeader">Contact Information</p>
          <p>Primary Phone Number: </p>
          <p className="value">{currentUserInfo["Primary Phone"]}</p>
          <p>Secondary Phone Number: </p>
          <p className="value">{currentUserInfo["Secondary Phone"]}</p>
          <p>Email: </p>
          <p className="value">{currentUserInfo.Email}</p>
          <p>Emergency Contact: </p>
          <p className="value">{currentUserInfo.Emergency_Contact}</p>
          <p>Emergency Contact Phone Number: </p>
          <p className="value">{currentUserInfo.Emergency_Contact_Phone}</p>

          <p className="BarHeader">General Information</p>
          <p className="value">Birth Date: {currentUserInfo.Birth_date}</p>
          <p>Mailing Address: </p>
          <p className="value">{currentUserInfo.mailing_address}</p>
          <p>Medical Conditions: </p>
          <p className="value">{currentUserInfo.medicalConditions}</p>
          <p>Hour Goal: </p>
          <p className="value">{currentUserInfo.hourGoal}</p>
          <p>Group: </p>
          <p className="value">{currentUserInfo.Group}</p>
        </div>
        <div classNight="right">
          <p className="BarHeader">Forms</p>
          <p>Safety Training Status: </p>
          <p className="value">
            {booleanConverter(currentUserInfo["Safety Training Status"])}
          </p>
          <p>Volunteer Waiver and Release: </p>
          <p className="value">
            {booleanConverter(currentUserInfo.Volunter_Waiver_and_Release)}
          </p>
          <p>Covid Waiver and Release: </p>
          <p className="value">
            {booleanConverter(currentUserInfo.Covid_Waiver_and_Release)}
          </p>
          <p>Photo Permissions: </p>
          <p className="value">
            {booleanConverter(currentUserInfo["Photo-Permission"])}
          </p>
          <p>Live Scanned: </p>
          <p className="value">
            {booleanConverter(currentUserInfo.liveScanned)}{" "}
          </p>
          <p>Community Service: </p>
          <p className="value">
            {booleanConverter(currentUserInfo["Community Service"])}
          </p>
          <Link to="/updateInfo">
            <button className="csvStack">Modify My Information</button>
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="SideBar">
      <div className="header">Profile</div>
      <h className="name">About</h>
      <div className="info">{getInfo()}</div>
    </div>
  );
}

export default ProfileSideBar;

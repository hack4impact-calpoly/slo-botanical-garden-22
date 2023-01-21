import React, { useState, useEffect, useContext, useRef } from "react";
import { fetchData } from "../../dynoFuncs";
import HourLog from "../LogHours/logHours";
import AdminHourLog from "../LogHours/AdminLogHours";
import Navbar from "../Navbar/navbar";
import { GlobalContext } from "../../GlobalState";
import ContribitionTable from "../ContributionsTable/ContributionTable";
import ContributionTableAdmin from "../ContributionsTable/ContributionTableAdmin";
import "./profile.css";
import ProfileSideBar from "./profileSideBar";

function Profile() {
  const { currentUserInfo } = useContext(GlobalContext);
  const [reloadPage, setReloadPage] = useState(0);
  const [loggedHours, setLoggedHours] = useState();
  const [adminLoggedHours, setAdminLoggedHours] = useState();
  const [totalHours, setTotalHours] = useState(0); // eslint-disable-line
  const [startDate, setStartDate] = React.useState(); // eslint-disable-line
  const [endDate, setEndDate] = React.useState(); // eslint-disable-line
  const csvLog = useRef(); // eslint-disable-line

  useEffect(() => {
    fetchData("logged_hours").then((data) => {
      setAdminLoggedHours(
        data
          .filter((con) => con.username === "AdminLogged")
          .sort((a, b) => {
            const keyA = new Date(a.date);
            const keyB = new Date(b.date);
            if (keyA < keyB) return 1;
            if (keyA > keyB) return -1;
            return 0;
          })
      );
      setLoggedHours(
        data.filter((con) => con.username === currentUserInfo.username)
      );
    });
    setTotalHours(currentUserInfo.totalHours);
  }, [reloadPage]);

  useEffect(() => {}, [setTotalHours]);

  const getName = () => {
    if (currentUserInfo.volunteerTable === "volunteers_group") {
      return <h className="hName">{currentUserInfo.groupName}</h>;
    }
    return (
      <h className="hName">
        {currentUserInfo["First Name"]} {currentUserInfo["Last Name"]}
      </h>
    );
  };

  const getStatus = () => {
    if (currentUserInfo.is_Admin === "True") {
      return <h className="status">Administration</h>;
    }
    return <h className="status">Volunteer</h>;
  };

  const getAdminLogger = () => {
    if (currentUserInfo.is_Admin === "True") {
      return (
        <div>
          <div className="TopLabel">
            <h1>Admin Log Hours for Volunteers</h1>
          </div>
          <div className="conTable">
            {console.log("Admin Logged Hours")}
            {console.log(adminLoggedHours)}
            <ContributionTableAdmin
              setReloadPage={setReloadPage}
              reloadPage={reloadPage}
              loggedHours={adminLoggedHours}
            />
          </div>
          <div className="conTable">
            <AdminHourLog
              reloadPage={reloadPage}
              setReloadPage={setReloadPage}
            />
          </div>
        </div>
      );
    }

    return null;
  };

  if (!loggedHours || !currentUserInfo) return null;
  return (
    <>
      <Navbar />
      <div className="wholePage">
        <div className="LeftSide">
          <ProfileSideBar hours={loggedHours} />
        </div>
        <div className="RightSide">
          <div className="TopLabel">
            {getName()}
            {getStatus()}
          </div>
          <div className="conTable">
            <ContribitionTable
              setReloadPage={setReloadPage}
              reloadPage={reloadPage}
              loggedHours={loggedHours
                .filter((con) => con.username === currentUserInfo.username)
                .sort((a, b) => {
                  const keyA = new Date(a.date);
                  const keyB = new Date(b.date);
                  if (keyA < keyB) return 1;
                  if (keyA > keyB) return -1;
                  return 0;
                })}
            />
          </div>
          <div className="conTable">
            <HourLog reloadPage={reloadPage} setReloadPage={setReloadPage} />
          </div>
          {getAdminLogger()}
        </div>
      </div>
    </>
  );
}

export default Profile;

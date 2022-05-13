import React, { useState, useEffect, useContext } from "react";
import { fetchData, deleteHour } from "../../dynoFuncs";
import HourLog from "../LogHours/logHours";
import AdminHourLog from "../LogHours/AdminLogHours";
import Navbar from "../Navbar/navbar";
import { GlobalContext } from "../../GlobalState";
import ContribitionTable from "../ContributionsTable/ContributionTable";
import ContributionTableAdmin from "../ContributionsTable/ContributionTableAdmin";
import "./profile.css";
import ProfileSideBar from "./profileSideBar";

const Profile = () => {
  const { currentUserInfo } = useContext(GlobalContext);
  const [reloadPage, setReloadPage] = useState(0);
  const [loggedHours, setLoggedHours] = useState();
  const [totalHours, setTotalHours] = useState(0);

  useEffect(() => {
    fetchData("logged_hours").then((data) => setLoggedHours(data));
    setTotalHours(currentUserInfo.totalHours);
  }, [reloadPage]);

  useEffect(() => {}, [setTotalHours]);

  const getName = () => {
    if (currentUserInfo.volunteerTable === "volunteers_group") {
      return <h className="hName">{currentUserInfo.groupName}</h>;
    } else {
      return (
        <h className="hName">
          {currentUserInfo["First Name"]} {currentUserInfo["Last Name"]}
        </h>
      );
    }
  };

  const getStatus = () => {
    if (currentUserInfo.is_Admin === "True") {
      return <h className="status">Administration</h>;
    } else {
      return <h className="status">Volunteer</h>;
    }
  };

  const getAdminLogger = () => {
    if (currentUserInfo.is_Admin === "True") {
      return (
        <div>
          <div className="TopLabel">
            <h1>Admin Log Hours for Volunteers</h1>
          </div>
          <div className="conTable">
            <ContributionTableAdmin
              setReloadPage={setReloadPage}
              reloadPage={reloadPage}
              loggedHours={
                loggedHours
                  .filter((con) => con.username === "AdminLogged")
                  .sort((a, b) => a.date.toLowerCase() - b.date.toLowerCase())
                //.splice(0, 3)
              }
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
  };

  if (!loggedHours || !currentUserInfo) return null;
  return (
    <>
      <Navbar />
      <div className="wholePage">
        <div ClassName="LeftSide">
          <ProfileSideBar />
        </div>
        <div ClassName="RightSide">
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
                .sort(function (a, b) {
                  var keyA = new Date(a.date),
                    keyB = new Date(b.date);
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
};

export default Profile;

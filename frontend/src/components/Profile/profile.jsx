import React, { useState, useEffect, useContext } from "react";
import { fetchData, deleteHour } from "../../dynoFuncs";
import HourLog from "../../logHours";
import AdminHourLog from "../../AdminLogHours";
import Navbar from "../Navbar/navbar";
import { GlobalContext } from "../../GlobalState";
import ContribitionTable from "../ContributionsTable/ContributionTable";
import ContributionTableAdmin from "../ContributionsTable/ContributionTableAdmin";
import "./profile.css";

const Profile = () => {
  const { currentUserInfo } = useContext(GlobalContext);
  const [reloadPage, setReloadPage] = useState(0);
  const [loggedHours, setLoggedHours] = useState();

  useEffect(() => {
    fetchData("logged_hours").then((data) => setLoggedHours(data));
  }, [reloadPage]);

  const getAdminLogger = () => {
    if (currentUserInfo.is_Admin === "True") {
      return (
        <div>
          <div className="AdminHeader">
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

  if (!loggedHours) return null;

  return (
    <>
      <Navbar />
      <div className="wholePage">
        <div ClassName="LeftSide">
          <h1>PlaceHolder</h1>
        </div>
        <div ClassName="RightSide">
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

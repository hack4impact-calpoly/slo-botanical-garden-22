import React, { useState, useEffect } from "react";
import "./ContributionTable.css";
import { fetchData } from "../../dynoFuncs";
import HourLog from "../../logHours";

const ContributionTable = (props) => {
  const [loggedHours, setLoggedHours] = useState();
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    console.log("IN USE EFFECT");
    fetchData("logged_hours").then((data) => setLoggedHours(data));
    console.log(loggedHours);
  }, []);

  function fetchTotalHours() {
    let totalHoursPre = 0;
    loggedHours
      .filter((con) => con.username === "kennaGroup")
      .map((contribution) => (totalHoursPre += parseFloat(contribution.hours)));
    return totalHoursPre;
  }

  if (!loggedHours) return null;
  return (
    <div>
      <div className="container">
        <h1 id="title">Your Contributions:</h1>
        {/* replace with numHours data */}
        {console.log(fetchTotalHours())}
        <h1 id="numHours">{fetchTotalHours()} Total Hours</h1>
        <table>
          <tr id="header">
            <th>Date</th>
            <th>Hours</th>
            <th>Description</th>
            <th>Supervisor</th>
          </tr>
          {loggedHours
            .filter((con) => con.username === "kennaGroup")
            .map((contribution) => (
              <tr>
                <td>{contribution.date}</td> <td>{contribution.hours}</td>{" "}
                <td>{contribution.description}</td>{" "}
                <td>{contribution.supervisor}</td>
              </tr>
            ))}
        </table>
      </div>
      <HourLog updateContributions={setUpdate} />
      {console.log(update)}
    </div>
  );
};

export default ContributionTable;

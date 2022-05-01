import React, { useState, useContext } from "react";
import { putData, getRandomId, addHours } from "./dynoFuncs";
import { GlobalContext } from "./GlobalState";

export default function HourLog(props) {
  const [updateStatus, setUpdateStatus] = useState(false);
  const { currentUserInfo } = useContext(GlobalContext);

  var styles = `
  body
  {
      background: #f8edeb;
      font-family: "Century Gothic", Verdana, monospace;
      color: #1e502f;
      margin: 0px;
      font-weight: bold;
      line-height: 1;
  }

  textarea
  {
    border:solid 1px #686868;
  }
  
  .formtitle
  {
      margin: 10px;
      margin-bottom: 20px;
  }
  
  .dabox
  {
      display: flex;
      flex-direction: column;
      justify-content: left;
      padding: 0px;
      background-color: white;
      color: #556453;
      border-style: solid;
      border-width: 2px;
      border-color: #9c9c9c;
      box-shadow: 0 1px 0px 0px rgb(161, 161, 161);
      max-width: 700px;
      height: 220px;
  }
  
  .boxesholder
  {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
  }
  
  .boxcols
  {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
  }
  
  .lilbox
  {
      display: flex;
      flex-direction: column;
      margin: 10px;
      margin-top: 0px;
      margin-bottom: 0px;
      min-width: 170px;
  }
  
  
  .littlerbox
  {
      box-sizing: border-box;
      background-color: white;
      border-radius: 4%;
      padding: 10px;
      margin: 6px;
      margin-top: 0px;
      margin-bottom: 0px;
      border-width: 1px;
      border-color:rgb(185, 185, 185);
      color: #686868;
      font-family: "Century Gothic", Verdana, monospace;
      font-weight: bold;
      max-width: 200px;
  }
  input
  {
      font-family: "Century Gothic", Verdana, monospace;
      font-weight: bold;
      color: #686868;
      border-width: 1px;
      border-color:rgb(185, 185, 185);
      border-radius: 4%;
  }
  
  label
  {
      padding-bottom: 10px;
      color: #535e51;
  }
  
  .num
  {
      max-width: 100px;
  }
  
  #submit {
      background-color: #556453;
      border-radius: 8px;
      border-width: 1px;
      color: #FFFFFF;
      font-size: 16px;
      line-height: 10x;
      width: 100px;
      margin-top: 20px;
      margin-left: auto;
      margin-right: 0px;
    }
  `;

  var styleSheet = document.createElement("style");
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);

  async function submitForm() {
    const item = {
      primary_id: getRandomId(),
      activity: document.getElementById("activity").value,
      date: document.getElementById("date").value,
      supervisor: document.getElementById("supervisor").value,
      description: document.getElementById("description").value,
      hours: document.getElementById("hours").value,
      volunteerCount: document.getElementById("volunteerCount").value,
      username: currentUserInfo.username, //change based on cookie, wait for Arden meeting with Cole
    };
    console.log(item);
    document.getElementById("activity").value = "";
    document.getElementById("date").value = "";
    document.getElementById("supervisor").value = "";
    document.getElementById("description").value = "";
    document.getElementById("hours").value = "";
    document.getElementById("volunteerCount").value = "";

    putData("logged_hours", item);
    addHours(
      currentUserInfo.username,
      3 + parseFloat(item.hours),
      currentUserInfo.volunteerTable
    );
    props.setReloadPage(props.reloadPage + 1);
    console.log("Item in Logged Hours");
    console.log(item);
  }

  return (
    <div className="dabox">
      <div>
        <h3 className="formtitle">Log Hours: </h3>
      </div>
      <div>
        <div className="boxesholder">
          <div className="boxcols">
            <div className="lilbox">
              <label for="activity">Activity:</label>
              <select name="activity" id="activity">
                <option value="Other">Other</option>
                <option value="Administration">Administration</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Propagation">Propagation</option>
                <option value="Outreach">Outreach</option>
                <option value="Education">Education</option>
                <option value="Garden">Garden</option>
              </select>
            </div>
            <div className="lilbox">
              <label>Hours: </label>
              <textarea id="hours"></textarea>
            </div>
            <div className="lilbox">
              <label>Date: </label>
              <input type="date" id="date" />
            </div>
          </div>
          <div className="boxcols">
            <div className="lilbox">
              <label>Supervisor: </label>
              <textarea id="supervisor"></textarea>
            </div>
            <div className="lilbox">
              <label>Number of Volunteers: </label>
              <textarea id="volunteerCount" type="number"></textarea>
            </div>
          </div>
          <div className="boxcols">
            <div className="lilbox">
              <label>Description: </label>
              <textarea
                className="littlerbox"
                id="description"
                rows="3"
                cols="30"
                name="text"
              ></textarea>
            </div>
            <div className="lilbox">
              <input
                id="submit"
                type="submit"
                value="Submit"
                onClick={submitForm}
              />
            </div>
          </div>
        </div>
      </div>
      {console.log("Update: " + updateStatus)}
    </div>
  );
}

import React, { useState } from "react";
//import styles from "./AnnouncementForm.module.css";
import { putData, getRandomId } from "../../dynoFuncs";

export default function AnnouncementForm(props) {
  const [newAnnouncement, setNewAnnouncement] = useState({
    Message: "Nothing Yet",
  });

  var styles = `
    #body {
      background: #f8edeb;
      font-family: "Century Gothic", Verdana, monospace;
      color: #1e502f;
      margin: 0px;
      font-weight: bold;
      line-height: 1;
    }
    
    #formtitle {
      margin: 10px;
      display: flex;
      justify-content: center;
      font-size="lg";
      color="#cee4bb"
    }
    
    #lilbox {
      display: flex;
      flex-direction: column;
      align-content: center;
      padding: 0px;
      border-radius: 5%;
      background-color: #e3e3e3;
      max-width: 250px;
      color: #556453;
      border-style: solid;
      border-width: 2px;
      border-color: #9c9c9c;
      box-shadow: 0 2px 1px 1px rgb(161, 161, 161);
    }
    
    #lilbuttons {
      display: flex;
      padding: 10px;
      flex-basis: 10px;
      justify-content: space-evenly;
    }
    
    #publish {
      font-family: "Century Gothic", Verdana, monospace;
      font-weight: bold;
      background-color: #556453;
      border-radius: 8px;
      border-width: 1px;
      color: #ffffff;
      font-size: 16px;
      line-height: 10x;
      padding: 10px;
      width: 110px;
    }
    
    .textBoxes {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 10%;
    }
    
    .littlerbox {
      box-sizing: border-box;
      background-color: #e3e3e3;
      border-radius: 5%;
      padding: 10px;
      margin: 6px;
      margin-top: 0px;
      margin-bottom: 0px;
      border-width: 1px;
      color: #686868;
      font-family: "Century Gothic", Verdana, monospace;
      font-weight: bold;
      height: 225px;
      width: 95%;
      box-shadow: 0 2px 1px 1px rgb(161, 161, 161);
    } 
    .littlestbox {
      box-sizing: border-box;
      background-color: #e3e3e3;
      border-radius: 10%;
      padding: 10px;
      margin: 6px;
      margin-top: 0px;
      margin-bottom: 0px;
      border-width: 1px;
      color: #686868;
      font-family: "Century Gothic", Verdana, monospace;
      font-weight: bold;
      height: 10%;
      width: 95%;
      box-shadow: 0 2px 1px 1px rgb(161, 161, 161);
    } 
  `;

  var styleSheet = document.createElement("style");
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);

  async function submitForm() {
    setNewAnnouncement("TEST", () => {
      console.log(newAnnouncement);
    });
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + "/" + dd + "/" + yyyy;
    const item = {
      primary_id: getRandomId(),
      content: document.getElementById("content").value,
      date: today,
      poster: document.getElementById("poster").value,
      title: document.getElementById("title").value,
    };
    document.getElementById("content").value = "";
    document.getElementById("poster").value = "";
    document.getElementById("title").value = "";
    putData("admin_announcements", item);
    console.log(newAnnouncement);
    console.log(item);
    console.log(newAnnouncement);
  }

  return (
    <div>
      <div id="lilbox" className={styles.lilbox}>
        <h3 id="formtitle">Create New Announcement </h3>
        <div id="announcementForm">
          <div className="textboxes">
            <textarea
              id="title"
              className="littlestbox"
              rows="1"
              cols="100%"
              name="title"
              placeholder="Title"
            ></textarea>
            <textarea
              id="poster"
              className="littlestbox"
              rows="1"
              cols="100%"
              name="poster"
              placeholder="Poster"
            ></textarea>
            <textarea
              className="littlerbox"
              id="content"
              rows="3"
              cols="100%"
              name="content"
              placeholder="Message"
            ></textarea>
            <br />
          </div>
          <div id="lilbuttons" className={styles.lilbuttons}>
            <input
              className={styles.publish}
              id="publish"
              type="reset"
              value="Post"
              onClick={submitForm}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

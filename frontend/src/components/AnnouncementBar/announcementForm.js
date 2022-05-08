import React, { useState } from "react";
//import styles from "./AnnouncementForm.module.css";
import { putData, getRandomId } from "../../dynoFuncs";

export default function AnnouncementForm(props) {
  const [newAnnouncement, setNewAnnouncement] = useState({
    Message: "Nothing Yet",
  });

  var styles = `    
    #formtitle {
      margin: 10px;
      display: flex;
      justify-content: center;
      font-size=1em;
      color="#465344"
    }
    
    #lilbox {
      display: flex;
      flex-direction: column;
      align-content: center;
      border-radius: 5%;
      background-color: #576754;
      color: #CCDDBD;
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
      color: #cee4bb;
      font-size: 16px;
      line-height: 10x;
      padding: 10px;
      width: 100%;
    }
    
    .textBoxes {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 10%;
    }
    
    .littlestbox {
      box-sizing: border-box;
      background-color: #cee4bb;
      border-radius: 10px;
      padding: 10px;
      margin: 6px;
      margin-top: 6px;
      margin-bottom: 0px;
      border-width: 1px;
      font-family: "Century Gothic", Verdana, monospace;
      font-weight: bold;
      height: 10%;
      width: 95%;
      color: #576754;
    } 

    textarea::placeholder {
      color: #576754;  
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
    console.log("Announcement Form props");
    console.log(props.reloadPageVar);
    console.log(props.reloadPageFunc);
    putData("admin_announcements", item);
    props.reloadPageFunc(props.reloadPageVar + 1);
    console.log(newAnnouncement);
    console.log(item);
    console.log(newAnnouncement);
  }

  return (
    <div>
      <div id="lilbox" className={styles.lilbox}>
        <h1 id="formtitle">Create New Announcement </h1>
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
              rows="2"
              cols="100%"
              name="poster"
              placeholder="Poster"
            ></textarea>
            <textarea
              className="littlestbox"
              id="content"
              rows="6"
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

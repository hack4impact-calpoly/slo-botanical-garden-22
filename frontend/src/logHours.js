import React from "react";

export default function AnnouncementForm(props) {
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
  
  #formtitle
  {
      margin: 10px;
      margin-bottom: 20px;
  }
  
  #dabox
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
  
  #boxesholder
  {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
  }
  
  #boxcols
  {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
  }
  
  #lilbox
  {
      display: flex;
      flex-direction: column;
      margin: 10px;
      margin-top: 0px;
      margin-bottom: 0px;
      min-width: 170px;
  }
  
  
  #littlerbox
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
  `

var styleSheet = document.createElement("style")
styleSheet.innerText = styles
document.head.appendChild(styleSheet)

  return (
    <div id = "dabox">
        <div>
            <h3 id = "formtitle">Log Hours: </h3>
        </div>
        <div >
            <form id = "boxesholder" action="/form/submit" method = "GET">
                <div id = "boxcols">
                    <div id = "lilbox">
                        <label for="activity">Activity:</label>
                        <select name="activity">
                        <option value="activity 1">Activity 1</option>
                        <option value="activity 2">Activity 2</option>
                        <option value="activity 3">Activity 3</option>
                        <option value="activity 4">Activity 4</option>
                        </select>
                    </div>
                    <div id = "lilbox" >
                        <label>Hours: </label>
                        <input id = "hours" value=""/>
                    </div>
                    <div id = "lilbox" >
                        <label>Date: </label>
                        <input type = "date" id = "date" value=""/>
                    </div>
                </div>
                <div id = "boxcols">
                    <div id = "lilbox" >
                        <label>Supervisor: </label>
                        <input id = "supervisor" value=""/>
                    </div>
                    <div id = "num" id = "lilbox" >
                        <label>Number of Volunteers: </label>
                        <input id = "number" type = "number" value=""/>
                    </div>
                </div>
                <div id = "boxcols" >
                    <div id = "lilbox" >
                        <label>Description: </label>
                        <textarea id = "littlerbox" rows="3" cols="30" name="text" ></textarea>
                    </div>
                    <div id = "lilbox" >
                        <input id = "submit" type="submit" value="Submit"/>
                    </div>
                </div>
            </form>
        </div>
    </div>
  );
}
import React, { useState, useEffect } from "react";
import "./ContributionTable.css";
import { fetchData, deleteHour } from "../../dynoFuncs";
import HourLog from "../../logHours";
import DeleteIcon from "@material-ui/icons/Delete";
import { IconButton } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const ContributionTable = (props) => {
  const [loggedHours, setLoggedHours] = useState();
  const [update, setUpdate] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDelete = async () => {
    console.log(typeof props.id);
    console.log(props.id);
    deleteHour("admin_announcements", props.id);
    alert(
      "Announcement Successfully Deleted. \nPlease refresh page to see change."
    );
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

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
            <th>Delete</th>
          </tr>
          {loggedHours
            .filter((con) => con.username === "kennaGroup")
            .map((contribution) => (
              <tr>
                <td>{contribution.date}</td> <td>{contribution.hours}</td>{" "}
                <td>{contribution.description}</td>{" "}
                <td>{contribution.supervisor}</td>
                <td>
                  <IconButton
                    style={{ color: "#cee4bb" }}
                    onClick={handleClickOpen}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <Dialog
                    open={open}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {"Are you sure you want to delete this announcement?"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        This action can't be undone.
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleCancel} color="#CCDDBD">
                        Cancel
                      </Button>
                      <Button onClick={handleDelete} color="#CCDDBD" autoFocus>
                        Delete Announcement
                      </Button>
                    </DialogActions>
                  </Dialog>
                </td>
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

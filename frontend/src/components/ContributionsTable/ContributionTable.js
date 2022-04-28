import React, { useState, useEffect, useContext } from "react";
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
import { GlobalContext } from "../../GlobalState";

const ContributionTable = () => {
  const { currentUserInfo } = useContext(GlobalContext);
  const [loggedHours, setLoggedHours] = useState();
  const [update, setUpdate] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [toDelete, setToDelete] = useState();
  const [reloadPage, setReloadPage] = useState(0);

  const handleClickOpen = (id) => {
    setToDelete(id);
    setOpen(true);
  };

  const handleDelete = async () => {
    deleteHour(toDelete);
    setReloadPage(reloadPage + 1);
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetchData("logged_hours").then((data) => setLoggedHours(data));
  }, [reloadPage]);

  if (!loggedHours || !currentUserInfo) return null;
  return (
    <div className="Page">
      <div className="container">
        <h1 id="title">Your Contributions:</h1>
        {/* replace with numHours data */}
        {console.log(currentUserInfo)}
        {/* {currentUserInfo.totalHours} */}
        <h1 id="numHours">4 Total Hours</h1>
        <table>
          <tr id="header">
            <th>Date</th>
            <th>Hours</th>
            <th>Description</th>
            <th>Supervisor</th>
            <th>Delete</th>
          </tr>
          {loggedHours
            .filter((con) => con.username === currentUserInfo.username)
            .map((contribution) => (
              <tr>
                {console.log(contribution)}
                <td>{contribution.date}</td> <td>{contribution.hours}</td>{" "}
                <td>{contribution.description}</td>{" "}
                <td>{contribution.supervisor}</td>
                <td>
                  <IconButton
                    style={{ color: "#cee4bb" }}
                    onClick={() => handleClickOpen(contribution.primary_id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <Dialog
                    open={open}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {
                        "Are you sure you want to delete this volunteering instance?"
                      }
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
                        Delete Volunteer Instance
                      </Button>
                    </DialogActions>
                  </Dialog>
                </td>
              </tr>
            ))}
        </table>
      </div>
      <HourLog reloadPage={reloadPage} setReloadPage={setReloadPage} />
      {console.log(update)}
    </div>
  );
};

export default ContributionTable;

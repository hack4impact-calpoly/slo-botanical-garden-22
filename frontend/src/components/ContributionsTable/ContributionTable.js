import React, { useState, useContext } from "react";
import "./ContributionTable.css";
import DeleteIcon from "@material-ui/icons/Delete";
import { IconButton } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
// import ReactTable,{ useSortBy, useTable, usePagination } from "react-table";

import { GlobalContext } from "../../GlobalState";
import { deleteHour, changeHours } from "../../dynoFuncs";
import Milestone from "../Milestones/Milestones";

function ContributionTable({ setReloadPage, reloadPage, loggedHours }) {
  const { currentUserInfo } = useContext(GlobalContext);
  const [open, setOpen] = React.useState(false);
  const [toDelete, setToDelete] = useState();

  const handleClickOpen = (id) => {
    setToDelete(id);
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  let totalHours = 0;
  loggedHours.map(
    (contribution) => (totalHours += parseFloat(contribution.hours)) // eslint-disable-line
  );

  console.log(loggedHours);
  if (loggedHours.length === 0 || loggedHours === undefined) {
    loggedHours = [ // eslint-disable-line
      {
        date: " ",
        hours: " ",
        description: "No Hours Logged Yet",
        supervisor: " ",
      },
    ];
  }

  const handleDelete = async () => {
    deleteHour(toDelete);
    let totalHoursNew = 0;
    loggedHours.map(
      // this is probably the broken part :/
      (contribution) => (totalHoursNew += parseFloat(contribution.hours)) // eslint-disable-line
    );
    changeHours(
      currentUserInfo.username,
      totalHoursNew,
      currentUserInfo.volunteerTable
    );
    setReloadPage(reloadPage + 1);
    setOpen(false);
  };

  const getDelete = (contribution) => {
    if (contribution.hours !== " ") {
      return (
        <div>
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
              Are you sure you want to delete this volunteering instance?
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
        </div>
      );
    }

    return null;
  };
  return (
    <div className="Page">
      <div className="container">
        <div className="topRow">
          <h1 id="title">Your Most Recent Contributions:</h1>
          <h1 id="numHours">{totalHours} Total Hours</h1>
        </div>
        <table className="fixed_header">
          <thead>
            <tr id="header">
              <th>Date</th>
              <th>Hours</th>
              <th>Description</th>
              <th>Supervisor</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {loggedHours.map((contribution) => (
              <tr>
                <td>{contribution.date}</td> <td>{contribution.hours}</td>{" "}
                <td>{contribution.description}</td>{" "}
                <td>{contribution.supervisor}</td>{" "}
                <td>{getDelete(contribution)}</td>{" "}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Milestone hours={totalHours} />
    </div>
  );
}

export default ContributionTable;

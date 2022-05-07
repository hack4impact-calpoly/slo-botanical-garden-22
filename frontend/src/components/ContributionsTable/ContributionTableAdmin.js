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
import ReactTable from "react-table";
import { useSortBy, useTable, usePagination } from "react-table";

const ContributionTableAdmin = ({ setReloadPage, reloadPage, loggedHours }) => {
  const { currentUserInfo } = useContext(GlobalContext);
  const [open, setOpen] = React.useState(false);
  const [toDelete, setToDelete] = useState();

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

  console.log("currentUserInfo in contributions");
  console.log(currentUserInfo);
  console.log(loggedHours);

  if (loggedHours.length === 0 || loggedHours === undefined) {
    console.log("HERE");
    loggedHours = [
      {
        date: " ",
        hours: " ",
        description: "No Hours Logged Yet",
        volunteer: " ",
      },
    ];
  }

  const getDelete = (contribution) => {
    console.log(contribution);
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
              {"Are you sure you want to delete this volunteering instance?"}
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
  };

  return (
    <div className="Page">
      <div className="container">
        <div className="topRow">
          <h1 id="title">Contributions Logged by Admin:</h1>
        </div>
        <h1> </h1>
        <h1> </h1>
        <table class="fixed_header">
          <thead>
            <tr id="header">
              <th>Date</th>
              <th>Hours</th>
              <th>Description</th>
              <th>Volunteer</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {loggedHours.map((contribution) => (
              <tr>
                <td>{contribution.date}</td> <td>{contribution.hours}</td>{" "}
                <td>{contribution.description}</td>{" "}
                <td>{contribution.volunteer}</td>{" "}
                <td>{getDelete(contribution)}</td>{" "}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContributionTableAdmin;

{
  /* <ReactTable
          data={loggedHours}
          pageSizeOptions={[20, 30, 50, 100, 200, 500]}
          columns={[
            {
              Header: "Hours",
              accessor: "hours",
              minWidth: 300,
            },
          ]}
          defaultPageSize={20}
          getTableProps={() => {
            return {
              onScroll: (e) => {
                if (this.tableScrollTop === e.target.scrollTop) {
                  let left = e.target.scrollLeft > 0 ? e.target.scrollLeft : 0;
                } else {
                  this.tableScrollTop = e.target.scrollTop;
                }
              },
            };
          }}
        /> */
}

{
  /* <table className="table">
          <tbody>
            <tr id="header">
              <th>Date</th>
              <th>Hours</th>
              <th>Description</th>
              <th>Supervisor</th>
              <th>Delete</th>
            </tr>
            {loggedHours.map((contribution) => (
              <tr>
                <td>{contribution.date}</td> <td>{contribution.hours}</td>{" "}
                <td>{contribution.description}</td>{" "}
                <td>{contribution.supervisor}</td>{" "}
                <td>{getDelete(contribution)}</td>
              </tr>
            ))}
          </tbody>
        </table> */
}

/* eslint-disable */
import React, { useState, useEffect, useRef, useContext } from "react";
import { useSortBy, useTable, usePagination } from "react-table";
import "./volunteerTable.css";
import { Flex, Box, VStack } from "@chakra-ui/react";
import { CSVLink } from "react-csv";
import { Checkbox } from "semantic-ui-react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DeleteIcon from "@material-ui/icons/Delete";
import { IconButton } from "@material-ui/core";
// import Amplify, { Auth, API } from "aws-amplify";
import { GlobalContext } from "../../GlobalState";
import {
  fetchData,
  deleteVolunteer,
  changeVolunteerStatus,
} from "../../dynoFuncs";
import Navbar from "../Navbar/navbar";
import UpdateInfoForm from "./updateUserInfo.jsx";
import LogUserHoursForm from "./logUserHours.jsx";
import { fetchUser } from "../../dynoFuncs";

const { CognitoIdentityServiceProvider } = require("aws-sdk");

const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider();
async function disableUser(username) {
  const params = {
    UserPoolId: process.env.REACT_APP_SECRET_USER_POOL_ID,
    Username: username,
  };

  try {
    const result = await cognitoIdentityServiceProvider // eslint-disable-line
      .adminDisableUser(params)
      .promise();
    console.log(`Disabled ${username}`);
    return {
      message: `Disabled ${username}`,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
}

function VolunteerTable() {
  // const [data, setData] = useState();
  const [reloadPage, setReloadPage] = useState(0);
  const { currentUserInfo } = useContext(GlobalContext);
  const [groupTable, setGroupTable] = useState(false);
  const [indiv, setIndiv] = useState(true);
  const [startDate, setStartDate] = React.useState();
  const [endDate, setEndDate] = React.useState();
  const [loggedHours, setLoggedHours] = React.useState([]);
  const [filteredLoggedHours, setFilteredLoggedHours] = React.useState([]);
  const [volunteers, setVolunteers] = React.useState([]);
  const [group, setGroup] = React.useState([]);
  const [csvReady, setCSVReady] = React.useState(false);
  const csvLog = useRef();

  const reloadData = () => {
    fetchData("logged_hours_empty_2_TEST").then((result) =>
      setLoggedHours(result)
    ); /// should be logged_hours-TEST
    fetchData("volunteers_group-TEST").then((result) => setGroup(result));
    fetchData("volunteers_individual-TEST").then((result) =>
      setVolunteers(result)
    );
  };

  useEffect(() => {
    reloadData();
  }, [reloadPage]);

  useEffect(() => {
    if (csvReady == true) {
      csvLog.current.link.click();
    }
  }, [filteredLoggedHours]);

  const data = volunteers;
  const groupData = group;
  // console.log("VolunteerInfo 1");
  // console.log(data);
  // console.log(volunteers);
  // console.log(groupData);
  // console.log(group);
  // console.log(loggedHours);
  // console.log(groupData.length);

  if (!loggedHours || !currentUserInfo || !data || !groupData) return null;

  return (
    <>
      {/* {console.log("VolunteerInfo")}
      {console.log(data)}
      {console.log(groupData)}
      {console.log(loggedHours)} */}
      <Navbar />
      <div
        style={{
          textAlign: "center",
          paddingLeft: "20%",
          paddingTop: "5%",
          borderRadius: "5px",
        }}
        className="boxes"
      >
        <Checkbox
          label="Individual"
          style={{ background: "#CCDDBD", padding: "20px", fontSize: "20px" }}
          borderColor="black"
          onChange={() => {
            setIndiv(true);
            if (groupTable) {
              setGroupTable(false);
            }
          }}
          checked={indiv}
        >
          Individual
        </Checkbox>
        <Checkbox
          style={{ background: "#CCDDBD", padding: "20px", fontSize: "20px" }}
          borderColor="black"
          label="Group"
          onChange={() => {
            setGroupTable(true);
            if (indiv) {
              setIndiv(false);
            }
          }}
          checked={groupTable}
        >
          Group
        </Checkbox>
      </div>
      <Flex
        p={10}
        w="100%"
        overflow="auto"
        justify="space-evenly"
        align="center"
      >
        <VStack
          textAlign="center"
          marginRight="50px"
          spacing="20px"
          bgColor="rgb(87, 103, 84)"
          padding="2%"
          borderRadius="5px"
        >
          <CSVLink
            data={data}
            filename="individual_volunteers.csv"
            className="export"
          >
            Export Individual Volunteers
          </CSVLink>
          <CSVLink
            data={group}
            filename="group_volunteers.csv"
            className="export"
          >
            Export Group Volunteers
          </CSVLink>
          <label
            style={{
              background: "rgb(230, 242, 217)",
              padding: "5px",
              borderRadius: "5px",
              paddingBottom: "10px",
            }}
          >
            Set Date Range for Logged Hours Records
          </label>
          <div className="date">
            <label
              style={{
                background: "rgb(230, 242, 217)",
                padding: "5px",
                borderRadius: "5px",
                paddingBottom: "10px",
              }}
            >
              Start Date
            </label>
            <br />
            <input
              type="date"
              style={{
                background: "rgb(230, 242, 217)",
                borderRadius: "5px",
                padding: "2px",
              }}
              onChange={(e) => {
                setStartDate(e);
              }}
            />
          </div>
          <br />

          <div className="date" style={{ marginTop: "5px" }}>
            <label
              style={{
                background: "rgb(230, 242, 217)",
                padding: "5px",
                borderRadius: "5px",
              }}
            >
              End Date
            </label>
            <br />
            <input
              type="date"
              style={{
                background: "rgb(230, 242, 217)",
                borderRadius: "5px",
                padding: "2px",
              }}
              onChange={(e) => {
                setEndDate(e);
              }}
            />
          </div>
          <button
            className="export"
            onClick={() => {
              if (!startDate || !endDate) {
                alert("Please select a start date and end date");
              } else {
                const logged = loggedHours
                  .filter(
                    (obj) =>
                      new Date(obj.date).getTime() >=
                        startDate.target.valueAsNumber &&
                      new Date(obj.date).getTime() <=
                        endDate.target.valueAsNumber
                  )
                  .map((obj) => {
                    delete obj.primary_id; // eslint-disable-line
                    return obj;
                  });
                console.log(logged);
                if (logged.length === 0) {
                  alert("No hours were logged during this window");
                  return;
                }
                setCSVReady(true);
                setFilteredLoggedHours(logged);
              }
            }}
          >
            Export Logged Hours
          </button>
          {console.log(loggedHours)}
          <CSVLink
            data={filteredLoggedHours}
            style={{ background: "rgb(230, 242, 217)" }}
            filename="logged_volunteer_data"
            className="hidden"
            ref={csvLog}
            target="_blank"
          />
          {console.log(loggedHours)}
        </VStack>
        {indiv && (
          <Table
            data={data}
            reloadPage={reloadPage}
            setReloadPage={setReloadPage}
          />
        )}
        {groupTable && (
          <GroupTable
            data={groupData}
            reloadPage={reloadPage}
            setReloadPage={setReloadPage}
          />
        )}
      </Flex>
    </>
  );
}

function Table(props) {
  const { data } = props;
  const [openDelete, setDelete] = React.useState(false);
  const [userToDelete, setUserToDelete] = React.useState();
  const [openStatus, setStatus] = React.useState(false);
  const [userToStatusChage, setUserToStatusChage] = React.useState();
  const [userStatus, setUserStatus] = React.useState("False");

  const [showModify, setShowModify] = useState(false);
  const [modifyingUser, setModifyingUser] = useState("");
  const [showLogging, setShowLogging] = useState(false);
  const [loggingUser, setLoggingUser] = useState("");

  const handleClickOpenDelete = (username) => {
    setUserToDelete(username);
    setDelete(true);
  };

  const handleClickOpenStatus = (username, status) => {
    setUserToStatusChage(username);
    setUserStatus(status);
    setStatus(true);
  };

  const handleDelete = async () => {
    // console.log("IN handle delete");
    console.log(`UserDel: ${userToDelete}`);
    const ret = await disableUser(userToDelete);
    console.log(ret);
    deleteVolunteer(userToDelete, "volunteers_individual-TEST");
    setDelete(false);
    props.setReloadPage(props.reloadPage + 1);
  };

  const handleStatusChange = async () => {
    changeVolunteerStatus(
      userToStatusChage,
      "volunteers_individual-TEST",
      userStatus
    );
    setStatus(false);
    props.setReloadPage(props.reloadPage + 1);
  };

  const handleCancel = () => {
    setDelete(false);
    setStatus(false);
  };

  const handleModifyUser = async (username) => {
    await fetchUser("volunteers_individual-TEST", username).then((data) => {
      let userInfo;
      // eslint-disable-line
      userInfo = data;

      userInfo.volunteerTable = "volunteers_individual-TEST";
      userInfo.userLoggedIn = false; ///////MAY NEED TO SET THS TO FALSE
      // console.log("userInfo");
      // console.log(userInfo);
      setModifyingUser(userInfo);
      // setCurrentUser(userInfo);
    });
    setShowModify(true);
  };

  const handleLogHours = async (username) => {
    setShowLogging(true);
    setLoggingUser({ username: username });
    console.log(`logging for ${username}`);
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "Name", // accessor is the "key" in the data
        Cell: (row) => (
          <div>
            <span>
              {`${row.row.original["First Name"]} ${row.row.original["Last Name"]}`}
            </span>
          </div>
        ),
      },
      {
        Header: "Email",
        accessor: "Email", // Email
      },
      {
        Header: "Volunteer or Admin",
        accessor: "is_Admin",
        Cell: (row) => {
          if (row.row.original.is_Admin === "True") {
            return (
              <div>
                <p>Administration</p>
              </div>
            );
          }
          return (
            <div>
              <p>Volunteer</p>
            </div>
          );
        },
      },
      {
        Header: "Change Status",
        accessor: "status",
        Cell: (row) => {
          if (row.row.original.is_Admin === "True") {
            return (
              <div>
                <button
                  onClick={() =>
                    handleClickOpenStatus(row.row.original.username, "False")
                  }
                >
                  Revoke Admin Privledges 🔽
                </button>
              </div>
            );
          }
          return (
            <div>
              <div>
                <button
                  onClick={() =>
                    handleClickOpenStatus(row.row.original.username, "True")
                  }
                >
                  Invoke Admin Privileges 🔼
                </button>
              </div>
            </div>
          );
        },
      },
      {
        Header: "Modify Info",
        accessor: "Modify",
        Cell: (row) => (
          <div>
            <div>
              <button
                onClick={async () =>
                  handleModifyUser(row.row.original.username)
                }
              >
                Modify User Info
              </button>
            </div>
          </div>
        ),
      },
      {
        Header: "Log Hours",
        accessor: "LogHours",
        Cell: (row) => (
          <div>
            <div>
              <button
                onClick={async () => handleLogHours(row.row.original.username)}
              >
                Log Hours For User
              </button>
            </div>
          </div>
        ),
      },
      {
        Header: "Delete Volunteer",
        accessor: "Delete",
        Cell: (row) => (
          <div>
            <IconButton
              style={{ color: "#cee4bb" }}
              onClick={() => handleClickOpenDelete(row.row.original.username)}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      initialState: {
        sortBy: [
          {
            id: "Name",
          },
        ],
      },
    },
    useSortBy,
    usePagination
  );

  return (
    <div className="container">
      <Flex p={0} w="100%">
        <Box>
          <table
            {...getTableProps()}
            style={{
              boxShadow: "0 0 20px rgba(0,0,0,0.8)",
              background: "#CCDDBD",
              borderSpacing: "0 1em",
            }}
          >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      style={{
                        borderRight: "none",
                        background: "#576754",
                        color: "white",
                        cursor: "pointer",
                      }}
                    >
                      {column.render("Header")}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? " 🔽"
                            : " 🔼"
                          : ""}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                if (row.values.Email === "") return;
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td
                        {...cell.getCellProps()}
                        style={{
                          background: "#e6f2d9",
                        }}
                      >
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <br />
          <div className="pagination">
            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
              {"<<"}
            </button>{" "}
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
              {"<"}
            </button>{" "}
            <button onClick={() => nextPage()} disabled={!canNextPage}>
              {">"}
            </button>{" "}
            <button
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              {">>"}
            </button>{" "}
            <span>
              Page{" "}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{" "}
            </span>
            <span> | </span>
            <span>
              Go to page:{" "}
              <input
                type="number"
                defaultValue={pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0; // eslint-disable-line
                  gotoPage(page);
                }}
                style={{ paddingLeft: "10px", width: "40px" }}
              />
            </span>{" "}
            <span
              value={15}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
            />
          </div>
          <Dialog
            open={openDelete}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              Are you sure you want to delete this volunteer?
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
                Delete Volunteer
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={openStatus}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              Are you sure you want to change the status of this user?
            </DialogTitle>
            <DialogContent />
            <DialogActions>
              <DialogActions>
                <Button onClick={handleCancel} color="#CCDDBD">
                  Cancel
                </Button>
                <Button onClick={handleStatusChange} color="#CCDDBD" autoFocus>
                  Change User Status
                </Button>
              </DialogActions>
            </DialogActions>
          </Dialog>
          <Dialog
            open={showModify}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth={1400}
          >
            <DialogTitle id="alert-dialog-title">
              Modify user: {modifyingUser.username}
            </DialogTitle>
            <DialogContent />
            <DialogActions>
              <UpdateInfoForm
                userMod={modifyingUser}
                showFunc={setShowModify}
              ></UpdateInfoForm>
              {/* <DialogActions>
                <Button onClick={handleModifyCancel} color="#CCDDBD">
                  Cancel
                </Button>
                <Button onClick={handleModifyCancel} color="#CCDDBD" autoFocus>
                  Change User Status
                </Button>
              </DialogActions> */}
            </DialogActions>
          </Dialog>
          <Dialog
            open={showLogging}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth={1400}
          >
            <DialogTitle id="alert-dialog-title">
              Log hours for: {loggingUser.username}
            </DialogTitle>
            <DialogContent>
              <LogUserHoursForm
                loggingUserName={loggingUser.username}
                setShowLog={setShowLogging}
              />
            </DialogContent>
            <DialogActions></DialogActions>
          </Dialog>
        </Box>
      </Flex>
    </div>
  );
}

function GroupTable(props) {
  const { data } = props;
  const [openDelete, setDelete] = React.useState(false);
  const [userToDelete, setUserToDelete] = React.useState();
  const [openStatus, setStatus] = React.useState(false);
  const [userToStatusChage, setUserToStatusChage] = React.useState();
  const [userStatus, setUserStatus] = React.useState("False");

  const [showModify, setShowModify] = useState(false);
  const [modifyingGroup, setModifyingGroup] = useState("");
  const [showLogging, setShowLogging] = useState(false);
  const [loggingUser, setLoggingUser] = useState("");

  const handleClickOpenDelete = (username) => {
    setUserToDelete(username);
    setDelete(true);
  };

  const handleClickOpenStatus = (username, status) => {
    setUserToStatusChage(username);
    setUserStatus(status);
    setStatus(true);
  };

  const handleDelete = async () => {
    // console.log("IN handle delete");
    console.log(`UserDel: ${userToDelete}`);
    deleteVolunteer(userToDelete, "volunteers_group-TEST");
    const ret = await disableUser(userToDelete);
    console.log(ret);
    setDelete(false);
    props.setReloadPage(props.reloadPage + 1);
  };

  const handleStatusChange = async () => {
    changeVolunteerStatus(
      userToStatusChage,
      "volunteers_group-TEST",
      userStatus
    );
    setStatus(false);
    props.setReloadPage(props.reloadPage + 1);
  };

  const handleCancel = () => {
    setDelete(false);
    setStatus(false);
  };

  const handleModifyGroup = async (username) => {
    await fetchUser("volunteers_group-TEST", username).then((data) => {
      let groupInfo;
      // eslint-disable-line
      groupInfo = data;

      groupInfo.volunteerTable = "volunteers_group-TEST";
      groupInfo.userLoggedIn = false; ///////MAY NEED TO SET THS TO FALSE
      // console.log("groupInfo");
      // console.log(groupInfo);
      setModifyingGroup(groupInfo);
      // setCurrentUser(groupInfo);
    });
    setShowModify(true);
  };

  const handleLogHours = async (username) => {
    setShowLogging(true);
    setLoggingUser({ username: username });
    console.log(`logging for ${username}`);
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Group Name",
        accessor: "groupName", // accessor is the "key" in the data
      },
      {
        Header: "Email",
        accessor: "emailContact", // Email
      },
      {
        Header: "Volunteer or Admin",
        accessor: "is_Admin",
        Cell: (row) => {
          if (row.row.original.is_Admin === "True") {
            return (
              <div>
                <p>Administration</p>
              </div>
            );
          }
          return (
            <div>
              <p>Volunteer</p>
            </div>
          );
        },
      },
      {
        Header: "Change Status",
        accessor: "status",
        Cell: (row) => {
          if (row.row.original.is_Admin === "True") {
            return (
              <div>
                <button
                  onClick={() =>
                    handleClickOpenStatus(row.row.original.username, "False")
                  }
                >
                  Revoke Admin Privledges 🔽
                </button>
              </div>
            );
          }
          return (
            <div>
              <div>
                <button
                  onClick={() =>
                    handleClickOpenStatus(row.row.original.username, "True")
                  }
                >
                  Invoke Admin Privileges 🔼
                </button>
              </div>
            </div>
          );
        },
      },
      {
        Header: "Modify Info",
        accessor: "Modify",
        Cell: (row) => (
          <div>
            <div>
              <button
                onClick={async () =>
                  handleModifyGroup(row.row.original.username)
                }
              >
                Modify Group Info
              </button>
            </div>
          </div>
        ),
      },
      {
        Header: "Log Hours",
        accessor: "LogHours",
        Cell: (row) => (
          <div>
            <div>
              <button
                onClick={async () => handleLogHours(row.row.original.username)}
              >
                Log Hours For Group
              </button>
            </div>
          </div>
        ),
      },
      {
        Header: "Delete Volunteer",
        accessor: "Delete",
        Cell: (row) => (
          <div>
            <IconButton
              style={{ color: "#cee4bb" }}
              onClick={() => handleClickOpenDelete(row.row.original.username)}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      initialState: {
        sortBy: [
          {
            id: "Name",
          },
        ],
      },
    },
    useSortBy,
    usePagination
  );

  return (
    <div className="container">
      <Flex p={0} w="100%" className="vol-table">
        <Box>
          <table
            {...getTableProps()}
            style={{
              boxShadow: "0 0 20px rgba(0,0,0,0.8)",
              background: "#CCDDBD",
              borderSpacing: "0 1em",
            }}
          >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      style={{
                        borderRight: "none",
                        background: "#576754",
                        color: "white",
                        cursor: "pointer",
                      }}
                    >
                      {column.render("Header")}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? " 🔽"
                            : " 🔼"
                          : ""}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                // eslint-disable-line
                if (row.values.Email === "") return;
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td
                        {...cell.getCellProps()}
                        style={{
                          background: "#e6f2d9",
                        }}
                      >
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <br />
          <div className="pagination">
            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
              {"<<"}
            </button>{" "}
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
              {"<"}
            </button>{" "}
            <button onClick={() => nextPage()} disabled={!canNextPage}>
              {">"}
            </button>{" "}
            <button
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              {">>"}
            </button>{" "}
            <span>
              Page{" "}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{" "}
            </span>
            <span> | </span>
            <span>
              Go to page:{" "}
              <input
                type="number"
                defaultValue={pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0; // eslint-disable-line
                  gotoPage(page);
                }}
                style={{ paddingLeft: "10px", width: "40px" }}
              />
            </span>{" "}
            <span
              value={15}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
            />
          </div>
          <Dialog
            open={openDelete}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              Are you sure you want to delete this volunteer?
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
                Delete Volunteer
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={openStatus}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              Are you sure you want to change the status of this user?
            </DialogTitle>
            <DialogContent />
            <DialogActions>
              <DialogActions>
                <Button onClick={handleCancel} color="#CCDDBD">
                  Cancel
                </Button>
                <Button onClick={handleStatusChange} color="#CCDDBD" autoFocus>
                  Change User Status
                </Button>
              </DialogActions>
            </DialogActions>
          </Dialog>
          <Dialog
            open={showModify}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth={1400}
          >
            <DialogTitle id="alert-dialog-title">
              Modify group: {modifyingGroup.username}
            </DialogTitle>
            <DialogContent />
            <DialogActions>
              <UpdateInfoForm
                userMod={modifyingGroup}
                showFunc={setShowModify}
              ></UpdateInfoForm>
              {/* <DialogActions>
                <Button onClick={handleModifyCancel} color="#CCDDBD">
                  Cancel
                </Button>
                <Button onClick={handleModifyCancel} color="#CCDDBD" autoFocus>
                  Change User Status
                </Button>
              </DialogActions> */}
            </DialogActions>
          </Dialog>
          <Dialog
            open={showLogging}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth={1400}
          >
            <DialogTitle id="alert-dialog-title">
              Log hours for: {loggingUser.username}
            </DialogTitle>
            <DialogContent>
              <LogUserHoursForm
                loggingUserName={loggingUser.username}
                setShowLog={setShowLogging}
              />
            </DialogContent>
            <DialogActions></DialogActions>
          </Dialog>
        </Box>
      </Flex>
    </div>
  );
}

export default VolunteerTable;

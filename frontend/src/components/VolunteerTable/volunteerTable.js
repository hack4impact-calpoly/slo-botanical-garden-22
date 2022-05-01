import React, { useState, useEffect, useContext } from "react";
import { useSortBy, useTable, usePagination } from "react-table";
import "./volunteerTable.css";
import bgimage from "../../assets/garden.png";
import { Flex, Box } from "@chakra-ui/react";
import { CSVLink } from "react-csv";
import {
  fetchData,
  deleteVolunteer,
  changeVolunteerStatus,
} from "../../dynoFuncs";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DeleteIcon from "@material-ui/icons/Delete";
import { IconButton } from "@material-ui/core";
import { GlobalContext } from "../../GlobalState";

const VolunteerTable = () => {
  const [data, setData] = useState();
  const [reloadPage, setReloadPage] = useState(0);
  const { currentUserInfo } = useContext(GlobalContext);

  useEffect(() => {
    fetchData("volunteers_group").then((result) => setData(result));
  }, [reloadPage]);

  if (data && currentUserInfo.is_Admin !== "True") {
    console.log(data);
    return (
      <Table
        data={data}
        reloadPage={reloadPage}
        setReloadPage={setReloadPage}
      />
    );
  }
  return <h2>You Do Not Have the Permissions to View This Page</h2>;
};

const Table = (props) => {
  const { data } = props;
  console.log(data);
  const [openDelete, setDelete] = React.useState(false);
  const [userToDelete, setUserToDelete] = React.useState();
  const [openStatus, setStatus] = React.useState(false);
  const [userToStatusChage, setUserToStatusChage] = React.useState();
  const [userStatus, setUserStatus] = React.useState("False");

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
    console.log("IN handle delete");
    console.log("UserDel: " + userToDelete);
    deleteVolunteer(userToDelete, "volunteers_group");
    setDelete(false);
    props.setReloadPage(props.reloadPage + 1);
  };

  const handleStatusChange = async () => {
    changeVolunteerStatus(userToStatusChage, "volunteers_group", userStatus);
    setStatus(false);
    props.setReloadPage(props.reloadPage + 1);
  };

  const handleCancel = () => {
    setDelete(false);
    setStatus(false);
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "nameContact", // accessor is the "key" in the data
        // Cell: (row) => {
        //   return (
        //     <div>
        //       <span>
        //         {row.row.original["First Name"] +
        //           " " +
        //           row.row.original["Last Name"]}
        //       </span>
        //     </div>
        //   );
        // },
      },
      {
        Header: "Email",
        accessor: "emailContact", //Email
        Cell: (row) => {
          return (
            <div>
              <span>{"Email"}</span>
            </div>
          );
        },
      },
      {
        Header: "Role",
        accessor: "is_Admin",
        Cell: (row) => {
          if (row.row.original["is_Admin"] === "True") {
            return (
              <div>
                <p>Administration</p>
              </div>
            );
          } else {
            return (
              <div>
                <p>Volunteer</p>
              </div>
            );
          }
        },
      },
      {
        Header: "Change Status",
        accessor: "status",
        Cell: (row) => {
          if (row.row.original["is_Admin"] === "True") {
            return (
              <div>
                <button
                  onClick={() =>
                    handleClickOpenStatus(row.row.original["username"], "False")
                  }
                >
                  Revoke Admin Privledges 🔽
                </button>
              </div>
            );
          } else {
            return (
              <div>
                <div>
                  <button
                    onClick={() =>
                      handleClickOpenStatus(
                        row.row.original["username"],
                        "True"
                      )
                    }
                  >
                    Invoke Admin Priveldeges 🔼
                  </button>
                </div>
              </div>
            );
          }
        },
      },
      {
        Header: "Delete Volunteer",
        accessor: "Delete",
        Cell: (row) => {
          return (
            <div>
              <IconButton
                style={{ color: "#cee4bb" }}
                onClick={() =>
                  handleClickOpenDelete(row.row.original["username"])
                }
              >
                <DeleteIcon />
              </IconButton>
            </div>
          );
        },
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
      <Flex
        p={10}
        w="100%"
        bgImage={bgimage}
        bgPosition="center"
        bgSize="cover"
        bgRepeat="no-repeat"
        className="vol-table"
      >
        <CSVLink data={data} filename="volunteer_data" className="export">
          Export Data
        </CSVLink>
        ;
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
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td
                          {...cell.getCellProps()}
                          style={{
                            background: "#e6f2d9",
                          }}
                        >
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
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
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
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
              {"Are you sure you want to delete this volunteer?"}
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
              {"Are you sure you want to change the status of this user?"}
            </DialogTitle>
            <DialogContent></DialogContent>
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
        </Box>
      </Flex>
    </div>
  );
};

export default VolunteerTable;

import React, { useState, useEffect } from "react";
import { useSortBy, useTable, usePagination } from "react-table";
import "./volunteerTable.css";
import bgimage from "../../assets/garden.png";
import { Flex, Box } from "@chakra-ui/react";
import { CSVLink } from "react-csv";
import { fetchData, deleteVolunteer } from "../../dynoFuncs";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DeleteIcon from "@material-ui/icons/Delete";
import { IconButton } from "@material-ui/core";

const VolunteerTable = () => {
  const [data, setData] = useState();

  useEffect(() => {
    fetchData("volunteers_individual").then((result) => setData(result));
  }, []);

  if (data) {
    console.log(data);
    return <Table data={data} />;
  }
  return null;
};

const Table = (props) => {
  const { data } = props;
  console.log(data);
  const [openState, setOpen] = React.useState(false);
  const [userToDelete, setUserToDelete] = React.useState();

  const handleClickOpen = (username) => {
    console.log("In click open");
    //setOpen(true);
    //setUserToDelete(username);
  };

  const handleDelete = async () => {
    console.log("IN handle delete");
    console.log(typeof userToDelete);
    console.log(userToDelete);
    deleteVolunteer("volunteers_individual", userToDelete);
    alert(
      "Announcement Successfully Deleted. \nPlease refresh page to see change."
    );
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "Name", // accessor is the "key" in the data
        Cell: (row) => {
          return (
            <div>
              <span>
                {row.row.original["First Name"] +
                  " " +
                  row.row.original["Last Name"]}
              </span>
            </div>
          );
        },
      },
      {
        Header: "Email",
        accessor: "Email",
      },
      {
        Header: "Delete Volunteer",
        accessor: "Delete",
        Cell: (row) => {
          return (
            <div>
              <IconButton style={{ color: "#cee4bb" }}>
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
      {console.log(openState)}
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
                  <tr {...row.getRowProps()} onClick={handleClickOpen()}>
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
            open={openState}
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
                Delete Announcement
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Flex>
    </div>
  );
};

export default VolunteerTable;

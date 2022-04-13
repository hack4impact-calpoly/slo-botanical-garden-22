import React, { useState, useEffect } from "react";
import { useSortBy, useTable, usePagination } from "react-table";
import "./volunteerTable.css";
import bgimage from "../../assets/garden.png";
import { Flex, Box } from "@chakra-ui/react";
import { CSVLink } from "react-csv";
import { fetchData } from "../../dynoFuncs";

const Table = (props) => {
  const { users } = props;

  console.log("USERS IN TABLE");
  console.log(users);

  const data = React.useMemo(
    () => [
      {
        firstName: "some",
        lastName: "pon",
        contact: "name@mail.com",
      },
      {
        firstName: "other",
        lastName: "ffon",
        contact: "other@mail.com",
      },
      {
        firstName: "pi",
        lastName: "aa",
        contact: "sss@mail.com",
      },
      {
        firstName: "some",
        lastName: "pon",
        contact: "name@mail.com",
      },
      {
        firstName: "other",
        lastName: "ffon",
        contact: "other@mail.com",
        sietj: "sfsdf",
      },
      {
        firstName: "pi",
        lastName: "aa",
        contact: "sss@mail.com",
      },
      {
        firstName: "some",
        lastName: "pon",
        contact: "name@mail.com",
      },
      {
        firstName: "other",
        lastName: "ffon",
        contact: "other@mail.com",
      },
      {
        firstName: "pi",
        lastName: "aa",
        contact: "sss@mail.com",
      },
      {
        firstName: "some",
        lastName: "pon",
        contact: "name@mail.com",
      },
      {
        firstName: "other",
        lastName: "ffon",
        contact: "other@mail.com",
      },
      {
        firstName: "pi",
        lastName: "aa",
        contact: "sss@mail.com",
      },
      {
        firstName: "some",
        lastName: "pon",
        contact: "name@mail.com",
      },
      {
        firstName: "other",
        lastName: "ffon",
        contact: "other@mail.com",
      },
      {
        firstName: "pi",
        lastName: "aa",
        contact: "sss@mail.com",
      },
      {
        firstName: "some",
        lastName: "pon",
        contact: "name@mail.com",
      },
      {
        firstName: "other",
        lastName: "ffon",
        contact: "other@mail.com",
      },
      {
        firstName: "pi",
        lastName: "aa",
        contact: "sss@mail.com",
      },
      {
        firstName: "some",
        lastName: "pon",
        contact: "name@mail.com",
      },
      {
        firstName: "other",
        lastName: "ffon",
        contact: "other@mail.com",
      },
      {
        firstName: "pi",
        lastName: "aa",
        contact: "sss@mail.com",
      },
      {
        firstName: "some",
        lastName: "pon",
        contact: "name@mail.com",
      },
      {
        firstName: "other",
        lastName: "ffon",
        contact: "other@mail.com",
      },
      {
        firstName: "pi",
        lastName: "aa",
        contact: "sss@mail.com",
      },
      {
        firstName: "some",
        lastName: "pon",
        contact: "name@mail.com",
      },
      {
        firstName: "other",
        lastName: "ffon",
        contact: "other@mail.com",
      },
      {
        firstName: "pi",
        lastName: "aa",
        contact: "sss@mail.com",
      },
      {
        firstName: "some",
        lastName: "pon",
        contact: "name@mail.com",
      },
      {
        firstName: "other",
        lastName: "ffon",
        contact: "other@mail.com",
      },
      {
        firstName: "pi",
        lastName: "aa",
        contact: "sss@mail.com",
      },
      {
        firstName: "some",
        lastName: "pon",
        contact: "name@mail.com",
      },
      {
        firstName: "other",
        lastName: "ffon",
        contact: "other@mail.com",
      },
      {
        firstName: "pi",
        lastName: "aa",
        contact: "sss@mail.com",
      },
      {
        firstName: "some",
        lastName: "pon",
        contact: "name@mail.com",
      },
      {
        firstName: "other",
        lastName: "ffon",
        contact: "other@mail.com",
      },
      {
        firstName: "pi",
        lastName: "aa",
        contact: "sss@mail.com",
      },
    ],
    []
  );

  const columns = [
    {
      Header: "First Name",
      accessor: "First Name", // accessor is the "key" in the data
      Cell: (row) => {
        //sus of "firstName" and "lastName"
        return (
          <div>
            <span>
              {row.row.original.firstName + " " + row.row.original.lastName}
            </span>
          </div>
        );
      },
    },
    {
      Header: "Email",
      accessor: "Email",
    },
  ];

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
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: {
        sortBy: [
          {
            id: "Last Name",
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
        </Box>
      </Flex>
    </div>
  );
};

const VolunteerTable = () => {
  const [users, setUsers] = useState();

  useEffect(() => {
    fetchData("volunteers_individual").then((data) => {
      setUsers(data);
    });
  }, []);
  if (users) return <Table users={users} />;
  return null;
};

export default VolunteerTable;

import React, { useEffect, useState } from "react";
import { useTable } from "react-table";
import { fetchData } from "../../dynoFuncs";
import "./volunteerTable.css";

const Table = (props) => {
  const { users } = props;

  // accessor is the "key" in the data
  const columns = [
    { Header: "Name", accessor: "First Name" },
    { Header: "Email", accessor: "Email" },
  ];

  const {
    getTableProps, getTableBodyProps, headerGroups, rows, prepareRow
  } = useTable({ columns, data: users });

  return (
    <table
      {...getTableProps()}
      style={{ boxShadow: "0 0 20px rgba(0,0,0,0.8)", background: "#CCDDBD" }}
    >
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                style={{
                  borderRight: "none",
                  background: "#576754",
                  color: "white",
                }}
              >
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
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
  );
}

const VolunteerTable = () => {
  const [users, setUsers] = useState();

  useEffect(() => {
    fetchData("volunteers_individual").then(data => setUsers(data));
  }, []);

  if (users) return <Table users={users} />;
  return null;
}

export default VolunteerTable;

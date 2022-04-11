import React, { useEffect, useState } from "react";
import { useTable } from "react-table";
import "./volunteerTable.css";
import { fetchData } from "../../dynoFuncs";

const fetchDataFormDynamoDb = async () => {
  console.log("IN FETCH DATA VOLUNTEERS");
  return await fetchData("volunteers_individual").then((data) => {
    return data.Items;
  });
};

function VolunteerTable() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchDataFormDynamoDb().then((result) => {
      setUsers(result);
    });
  }, []);

  const data = React.useMemo(() => users, []);

  const columns = React.useMemo(
    () => [
      {
        Header: "Last Name",
        accessor: "Last Name", // accessor is the "key" in the data
        getProps: () => {
          return {
            headerStyle: {
              color: "red",
            },
          };
        },
      },
      {
        Header: "Email",
        accessor: "Email",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div>
      {console.log(users)}
      {users && (
        <table
          {...getTableProps()}
          style={{
            boxShadow: "0 0 20px rgba(0,0,0,0.8)",
            background: "#CCDDBD",
          }}
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
            {console.log("ROW")}
            {console.log(rows)}
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
      )}
    </div>
  );
}

export default VolunteerTable;

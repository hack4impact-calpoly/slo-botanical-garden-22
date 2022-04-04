import React, { useState } from "react";
import { useSortBy, useTable } from "react-table";
import "./volunteerTable.css";
import bgimage from "../../assets/garden.png";
import { Flex, Table, Box } from "@chakra-ui/react";

const VolunteerTable = () => {
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
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "firstName", // accessor is the "key" in the data
        Cell: row => {
          return (
            <div>
              <span>{row.row.original.firstName + " " + row.row.original.lastName}</span>
            </div>
          )
        }
      },
      {
        Header: "Contact",
        accessor: "contact",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data, initialState: {
      sortBy: [
        {
          id: "firstName",
        }
      ]
    } }, useSortBy);

  return (
    <div className="container">
    <Flex
      p={10}
      w="100%"
      bgImage={bgimage}
      bgPosition="center"
      bgSize="cover"
      bgRepeat="no-repeat"
    >
      <Box> 
        <table
          {...getTableProps()}
          style={{ boxShadow: "0 0 20px rgba(0,0,0,0.8)", background: "#CCDDBD", borderSpacing: "0 1em" }}
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
      </Box>
    </Flex>
    </div>
  );
};

export default VolunteerTable;

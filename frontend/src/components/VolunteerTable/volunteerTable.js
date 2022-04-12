import React, { useState, useEffect } from "react"
import { useSortBy, useTable, usePagination } from "react-table";
import "./volunteerTable.css";
import bgimage from "../../assets/garden.png";
import { Flex, Box } from "@chakra-ui/react";
import { CSVLink } from "react-csv";
import { fetchData } from "../../dynoFuncs";

const fetchDataFormDynamoDb = async () => {
  console.log("IN FETCH DATA VOLUNTEERS");
  return await fetchData("volunteers_individual").then((data) => {
    return data.Items;
  });
}

const VolunteerTable = () => {

  const [users, setUsers] = useState()

  useEffect(() => {
    fetchDataFormDynamoDb().then((result) => {
      console.log(result.httpResponse);
    });
    console.log("IN FETCH IN VOLUNTEER");
    console.log(users);
    console.log("PADDING");
  });

  const csvData = [
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
  ]

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
    state: { pageIndex, pageSize } } =
    useTable({ columns, data, initialState: {
      sortBy: [
        {
          id: "lastName",
        }
      ]
    } }, useSortBy, usePagination);

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
      <CSVLink data={csvData} filename="volunteer_data" className="export">Export Data</CSVLink>;
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
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    style={{
                      borderRight: "none",
                      background: "#576754",
                      color: "white",
                      cursor: "pointer"
                    }}
                  >
                    {column.render("Header")}
                    <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
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
            {'<<'}
          </button>{' '}
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {'<'}
          </button>{' '}
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            {'>'}
          </button>{' '}
          <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
            {'>>'}
          </button>{' '}
          <span>
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{' '}
          </span>
          <span> | </span>
          <span>
            Go to page:{' '}
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={e => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0
                gotoPage(page)
              }}
              style={{ paddingLeft: '10px', width: '40px' }}
            />
          </span>{' '}
          <span
            value={15}
            onChange={e => {
              setPageSize(Number(e.target.value))
            }}
          />
        </div>
      </Box>
    </Flex>
    </div>
  );
};

export default VolunteerTable;

import React from "react"
import { useSortBy, useTable, usePagination } from "react-table";
import "./volunteerTable.css";
import bgimage from "../../assets/garden.png";
import { Flex, Box } from "@chakra-ui/react";
import { CSVLink } from "react-csv";

const VolunteerTable = () => {

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
          <span>
            | Go to page:{' '}
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={e => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0
                gotoPage(page)
              }}
              style={{ width: '100px' }}
            />
          </span>{' '}
          <select
            value={pageSize}
            onChange={e => {
              setPageSize(Number(e.target.value))
            }}
          >
            {[10, 20, 30, 40, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </Box>
    </Flex>
    </div>
  );
};

export default VolunteerTable;

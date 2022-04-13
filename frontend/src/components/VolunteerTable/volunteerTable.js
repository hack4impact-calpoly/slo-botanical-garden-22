import React, { useEffect, useState, useMemo } from "react";
import { useSortBy, useTable, usePagination } from "react-table";
import { fetchData } from "../../dynoFuncs";
import { Flex, Box, Center } from "@chakra-ui/react";
import { CSVLink } from "react-csv";
import bgimage from "../../assets/garden.png";
import "./volunteerTable.css";

const Table = (props) => {
  const { users } = props;

  // accessor is the "key" in the data
  const columns = useMemo(
    () => [
    { Header: "Name", accessor: "First Name" },
    { Header: "Email", accessor: "Email" },
  ], []);

  console.log(users)

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
    state: { pageIndex } } =
    useTable({ columns, data: users, initialState: {
      sortBy: [
        {
          id: "lastName",
        }
      ],
      pageSize: 15,
      autoResetSortBy: false,
      autoResetPage: false
    }}, useSortBy, usePagination);

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
        <Center padding={5} flexDirection="column" fontSize="2xl">
          <Box bg="white" fontWeight={"bold"} className="export">
            Volunteer Data
            <br />
            <br />
            <label style={{ padding: "5px", marginLeft: "25%", backgroundColor: "green", borderRadius: "10px", color: "white" }}>Total: {users.length === 1 ? 0 : users.length }</label>          
          </Box>
          <br />
          <CSVLink data={users} filename="volunteer_data" className="export" style={{ color: "white", backgroundColor: "#355E3B", fontWeight: "bold" }}>Export Data</CSVLink>;
        </Center>
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
                        cursor: "pointer",
                        paddingRight: "5px",
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
          </div>
        </Box>
      </Flex>
    </div>
  );
}

const VolunteerTable = () => {
  const [users, setUsers] = useState([{}]);

  useEffect(() => {
    fetchData("volunteers_individual").then(data => setUsers(data));
  }, []);

  return <Table users={users} />
}

export default Table;

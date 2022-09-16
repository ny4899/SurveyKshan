import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTable, useGlobalFilter, useSortBy } from "react-table";

import { CSVLink } from "react-csv";
import MOCK_DATA from "../../common/Data/MOCK_DATA.json";
import { COLUMNS } from "../../common/Data/column";
import GlobalFilter from "../../common/GlobalFilter";
import { IndeterminateCheckbox } from "../../common/IndeterminateCheckbox";

import { faDownload, faRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Stations = () => {
  // const [apiData, setApiData] = useState({});

  useEffect(() => {
    try {
      fetch("https://natoursny.herokuapp.com/api/v1/tours/")
        .then((res) => {
          console.log(res);
          return res.json();
        })
        .then((json) => {
          console.log(JSON.parse(JSON.stringify(json.data.tours)));
          //  return setApiData(JSON.stringify(json.data.tours))
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  let navigate = useNavigate();

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);
  const [filteredData, setFilteredData] = useState(null);
  const filteredDataArr = [];

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
    allColumns,
    getToggleHideAllColumnsProps,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        hiddenColumns: ["id"],
      },
    },
    useGlobalFilter,
    useSortBy
  );

  useEffect(() => {
    rows.map((row) => {
      return filteredDataArr.push(row.original);
    });
    setFilteredData(filteredDataArr);
  }, [state]);

  const { globalFilter } = state;

  return (
    <div className="container-fluid px-3 py-4">
      <div className="row g-3">
        <div className="col-12">
          <div className="d-flex justify-content-between">
            <div>
              <p className="fs-5 m-0">Stations</p>
            </div>
            <div className="d-flex">
              <a
                onClick={() => navigate("/createNewStation", { replace: true })}
                className="btn btn-sm btn-primary"
              >
                Create New
              </a>
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="data__wrapper p-3 shadow-sm">
            <div className="row g-3 ">
              <div className="col-12">
                <div className="row g-0">
                  <div className="col-12 ">
                    <div className="d-flex justify-content-between ">
                      <div style={{ maxWidth: "350px" }}>
                        <div className=" m-0">
                          <GlobalFilter
                            filter={globalFilter}
                            setFilter={setGlobalFilter}
                          />
                        </div>
                      </div>
                      <div>
                        <button className="btn btn-sm me-2">
                          {" "}
                          <FontAwesomeIcon icon={faRotate} className="fs-5" />
                        </button>
                        <div className="btn-group">
                          <button
                            type="button"
                            className="btn btn-sm btn-secondary dropdown-toggle"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <FontAwesomeIcon icon={faDownload} />
                          </button>
                          <ul className="dropdown-menu dropdown-menu-end shadow">
                            <li>
                              <CSVLink
                                className="dropdown-item"
                                type="button"
                                data={filteredData || data}
                              >
                                CSV
                              </CSVLink>
                            </li>

                            <li>
                              <button className="dropdown-item" type="button">
                                MS-Excel
                              </button>
                            </li>
                            <li>
                              <button className="dropdown-item" type="button">
                                MS-Word
                              </button>
                            </li>
                            <li>
                              <button className="dropdown-item" type="button">
                                TXT
                              </button>
                            </li>
                            <li>
                              <button className="dropdown-item" type="button">
                                JSON
                              </button>
                            </li>
                            <li>
                              <button className="dropdown-item" type="button">
                                XML
                              </button>
                            </li>
                            <li>
                              <button className="dropdown-item" type="button">
                                PDF
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="d-flex my-2 flex-wrap">
                      <div>
                        <IndeterminateCheckbox
                          {...getToggleHideAllColumnsProps()}
                          className="me-1"
                        />{" "}
                        <span className="me-4">Toggle All</span>
                      </div>
                      {allColumns.map((column) => (
                        <div key={column.id}>
                          <label>
                            <input
                              className="me-1"
                              type="checkbox"
                              {...column.getToggleHiddenProps()}
                            />
                            <span className="me-4">{column.id}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div>
                  <div className="table__container">
                    <table {...getTableProps()}>
                      <thead>
                        {headerGroups.map((headerGroup) => (
                          <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                              <th
                                {...column.getHeaderProps(
                                  column.getSortByToggleProps()
                                )}
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
                        {rows.map((row) => {
                          prepareRow(row);
                          return (
                            <tr {...row.getRowProps()}>
                              {row.cells.map((cell) => {
                                return (
                                  <td {...cell.getCellProps()}>
                                    {cell.render("Cell")}
                                  </td>
                                );
                              })}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stations;

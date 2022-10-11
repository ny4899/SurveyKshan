import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTable, useGlobalFilter, useSortBy } from "react-table";
import { COLUMNS } from "./column";
import GlobalFilter from "../../../common/GlobalFilter";
import { IndeterminateCheckbox } from "../../../common/IndeterminateCheckbox";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faRotate,
  faTrash,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Location = () => {
  const [apiData, setApiData] = useState([]);
  const [tableMessage, setTableMessage] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    setTableMessage("Loading...");
    (async () => {
      try {
        const result = await axios(
          "https://natoursny.herokuapp.com/api/v1/industries"
        );
        const data = result.data.data.industries;
        data.forEach((item) => {
          if (!item.location_name) item.location_name = "---";
          if (!item.address) item.address = "---";
          if (!item.city) item.city = "---";
          if (!item.state) item.state = "---";
          if (!item.pincode) item.pincode = "---";
          if (!item.latitude) item.latitude = "---";
          if (!item.longitude) item.longitude = "---";
          if (!item.industry_code) item.industry_code = "---";
          if (!item.ganga_basin) item.ganga_basin = "---";
        });
        if (data) {
          setTableMessage("");
          setApiData(data);
        }
      } catch (error) {
        setTableMessage(`Something went wrong: ${error.message}`);
      }
    })();
  }, []);

  const columns = useMemo(() => COLUMNS, []);

  const data = useMemo(() => apiData, [apiData]);
  // const filteredDataArr = [];

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
        hiddenColumns: ["_id"],
      },
    },
    useGlobalFilter,
    useSortBy
  );

  const { globalFilter } = state;

  return (
    <div className="container-fluid px-3 py-4">
      <div className="row g-3">
        <div className="col-12">
          <div className="d-flex justify-content-between">
            <div>
              <p className="fs-5 m-0">Location</p>
            </div>
            <div className="d-flex">
              <span
                onClick={() =>
                  navigate("/CreateNewLocation", { replace: true })
                }
                className="btn btn-sm btn-primary"
              >
                Add location
              </span>
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
                              {/* <CSVLink
                                className="dropdown-item"
                                type="button"
                                // data={filteredData || data}
                              >
                                CSV
                              </CSVLink> */}
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
                    {tableMessage ? (
                      tableMessage === "Loading..." ? (
                        <h5 className="text-center py-4">{tableMessage}</h5>
                      ) : (
                        <h6 className="text-center py-4 text-danger">
                          {tableMessage}
                        </h6>
                      )
                    ) : (
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
                                {row.cells.map((cell, i) => {
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
                    )}
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

export default Location;
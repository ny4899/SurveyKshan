import React, { useMemo } from "react";
import "./data.scss";
import { useTable, useGlobalFilter, useSortBy } from "react-table";
import MOCK_DATA from "../../../common/Data/MOCK_DATA.json";
import { COLUMNS } from "../../../common/Data/column";
import GlobalFilter from "../../../common/GlobalFilter";

import { IndeterminateCheckbox } from "../../../common/IndeterminateCheckbox";



const Data = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);
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
        hiddenColumns: ["Status"],
      },
    },
    useGlobalFilter,
    useSortBy
  );
  const { globalFilter } = state;
  return (
    <>
      <div className="my-2">
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      </div>

      <div>
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
      <div className="table__container">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
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
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Data;

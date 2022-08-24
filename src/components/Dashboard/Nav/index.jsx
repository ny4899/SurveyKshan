import React from "react";
import { NavLink, Outlet } from "react-router-dom";
const index = () => {
  return (
    <>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <NavLink
            className={({ isActive }) =>
              isActive ? "active nav-link" : "nav-link"
            }
            to="/"
          >
            Graph
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className={({ isActive }) =>
              isActive ? "active nav-link" : "nav-link"
            }
            to="/map"
          >
            Map
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className={({ isActive }) =>
              isActive ? "active nav-link" : "nav-link"
            }
            to="/data"
          >
            Data
          </NavLink>
        </li>
      </ul>
      <Outlet />
    </>
  );
};

export default index;

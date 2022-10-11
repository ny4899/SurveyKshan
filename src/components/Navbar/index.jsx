import React, { useRef, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./top-nav.scss";
import "./side-nav.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faEnvelope,
  faGear,
  faEllipsisVertical,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

import logo from "../../images/logo.png";

const Navbar = ({ toggleClass, setUser }) => {
  const [rightNavDisplay, setRightNavDisplay] = useState(false);
  const refnavcontainer = useRef(null);

  const toggleNavClass = () => {
    const element = refnavcontainer.current;
    const withHideNav = "sidebar__wrapper hide__nav";
    const withOutHideNav = "sidebar__wrapper";

    if (element.className === withHideNav) {
      element.className = withOutHideNav;
    } else if (element.className === withOutHideNav) {
      element.className = withHideNav;
    }
  };

  const navHideShow = () => {
    toggleClass();
    toggleNavClass();
  };

  const navHideOnSm = () => {
    if (window.innerWidth <= 992) {
      navHideShow();
    }
  };

  const logout = () => {
    setUser("");
    localStorage.removeItem("user");
  };

  return (
    <>
      <div className="nav__wrapper">
        <div className="nav__inner__wrapper px-3">
          <div className="nav__left">
            <FontAwesomeIcon
              onClick={navHideShow}
              icon={faBars}
              className="hum__icon"
            />
            <NavLink to="/">
              <img className="main__logo" src={logo} alt="" />
            </NavLink>
          </div>
          <div
            className={
              rightNavDisplay ? "nav__right " : "nav__right nav__right__toggle"
            }
          >
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-sm dropdown-toggle"
                data-bs-toggle="dropdown"
                data-bs-display="static"
                aria-expanded="false"
              >
                Admin
              </button>
              <ul className="dropdown-menu dropdown-menu-lg-end shadow">
                <li>
                  <NavLink to="/assignedStations" className="dropdown-item">
                    View Assigned Stations
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/requestedAssets" className="dropdown-item">
                    Requested Assets
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/editProfile" className="dropdown-item">
                    Edit Your Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/changePassword" className="dropdown-item">
                    Change Password
                  </NavLink>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a onClick={logout} className="dropdown-item">
                    Logout
                  </a>
                </li>
              </ul>
            </div>
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-sm dropdown-toggle"
                data-bs-toggle="dropdown"
                data-bs-display="static"
                aria-expanded="false"
              >
                create New
              </button>
              <ul className="dropdown-menu dropdown-menu-lg-end shadow">
                <li>
                  <NavLink to="/createNewStation" className="dropdown-item">
                    Station
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/createNewIndustry" className="dropdown-item">
                    Industry
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/createNewLicense" className="dropdown-item">
                    License
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/createNewParameter" className="dropdown-item">
                    Parameter
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/createNewUser" className="dropdown-item">
                    User
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-sm dropdown-toggle mail__icon__btn me-2"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <a>
                  <FontAwesomeIcon icon={faEnvelope} className="fs-5" />
                </a>
              </button>
              <ul className="dropdown-menu dropdown-menu-end shadow py-2 mail__dropdown__conatiner">
                <div className="px-3 d-flex align-items-center justify-content-between mb-2">
                  <h6 className="m-0">Mails ( 25 )</h6>
                  <button type="button" className="btn  btn-sm text-primary">
                    View All
                  </button>
                </div>
                <div className="list-group">
                  <a
                    className="list-group-item list-group-item-action bg-light"
                    aria-current="true"
                  >
                    <div className="d-flex w-100 justify-content-between flex-column flex-sm-row">
                      <p className="m-0">Precise Seamless Apparels Pvt Ltd</p>
                      <p className="m-0">3 days ago</p>
                    </div>
                    <small className="m-0">
                      Exce. Parametres: ( COD, BOD )
                    </small>
                  </a>
                  <a
                    className="list-group-item list-group-item-action bg-light"
                    aria-current="true"
                  >
                    <div className="d-flex w-100 justify-content-between flex-column flex-sm-row">
                      <p className="m-0">Precise Seamless Apparels Pvt Ltd</p>
                      <p className="m-0">3 days ago</p>
                    </div>
                    <small className="m-0">
                      Exce. Parametres: ( COD, BOD )
                    </small>
                  </a>
                  <a
                    className="list-group-item list-group-item-action bg-light"
                    aria-current="true"
                  >
                    <div className="d-flex w-100 justify-content-between flex-column flex-sm-row">
                      <p className="m-0">Precise Seamless Apparels Pvt Ltd</p>
                      <p className="m-0">3 days ago</p>
                    </div>
                    <small className="m-0">
                      Exce. Parametres: ( COD, BOD )
                    </small>
                  </a>
                  <a
                    className="list-group-item list-group-item-action bg-light"
                    aria-current="true"
                  >
                    <div className="d-flex w-100 justify-content-between flex-column flex-sm-row">
                      <p className="m-0">Precise Seamless Apparels Pvt Ltd</p>
                      <p className="m-0">3 days ago</p>
                    </div>
                    <small className="m-0">
                      Exce. Parametres: ( COD, BOD )
                    </small>
                  </a>
                  <a
                    className="list-group-item list-group-item-action bg-light"
                    aria-current="true"
                  >
                    <div className="d-flex w-100 justify-content-between flex-column flex-sm-row">
                      <p className="m-0">Precise Seamless Apparels Pvt Ltd</p>
                      <p className="m-0">3 days ago</p>
                    </div>
                    <small className="m-0">
                      Exce. Parametres: ( COD, BOD )
                    </small>
                  </a>
                  <a
                    className="list-group-item list-group-item-action bg-light"
                    aria-current="true"
                  >
                    <div className="d-flex w-100 justify-content-between flex-column flex-sm-row">
                      <p className="m-0">Precise Seamless Apparels Pvt Ltd</p>
                      <p className="m-0">3 days ago</p>
                    </div>
                    <small className="m-0">
                      Exce. Parametres: ( COD, BOD )
                    </small>
                  </a>
                </div>
              </ul>
            </div>
            <a>
              <FontAwesomeIcon icon={faGear} className="fs-5" />
            </a>
            <div className="ms-3 cross__icon__box">
              <FontAwesomeIcon
                icon={faCircleXmark}
                onClick={() => {
                  setRightNavDisplay(false);
                }}
                className="fs-2"
              />
            </div>
          </div>
          <div className="dot__container">
            <FontAwesomeIcon
              onClick={() => {
                setRightNavDisplay(true);
              }}
              icon={faEllipsisVertical}
              className="fs-5"
            />
          </div>
        </div>
      </div>
      <div ref={refnavcontainer} className="sidebar__wrapper">
        <div className="sidebar__inner__wrapper">
          <div className="accordion" id="accordionExample">
            <div className="accordion-item">
              <h2 className="accordion-header">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "active accordion-button px-3"
                      : "accordion-button px-3"
                  }
                  onClick={navHideOnSm}
                >
                  Dashboard
                </NavLink>
              </h2>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <NavLink
                  to="/stations"
                  className={({ isActive }) =>
                    isActive
                      ? "active accordion-button px-3"
                      : "accordion-button px-3"
                  }
                  onClick={navHideOnSm}
                >
                  Stations
                </NavLink>
              </h2>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <NavLink
                  to="/licenses"
                  className={({ isActive }) =>
                    isActive
                      ? "active accordion-button px-3"
                      : "accordion-button px-3"
                  }
                  onClick={navHideOnSm}
                >
                  Licenses
                </NavLink>
              </h2>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <NavLink
                  to="/parameters"
                  className={({ isActive }) =>
                    isActive
                      ? "active accordion-button px-3"
                      : "accordion-button px-3"
                  }
                  onClick={navHideOnSm}
                >
                  Parameters
                </NavLink>
              </h2>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <NavLink
                  to="/maintenance"
                  className={({ isActive }) =>
                    isActive
                      ? "active accordion-button px-3"
                      : "accordion-button px-3"
                  }
                  onClick={navHideOnSm}
                >
                  Maintenance
                </NavLink>
              </h2>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <NavLink
                  to="/calibration"
                  className={({ isActive }) =>
                    isActive
                      ? "active accordion-button px-3"
                      : "accordion-button px-3"
                  }
                  onClick={navHideOnSm}
                >
                  Calibration
                </NavLink>
              </h2>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button collapsed px-3"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="false"
                  aria-controls="collapseOne"
                >
                  <h2 className="fs-6 m-0">Configure</h2>
                </button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body p-0">
                  <NavLink
                    to="/industry"
                    className={({ isActive }) =>
                      isActive
                        ? "active accordion-button px-3"
                        : "accordion-button px-3"
                    }
                    onClick={navHideOnSm}
                  >
                    Industry
                  </NavLink>
                  <NavLink
                    to="/location"
                    className={({ isActive }) =>
                      isActive
                        ? "active accordion-button px-3"
                        : "accordion-button px-3"
                    }
                    onClick={navHideOnSm}
                  >
                    Location
                  </NavLink>
                  <NavLink
                    to="/devices"
                    className={({ isActive }) =>
                      isActive
                        ? "active accordion-button px-3"
                        : "accordion-button px-3"
                    }
                    onClick={navHideOnSm}
                  >
                    Device
                  </NavLink>
                  <NavLink
                    to="/datasettings"
                    className={({ isActive }) =>
                      isActive
                        ? "active accordion-button px-3"
                        : "accordion-button px-3"
                    }
                    onClick={navHideOnSm}
                  >
                    Data Settings
                  </NavLink>
                  <NavLink
                    to="/people"
                    className={({ isActive }) =>
                      isActive
                        ? "active accordion-button px-3"
                        : "accordion-button px-3"
                    }
                    onClick={navHideOnSm}
                  >
                    People
                  </NavLink>
                  <NavLink
                    to="/cameraconfig"
                    className={({ isActive }) =>
                      isActive
                        ? "active accordion-button px-3"
                        : "accordion-button px-3"
                    }
                    onClick={navHideOnSm}
                  >
                    Camera
                  </NavLink>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingTwo">
                <button
                  className="accordion-button collapsed px-3"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  <h2 className="fs-6 m-0">Reports</h2>
                </button>
              </h2>
              <div
                id="collapseTwo"
                className="accordion-collapse collapse"
                aria-labelledby="headingTwo"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body p-0">
                  <NavLink
                    to="/cpcblog"
                    className={({ isActive }) =>
                      isActive
                        ? "active accordion-button px-3"
                        : "accordion-button px-3"
                    }
                    onClick={navHideOnSm}
                  >
                    CPCB log
                  </NavLink>
                  <NavLink
                    to="/hrpcblog"
                    className={({ isActive }) =>
                      isActive
                        ? "active accordion-button px-3"
                        : "accordion-button px-3"
                    }
                    onClick={navHideOnSm}
                  >
                    HRPCB log
                  </NavLink>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingThree">
                <button
                  className="accordion-button collapsed px-3"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  <h2 className="fs-6 m-0">Settings</h2>
                </button>
              </h2>
              <div
                id="collapseThree"
                className="accordion-collapse collapse"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body p-0">
                  <NavLink
                    to="/audit"
                    className={({ isActive }) =>
                      isActive
                        ? "active accordion-button px-3"
                        : "accordion-button px-3"
                    }
                    onClick={navHideOnSm}
                  >
                    Audit
                  </NavLink>
                  <NavLink
                    to="/cameraconfig"
                    className={({ isActive }) =>
                      isActive
                        ? "active accordion-button px-3"
                        : "accordion-button px-3"
                    }
                    onClick={navHideOnSm}
                  >
                    Camera Config
                  </NavLink>
                  <NavLink
                    to="/datasettings"
                    className={({ isActive }) =>
                      isActive
                        ? "active accordion-button px-3"
                        : "accordion-button px-3"
                    }
                    onClick={navHideOnSm}
                  >
                    Data Settings
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navbar;

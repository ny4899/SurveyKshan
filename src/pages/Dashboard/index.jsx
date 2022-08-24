import React from "react";
import Filter from "../../components/Dashboard/Filter";
import Nav from "../../components/Dashboard/Nav";
import InfoContainer from "../../components/Dashboard/InfoContainer";
import LoggerDataBox from "../../components/Dashboard/LoggerDataBox";
const Dashboard = () => {
  return (
    <div className="container-fluid px-3 py-4">
      <div className="row g-3">
        <p className="fs-5 m-0">Dashboard</p>
        <div className="col-12">
          <div className="row g-3">
            <Filter />
          </div>
        </div>
        <div className="col-12">
          <div className="row g-3">
            <InfoContainer />
            <InfoContainer />
            <InfoContainer />
          </div>
        </div>
        {/* <div className="col-12">
          <div className="row g-3">
            <div className="col-sm-8">
              <div className="row g-3">
                <LoggerDataBox />
                <LoggerDataBox />
                <LoggerDataBox />
                <LoggerDataBox />
                <LoggerDataBox />
                <LoggerDataBox />
                <LoggerDataBox />
                <LoggerDataBox />
              </div>
            </div>
            <div className="col-sm-4">
              <div>
                <iframe
                  width="100%"
                  height="230"
                  src="https://rtsp.me/embed/ZrfZESTY/"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div> */}
        <div className="col-12">
          <div className="p-2 p-sm-3  bg-white shadow-sm">
            <Nav />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

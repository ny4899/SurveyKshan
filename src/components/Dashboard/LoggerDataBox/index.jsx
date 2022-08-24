import React from "react";
import "./LoggerDataBox.scss";

const LoggerDataBox = () => {
  return (
    <div className="col-6 col-lg-3">
      <div className="box__bg rounded-3 pb-1 shadow-sm">
        <div className="value__bar__bg py-2 mb-3">
          <h3>7.00</h3>
          <p>ph</p>
        </div>
        <div className="px-1">
          <p>CETP_1_Outlet</p>
          <p>
            Std Val : <span>6.00 - 9.00</span>
          </p>
          <p>
            Last recvd : <span>09-08-22 14:36</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoggerDataBox;

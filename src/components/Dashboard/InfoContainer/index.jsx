import React from "react";
import "./InfoContainer.scss";
const index = () => {
  return (
    <div className="col-sm-4">
      <div className=" rounded-2 p-3 infocontainer">
        <h5>
          Industries : <span>283</span>
        </h5>
        <p>
          Configured On: <span>283</span>
        </p>
        <p>
          Last 7 Days : <span>1</span>
        </p>
        <button className="btn btn-sm btn-primary">More info</button>
      </div>
    </div>
  );
};

export default index;

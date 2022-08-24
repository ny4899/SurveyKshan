import React from "react";

const Filter = () => {
  return (
    <>
      <div className="col-sm-4">
        <select
          className="form-select shadow-sm"
          aria-label="Default select example"
        >
          <option value="none">Select State</option>
          <option value="haryana">haryana</option>
          <option value="Uttarpradesh">Uttarpradesh</option>
          <option value="Bihar">Bihar</option>
        </select>
      </div>
      <div className="col-sm-4">
        <select
          className="form-select shadow-sm"
          aria-label="Default select example"
        >
          <option value="none">Select Category</option>
          <option value="1">Dust Monitoring System(003)</option>
          <option value="2">Dust Monitoring System(003)</option>
        </select>
      </div>
      <div className="col-sm-4">
        <select
          className="form-select shadow-sm"
          aria-label="Default select example"
        >
          <option value="none">Select Industry</option>
          <option value="1">Sandhar Automotive Pvt Ltd</option>
          <option value="2">Automotive Pvt Ltd</option>
          <option value="3">Sandhar Automotive Pvt Ltd</option>
        </select>
      </div>
    </>
  );
};

export default Filter;

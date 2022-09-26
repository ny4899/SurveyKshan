import axios from "axios";
import React, { useRef, useState, useEffect } from "react";

const CreateNewLocation = () => {
  const [industryNames, setIndustryNames] = useState("");
  const [selectedIndustryId, setSelectedIndustryId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const refSelectedIndustry = useRef("");

  const refLocationName = useRef(null);
  const refAddress = useRef(null);
  const refCity = useRef(null);
  const refState = useRef(null);
  const refPincode = useRef(null);
  const refLatitude = useRef(null);
  const refLongitude = useRef(null);
  const refIndustrycode = useRef(null);
  const refGangaBasin = useRef(null);

  useEffect(() => {
    const timeId = setTimeout(() => {
      if (message || error) {
        setMessage("");
        setError("");
      }
    }, 3000);
    return () => {
      clearTimeout(timeId);
    };
  }, [message, error]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios(
          "https://natoursny.herokuapp.com/api/v1/industry_names"
        );
        setIndustryNames(res.data.data.industry_names);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchData();
  }, []);

  const handleSelectedIndustry = (e) => {
    e.preventDefault();
    setSelectedIndustryId(refSelectedIndustry.current.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataObj = {
        location_name: refLocationName.current.value,
        address: refAddress.current.value,
        city: refCity.current.value,
        state: refState.current.value,
        pincode: refPincode.current.value,
        latitude: refLatitude.current.value,
        longitude: refLongitude.current.value,
        industry_code: refIndustrycode.current.value,
        ganga_basin: refGangaBasin.current.value,
      };
      const res = await axios.patch(
        `https://natoursny.herokuapp.com/api/v1/industries/${selectedIndustryId}`,
        dataObj
      );
      if (res.status === 204) {
        setMessage("Location added successfully!");
      }
    } catch (error) {
      setError(`Something went wrong! ${error.message}`);
    }
  };

  return (
    <>
      <div className="container-fluid px-3 py-4">
        <div className="row g-3">
          <div className="col-12">
            <div className="data__wrapper p-1 p-sm-3 shadow-sm">
              <div
                className="mx-auto"
                style={{
                  width: "100%",
                  overflowX: "scroll",
                }}
              >
                <form>
                  <fieldset>
                    <legend style={{ backgroundColor: "lavender" }}>
                      Select industry
                    </legend>
                    <div className="row g-3">
                      {/* ================*/}
                      <div className="col-9 col-sm-10 col-xl-11">
                        <select
                          defaultValue={"DEFAULT_Industry"}
                          className="form-select mb-3"
                          ref={refSelectedIndustry}
                          onChange={handleSelectedIndustry}
                        >
                          <option disabled value="DEFAULT_Industry">
                            Select industry
                          </option>
                          {industryNames ? (
                            industryNames.map((name) => {
                              return (
                                <option key={name._id} value={name._id}>
                                  {name.industry_name}
                                </option>
                              );
                            })
                          ) : (
                            <option disabled value="loading">
                              Loading...
                            </option>
                          )}
                        </select>
                      </div>
                      {/* ================*/}
                    </div>
                  </fieldset>
                </form>
                {selectedIndustryId ? (
                  <form onSubmit={handleSubmit} className="mt-4">
                    <fieldset>
                      <legend style={{ backgroundColor: "lavender" }}>
                        Add Location
                      </legend>
                      <div className="row g-3">
                        <div className="col-9 col-sm-10 col-xl-11">
                          <input
                            ref={refLocationName}
                            required
                            type="text"
                            className="form-control"
                            placeholder="Location name *"
                          ></input>
                        </div>
                        <div className="col-9 col-sm-10 col-xl-11">
                          <input
                            ref={refAddress}
                            type="text"
                            className="form-control"
                            placeholder="Address"
                          ></input>
                        </div>
                        <div className="col-9 col-sm-10 col-xl-11">
                          <input
                            ref={refCity}
                            type="text"
                            className="form-control"
                            placeholder="City"
                          ></input>
                        </div>
                        <div className="col-9 col-sm-10 col-xl-11">
                          <input
                            ref={refState}
                            type="text"
                            className="form-control"
                            placeholder="State"
                          ></input>
                        </div>
                        <div className="col-9 col-sm-10 col-xl-11">
                          <input
                            ref={refPincode}
                            type="number"
                            className="form-control"
                            placeholder="Pincode"
                          ></input>
                        </div>
                        <div className="col-9 col-sm-10 col-xl-11">
                          <input
                            ref={refLatitude}
                            type="number"
                            className="form-control"
                            placeholder="Latitude"
                            step=".01"
                          ></input>
                        </div>
                        <div className="col-9 col-sm-10 col-xl-11">
                          <input
                            ref={refLongitude}
                            type="number"
                            className="form-control"
                            placeholder="Longitude"
                            step=".01"
                          ></input>
                        </div>
                        <div className="col-9 col-sm-10 col-xl-11">
                          <input
                            ref={refIndustrycode}
                            type="text"
                            className="form-control"
                            placeholder="Industry code"
                          ></input>
                        </div>
                        <div className="col-9 col-sm-10 col-xl-11">
                          <input
                            ref={refGangaBasin}
                            type="text"
                            className="form-control"
                            placeholder="Ganga Basin"
                          ></input>
                        </div>
                        <div className="col-9 col-sm-10 col-xl-11">
                          <input
                            ref={refState}
                            type="text"
                            className="form-control"
                            placeholder="State"
                          ></input>
                        </div>
                        {/* ============================================= */}
                        {/* col-10  */}
                        {/* <div className="col-9 col-sm-10 col-xl-11">
                        <select
                          defaultValue={"DEFAULT_Industry"}
                          className="form-select"
                        >
                          <option disabled value="DEFAULT_Industry">
                            about
                          </option>
                          <option value="team leader">team leader</option>
                          <option value="owner">owner</option>
                          <option value="office boy">office boy</option>
                        </select> 
                      </div> */}

                        {/* col-10  */}

                        {message && (
                          <div className="col-9 col-sm-10 col-xl-11">
                            <div
                              className="alert alert-success px-2"
                              role="alert"
                            >
                              {message}
                            </div>
                          </div>
                        )}
                        {error && (
                          <div className="col-9 col-sm-10 col-xl-11">
                            <div className="alert alert-danger" role="alert">
                              {error}
                            </div>
                          </div>
                        )}
                        <div className="col-9 col-sm-10 col-xl-11">
                          <div className="d-flex justify-content-end py-2">
                            <button className="btn btn-secondary me-3">
                              Cancel
                            </button>
                            <button type="submit" className="btn btn-success">
                              Save
                            </button>
                          </div>
                        </div>
                      </div>
                    </fieldset>
                  </form>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* modal for model  */}
      <div
        className="modal fade"
        id="createModelContainer"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <form className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Create Model
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body bg-light">
              <div className="row gy-3">
                <div className="col-12">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Name *"
                    required
                  ></input>
                </div>
                <div className="col-12">
                  <select
                    defaultValue={"DEFAULT_manufacture"}
                    className="form-select form-select-sm"
                    required
                  >
                    <option disabled value="DEFAULT_manufacture">
                      Select a Manufacture *
                    </option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <div className="col-12">
                  <select
                    defaultValue={"DEFAULT_category"}
                    className="form-select form-select-sm"
                    required
                  >
                    <option disabled value="DEFAULT_category">
                      Select a Category *
                    </option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <div className="col-12">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Model No."
                  ></input>
                </div>
                <div className="col-12">
                  <select
                    defaultValue={"DEFAULT_fieldset"}
                    className="form-select form-select-sm"
                  >
                    <option disabled value="DEFAULT_fieldset">
                      Select a Fieldset
                    </option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" className="btn btn-primary btn-sm">
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* modal for create Status label  */}
      <div
        className="modal fade"
        id="createStatusContainer"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <form className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Create Status Label
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body bg-light">
              <div className="row gy-3">
                <div className="col-12">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Name *"
                    required
                  ></input>
                </div>
                <div className="col-12">
                  <select
                    defaultValue={"DEFAULT_statusType"}
                    className="form-select form-select-sm"
                    required
                  >
                    <option disabled value="DEFAULT_statusType">
                      Select Status Type *
                    </option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" className="btn btn-primary btn-sm">
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* modal for create Supplier  */}
      <div
        className="modal fade"
        id="createSupplierContainer"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <form className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Create Supplier
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body bg-light">
              <div className="row gy-3">
                <div className="col-12">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Name *"
                    required
                  ></input>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" className="btn btn-primary btn-sm">
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* modal for create Location  */}
      <div
        className="modal fade"
        id="createLocationContainer"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <form className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Create Location
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body bg-light">
              <div className="row gy-3">
                <div className="col-12">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Name *"
                    required
                  ></input>
                </div>
                <div className="col-12">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="City *"
                    required
                  ></input>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" className="btn btn-primary btn-sm">
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateNewLocation;

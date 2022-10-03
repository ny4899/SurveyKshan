import axios from "axios";
import React, { useRef, useState, useEffect } from "react";

const CreateNewLocation = () => {
  const [industryNames, setIndustryNames] = useState("");
  const [selectedIndustryId, setSelectedIndustryId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [formView, setformView] = useState("d-block");
  const [formMessage, setFormMessage] = useState("fetching data...");

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

  const getAllIndustries = async () => {
    try {
      const res = await axios(
        `https://natoursny.herokuapp.com/api/v1/industries/${selectedIndustryId}`
      );

      if (res.status === 200) {
        const {
          location_name,
          address,
          city,
          state,
          pincode,
          latitude,
          longitude,
          industry_code,
          ganga_basin,
        } = res.data.data.industry;

        refLocationName.current.value = location_name;
        refAddress.current.value = address;
        refCity.current.value = city;
        refState.current.value = state;
        refPincode.current.value = pincode;
        refLatitude.current.value = latitude;
        refLongitude.current.value = longitude;
        refIndustrycode.current.value = industry_code;
        refGangaBasin.current.value = ganga_basin;
      } else {
        setFormMessage(`Unable to fetch: try again!`);
      }
      setformView("d-block");
    } catch (error) {
      setFormMessage(`Something went wrong: ${error.message}`);
    }
  };

  useEffect(() => {
    if (selectedIndustryId) {
      getAllIndustries();
    }
  }, [selectedIndustryId]);

  const handleSelectedIndustry = (e) => {
    e.preventDefault();
    setformView("d-none");
    setSelectedIndustryId(refSelectedIndustry.current.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("processing!");
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
                          defaultValue={""}
                          className="form-select mb-3"
                          ref={refSelectedIndustry}
                          onChange={handleSelectedIndustry}
                        >
                          <option disabled value="">
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

                {formView === "d-none" ? (
                  <div className="py-3 py-sm-4">
                    {formMessage === "fetching data..." ? (
                      <h5 className="text-center">{formMessage}</h5>
                    ) : (
                      <h6 className="text-center text-danger">{formMessage}</h6>
                    )}
                  </div>
                ) : (
                  <></>
                )}

                {selectedIndustryId ? (
                  <form onSubmit={handleSubmit} className={`mt-3 ${formView}`}>
                    <fieldset>
                      <legend style={{ backgroundColor: "lavender" }}>
                        Add Location
                      </legend>
                      <div className="row gx-3 gy-2">
                        <div className="col-9 col-sm-10 col-xl-11">
                          <label
                            htmlFor="locationName"
                            className="col-form-label"
                          >
                            Location name :
                          </label>
                          <input
                            ref={refLocationName}
                            required
                            id="locationName"
                            type="text"
                            className="form-control"
                            placeholder="Location name *"
                          ></input>
                        </div>
                        <div className="col-9 col-sm-10 col-xl-11">
                          <label htmlFor="address" className="col-form-label">
                            Address :
                          </label>
                          <input
                            id="address"
                            ref={refAddress}
                            type="text"
                            className="form-control"
                            placeholder="Address"
                          ></input>
                        </div>
                        <div className="col-9 col-sm-10 col-xl-11">
                          <label htmlFor="city" className="col-form-label">
                            City :
                          </label>
                          <input
                            id="city"
                            ref={refCity}
                            type="text"
                            className="form-control"
                            placeholder="City"
                          ></input>
                        </div>
                        <div className="col-9 col-sm-10 col-xl-11">
                          <label htmlFor="state" className="col-form-label">
                            State :
                          </label>
                          <input
                            id="state"
                            ref={refState}
                            type="text"
                            className="form-control"
                            placeholder="State"
                          ></input>
                        </div>
                        <div className="col-9 col-sm-10 col-xl-11">
                          <label htmlFor="pincode" className="col-form-label">
                            Pincode :
                          </label>
                          <input
                            id="pincode"
                            ref={refPincode}
                            type="number"
                            className="form-control"
                            placeholder="Pincode"
                          ></input>
                        </div>
                        <div className="col-9 col-sm-10 col-xl-11">
                          <label htmlFor="latitude" className="col-form-label">
                            Latitude :
                          </label>
                          <input
                            id="latitude"
                            ref={refLatitude}
                            type="number"
                            className="form-control"
                            placeholder="Latitude"
                            step=".01"
                          ></input>
                        </div>
                        <div className="col-9 col-sm-10 col-xl-11">
                          <label htmlFor="longitude" className="col-form-label">
                            Longitude :
                          </label>
                          <input
                            id="longitude"
                            ref={refLongitude}
                            type="number"
                            className="form-control"
                            placeholder="Longitude"
                            step=".01"
                          ></input>
                        </div>
                        <div className="col-9 col-sm-10 col-xl-11">
                          <label
                            htmlFor="industryCode"
                            className="col-form-label"
                          >
                            Industry code :
                          </label>
                          <input
                            id="industryCode"
                            ref={refIndustrycode}
                            type="text"
                            className="form-control"
                            placeholder="Industry code"
                          ></input>
                        </div>
                        <div className="col-9 col-sm-10 col-xl-11">
                          <label
                            htmlFor="gangaBasin"
                            className="col-form-label"
                          >
                            Ganga Basin :
                          </label>
                          <select
                            id="gangaBasin"
                            defaultValue={""}
                            className="form-select"
                            ref={refGangaBasin}
                          >
                            <option
                              disabled
                              style={{ color: "red !important" }}
                              value=""
                            >
                              Ganga Basin
                            </option>
                            <option value={true}>Yes</option>
                            <option value={false}>no</option>
                          </select>
                        </div>
                        {/* ========== */}
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
    </>
  );
};

export default CreateNewLocation;

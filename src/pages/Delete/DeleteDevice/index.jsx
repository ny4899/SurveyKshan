import axios from "axios";
import React, { useRef, useState, useEffect } from "react";

const DeleteDevice = () => {
  const [industryNames, setIndustryNames] = useState("");
  const [deviceNames, setDeviceNames] = useState("");
  const [selectedIndustryId, setSelectedIndustryId] = useState("");
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const [selectedDeviceName, setSelectedDeviceName] = useState("");
  const [inputMessage, setInputMessage] = useState("Loading...");
  const [selectMessage, setSelectMessage] = useState("");
  const [deviceInputMessage, setDeviceInputMessage] = useState("Loading..");
  const [deleteMessage, setDeleteMessage] = useState("");

  const refSelectedIndustry = useRef(null);
  const refSelectedDevice = useRef(null);

  useEffect(() => {
    const timeId = setTimeout(() => {
      if (selectMessage) {
        setSelectMessage("");
      }
      if (deleteMessage) {
        setDeleteMessage("");
      }
    }, 3000);
    return () => {
      clearTimeout(timeId);
    };
  }, [selectMessage, deleteMessage]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios(
          "https://natoursny.herokuapp.com/api/v1/industry_names"
        );
        setIndustryNames(res.data.data.industry_names);
      } catch (error) {
        setInputMessage(`Somthing went wrong ${error.message}`);
      }
    }
    fetchData();
  }, [deleteMessage]);

  useEffect(() => {
    if (selectedIndustryId) {
      async function fetchData() {
        try {
          const res = await axios(
            `https://natoursny.herokuapp.com/api/v1/device/${selectedIndustryId}`
          );
          setDeviceNames(res.data.data.devices);
        } catch (error) {
          setDeviceInputMessage("Unable to fetch!");
        }
      }
      fetchData();
    }
  }, [selectedIndustryId, deleteMessage]);

  const handleSelectedIndustry = (e) => {
    e.preventDefault();
    setSelectedIndustryId(refSelectedIndustry.current.value);
  };

  const handleSelectedDevice = (e) => {
    e.preventDefault();
    setSelectedDeviceId(refSelectedDevice.current.value);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!selectedDeviceId) {
      setSelectMessage("Please select Device");
    } else {
      try {
        const res = await axios(
          `https://natoursny.herokuapp.com/api/v1/device/${selectedIndustryId}/${selectedDeviceId}`
        );
        setSelectedDeviceName(res.data.data.device.device_name);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDeleteConfirm = async () => {
    setDeleteMessage("processing...");
    try {
      const res = await axios.patch(
        `https://natoursny.herokuapp.com/api/v1/device/delete/${selectedIndustryId}/${selectedDeviceId}`
      );
      if (res.status === 201) {
        setDeleteMessage("Deleted successfully!");
        refSelectedIndustry.current.value = "";
      }
    } catch (error) {
      console.log(error);
      setDeleteMessage(`Something went wrong! ${error.message}`);
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
                <form className="mb-3">
                  <fieldset>
                    <legend style={{ backgroundColor: "lavender" }}>
                      Select industry
                    </legend>
                    <div className="row g-3">
                      {/* ================*/}
                      <div className="col-12">
                        <select
                          required
                          defaultValue={""}
                          className="form-select mb-2"
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
                              {inputMessage}
                            </option>
                          )}
                        </select>

                        <span className="text-danger m-0">{selectMessage}</span>
                      </div>
                    </div>
                  </fieldset>
                </form>

                {deviceNames ? (
                  <form>
                    <fieldset>
                      <legend style={{ backgroundColor: "lavender" }}>
                        Select Device
                      </legend>
                      <div className="row g-3">
                        {/* ================*/}
                        <div className="col-12">
                          <select
                            required
                            defaultValue={""}
                            className="form-select mb-2"
                            ref={refSelectedDevice}
                            onChange={handleSelectedDevice}
                          >
                            <option value="">Select Device</option>
                            {deviceNames ? (
                              deviceNames.map((device) => {
                                return (
                                  <option key={device._id} value={device._id}>
                                    {device.device_name}
                                  </option>
                                );
                              })
                            ) : (
                              <option disabled value="loading">
                                {deviceInputMessage}
                              </option>
                            )}
                          </select>

                          <span className="text-danger m-0">
                            {selectMessage}
                          </span>
                        </div>
                        {/* ================*/}

                        {selectedDeviceId ? (
                          <div className="col-12">
                            <div className="d-flex justify-content-end py-2">
                              <button
                                className="btn btn-secondary me-3"
                                onClick={() => {
                                  refSelectedIndustry.current.value =
                                    "DEFAULT_Industry";
                                  setSelectedIndustryId("");
                                }}
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                className="btn btn-danger"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                                onClick={handleDelete}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        ) : (
                          <></>
                        )}
                        {/* ================*/}
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

      {/* delete conformation model  */}
      {selectedIndustryId ? (
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog ">
            <div className="modal-content ">
              <div className="modal-body ">
                <p className="m-0">
                  Are you sure you want to delete
                  <span className="fw-bolder">
                    {` ${selectedDeviceName} ` || "------"}
                  </span>
                  Device permanently.
                </p>
              </div>
              <div className="modal-footer ">
                {deleteMessage ? (
                  <div
                    className="alert alert-success w-100 mb-2 py-2"
                    role="alert"
                  >
                    {deleteMessage}
                  </div>
                ) : (
                  <></>
                )}
                <button
                  type="button"
                  className="btn btn-sm btn-secondary"
                  data-bs-dismiss="modal"
                >
                  cancel
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-danger"
                  onClick={handleDeleteConfirm}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default DeleteDevice;

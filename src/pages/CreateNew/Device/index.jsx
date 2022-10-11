import axios from "axios";
import React, { useRef, useState, useEffect } from "react";

const CreateNewDevice = () => {
  const [industryNames, setIndustryNames] = useState("");
  const [selectedIndustryId, setSelectedIndustryId] = useState("");
  const [deviceCategoryList, setDeviceCategoryList] = useState("");
  const [deviceManufacturersList, setDeviceManufacturersList] = useState("");
  const [deviceSupplierList, setDeviceSupplierList] = useState("");

  const [addDeviceCategoryMessage, setAddDeviceCategoryMessage] = useState("");
  const [addDeviceCategoryError, setAddDeviceCategoryError] = useState("");

  const [addDeviceManufacturerMessage, setAddDeviceManufacturerMessage] =
    useState("");
  const [addDeviceManufacturerError, setAddDeviceManufacturerError] =
    useState("");

  const [addDeviceSupplierMessage, setAddDeviceSupplierMessage] = useState("");
  const [addDeviceSupplierError, setAddDeviceSupplierError] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [formView, setformView] = useState("d-none");

  const refSelectedIndustry = useRef("");

  const refAddDeviceCategory = useRef("");
  const refAddDeviceManufacturer = useRef("");
  const refAddDeviceSupplier = useRef("");

  const refDeviceName = useRef(null);
  const refDeviceCategory = useRef(null);
  const refDeviceSupplier = useRef(null);
  const refDeviceManufacturer = useRef(null);
  const refDeviceModelNumber = useRef(null);

  useEffect(() => {
    const timeId = setTimeout(() => {
      if (message || error) {
        setMessage("");
        setError("");
      }
      if (addDeviceCategoryMessage || addDeviceCategoryError) {
        setAddDeviceCategoryMessage("");
        setAddDeviceCategoryError("");
      }
      if (addDeviceManufacturerMessage || addDeviceManufacturerError) {
        setAddDeviceManufacturerMessage("");
        setAddDeviceManufacturerError("");
      }
      if (addDeviceSupplierMessage || addDeviceSupplierError) {
        setAddDeviceSupplierMessage("");
        setAddDeviceSupplierError("");
      }
    }, 3000);
    return () => {
      clearTimeout(timeId);
    };
  }, [
    message,
    error,
    addDeviceCategoryMessage,
    addDeviceCategoryError,
    addDeviceManufacturerMessage,
    addDeviceManufacturerError,
    addDeviceSupplierMessage,
    addDeviceSupplierError,
  ]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios(
          "https://natoursny.herokuapp.com/api/v1/device_categories"
        );
        setDeviceCategoryList(res.data.data.device_categories);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchData();
  }, [addDeviceCategoryMessage]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios(
          "https://natoursny.herokuapp.com/api/v1/device_manufacturers"
        );
        setDeviceManufacturersList(res.data.data.device_Manufacturers);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchData();
  }, [addDeviceManufacturerMessage]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios(
          "https://natoursny.herokuapp.com/api/v1/device_suppliers"
        );
        setDeviceSupplierList(res.data.data.device_Suppliers);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchData();
  }, [addDeviceSupplierMessage]);

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
    setformView("d-block");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("processing...");
    try {
      const dataObj = {
        device_name: refDeviceName.current.value,
        device_category: refDeviceCategory.current.value,
        device_supplier: refDeviceSupplier.current.value,
        device_manufacturer: refDeviceManufacturer.current.value,
        device_model_number: refDeviceModelNumber.current.value,
      };
      const res = await axios.patch(
        `https://natoursny.herokuapp.com/api/v1/device/${selectedIndustryId}`,
        dataObj
      );
      if (res.status === 201) {
        setError("");
        setMessage("Device added successfully!");
      }
    } catch (error) {
      setMessage("");
      if (error.response.data.message) {
        setError(`${error.response.data.message}!`);
      } else {
        setError(`${error.message}!`);
      }
    }
  };

  const handleAddDeviceCategory = async (e) => {
    e.preventDefault();
    setAddDeviceCategoryMessage("Processing...");
    try {
      const dataObj = {
        device_category_name: refAddDeviceCategory.current.value,
      };

      const res = await axios.post(
        "https://natoursny.herokuapp.com/api/v1/device_categories",
        dataObj
      );
      if (res.status === 201) {
        setAddDeviceCategoryMessage("Device Category Added successfully");
        refAddDeviceCategory.current.value = "";
      }
    } catch (error) {
      if (error.response.data.message.includes("E11000")) {
        setAddDeviceCategoryMessage("");
        setAddDeviceCategoryError(`Device Category already exist!`);
      } else {
        setAddDeviceCategoryMessage("");
        setAddDeviceCategoryError(`Something went wrong! ${error.message}`);
      }
    }
  };

  const handleAddDeviceManufacturer = async (e) => {
    e.preventDefault();
    setAddDeviceManufacturerMessage("Processing...");
    try {
      const dataObj = {
        device_manufacturer_name: refAddDeviceManufacturer.current.value,
      };

      const res = await axios.post(
        "https://natoursny.herokuapp.com/api/v1/device_manufacturers",
        dataObj
      );
      if (res.status === 201) {
        setAddDeviceManufacturerMessage(
          "Device Manufacturer Added successfully"
        );
        refAddDeviceManufacturer.current.value = "";
      }
    } catch (error) {
      if (error.response.data.message.includes("E11000")) {
        setAddDeviceManufacturerMessage("");
        setAddDeviceManufacturerError(`Device Manufacturer already exist!`);
      } else {
        setAddDeviceManufacturerMessage("");
        setAddDeviceManufacturerError(`Something went wrong! ${error.message}`);
      }
    }
  };

  const handleAddDeviceSupplier = async (e) => {
    e.preventDefault();
    setAddDeviceSupplierMessage("Processing...");
    try {
      const dataObj = {
        device_supplier_name: refAddDeviceSupplier.current.value,
      };

      const res = await axios.post(
        "https://natoursny.herokuapp.com/api/v1/device_suppliers",
        dataObj
      );
      if (res.status === 201) {
        setAddDeviceSupplierMessage("Device Manufacturer Added successfully");
        refAddDeviceSupplier.current.value = "";
      }
    } catch (error) {
      if (error.response.data.message.includes("E11000")) {
        setAddDeviceSupplierMessage("");
        setAddDeviceSupplierError(`Device Manufacturer already exist!`);
      } else {
        setAddDeviceSupplierMessage("");
        setAddDeviceSupplierError(`Something went wrong! ${error.message}`);
      }
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
                          <option value="">Select industry</option>
                          {industryNames ? (
                            industryNames.map((name) => {
                              return (
                                <option key={name._id} value={name._id}>
                                  {name.industry_name}
                                </option>
                              );
                            })
                          ) : (
                            <option value="loading">Loading...</option>
                          )}
                        </select>
                      </div>
                      {/* ================*/}
                    </div>
                  </fieldset>
                </form>

                {selectedIndustryId ? (
                  <form onSubmit={handleSubmit} className={`mt-3 ${formView}`}>
                    <fieldset>
                      <legend style={{ backgroundColor: "lavender" }}>
                        Add Device
                      </legend>
                      <div className="row g-3">
                        <div className="col-9 col-sm-10 col-xl-11">
                          <input
                            ref={refDeviceName}
                            required
                            id="deviceName"
                            type="text"
                            className="form-control"
                            placeholder="Device name *"
                          ></input>
                        </div>
                        {/* col-10  */}
                        <div className="col-9 col-sm-10 col-xl-11">
                          <select
                            id="deviceCategory"
                            defaultValue={""}
                            className="form-select"
                            ref={refDeviceCategory}
                          >
                            <option value="">Select Category</option>
                            {deviceCategoryList ? (
                              deviceCategoryList.map((name) => {
                                return (
                                  <option
                                    key={name._id}
                                    value={name.device_category_name}
                                  >
                                    {name.device_category_name}
                                  </option>
                                );
                              })
                            ) : (
                              <option value="loading">Loading...</option>
                            )}
                          </select>
                        </div>

                        {/* col-2 */}
                        <div className="col-3 col-sm-2 col-xl-1">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-toggle="modal"
                            data-bs-target="#deviceCategoryModalContainer"
                          >
                            New
                          </button>
                        </div>

                        {/* col-10  */}
                        <div className="col-9 col-sm-10 col-xl-11">
                          <select
                            id="deviceCategory"
                            defaultValue={""}
                            className="form-select"
                            ref={refDeviceManufacturer}
                          >
                            <option value="">Select Manufacturer</option>
                            {deviceManufacturersList ? (
                              deviceManufacturersList.map((name) => {
                                return (
                                  <option
                                    key={name._id}
                                    value={name.device_manufacturer_name}
                                  >
                                    {name.device_manufacturer_name}
                                  </option>
                                );
                              })
                            ) : (
                              <option value="loading">Loading...</option>
                            )}
                          </select>
                        </div>

                        {/* col-2 */}
                        <div className="col-3 col-sm-2 col-xl-1">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-toggle="modal"
                            data-bs-target="#deviceManufacturerModalContainer"
                          >
                            New
                          </button>
                        </div>

                        {/* col-10  */}
                        <div className="col-9 col-sm-10 col-xl-11">
                          <select
                            id="deviceCategory"
                            defaultValue={""}
                            className="form-select"
                            ref={refDeviceSupplier}
                          >
                            <option value="">Select Supplier</option>
                            {deviceSupplierList ? (
                              deviceSupplierList.map((name) => {
                                return (
                                  <option
                                    key={name._id}
                                    value={name.device_supplier_name}
                                  >
                                    {name.device_supplier_name}
                                  </option>
                                );
                              })
                            ) : (
                              <option value="loading">Loading...</option>
                            )}
                          </select>
                        </div>

                        {/* col-2 */}
                        <div className="col-3 col-sm-2 col-xl-1">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-toggle="modal"
                            data-bs-target="#deviceSupplierModalContainer"
                          >
                            New
                          </button>
                        </div>

                        <div className="col-9 col-sm-10 col-xl-11">
                          <input
                            id="deviceModelNumber"
                            ref={refDeviceModelNumber}
                            type="number"
                            className="form-control"
                            placeholder="Device Model Number"
                          ></input>
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
                            <button
                              className="btn btn-secondary me-3"
                              onClick={() => {
                                setformView("d-none");
                                setSelectedIndustryId("");
                                refSelectedIndustry.current.value = "";
                              }}
                            >
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

      {/* modal create device category  */}
      <div
        className="modal fade"
        id="deviceCategoryModalContainer"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <form className="modal-content" onSubmit={handleAddDeviceCategory}>
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Create Device Category
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body bg-light">
              <div className="row gy-1">
                {addDeviceCategoryError ? (
                  <div className="col-12">
                    <div className="alert alert-danger py-2" role="alert">
                      {addDeviceCategoryError}
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                {addDeviceCategoryMessage ? (
                  <div className="col-12">
                    <div className="alert alert-success py-2" role="alert">
                      {addDeviceCategoryMessage}
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                <div className="col-12">
                  <input
                    type="text"
                    className="form-control "
                    placeholder="Category name *"
                    ref={refAddDeviceCategory}
                    required
                  ></input>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary btn-sm">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* modal create device manufacturer  */}
      <div
        className="modal fade"
        id="deviceManufacturerModalContainer"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <form
            className="modal-content"
            onSubmit={handleAddDeviceManufacturer}
          >
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Create Device Manufacturer
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body bg-light">
              <div className="row gy-1">
                {addDeviceManufacturerError ? (
                  <div className="col-12">
                    <div className="alert alert-danger py-2" role="alert">
                      {addDeviceManufacturerError}
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                {addDeviceManufacturerMessage ? (
                  <div className="col-12">
                    <div className="alert alert-success py-2" role="alert">
                      {addDeviceManufacturerMessage}
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                <div className="col-12">
                  <input
                    type="text"
                    className="form-control "
                    placeholder="Manufacturer name *"
                    ref={refAddDeviceManufacturer}
                    required
                  ></input>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary btn-sm">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* modal create device Supplier  */}
      <div
        className="modal fade"
        id="deviceSupplierModalContainer"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <form className="modal-content" onSubmit={handleAddDeviceSupplier}>
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Create Device Supplier
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body bg-light">
              <div className="row gy-1">
                {addDeviceSupplierError ? (
                  <div className="col-12">
                    <div className="alert alert-danger py-2" role="alert">
                      {addDeviceSupplierError}
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                {addDeviceSupplierMessage ? (
                  <div className="col-12">
                    <div className="alert alert-success py-2" role="alert">
                      {addDeviceSupplierMessage}
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                <div className="col-12">
                  <input
                    type="text"
                    className="form-control "
                    placeholder="Supplier name *"
                    ref={refAddDeviceSupplier}
                    required
                  ></input>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary btn-sm">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateNewDevice;

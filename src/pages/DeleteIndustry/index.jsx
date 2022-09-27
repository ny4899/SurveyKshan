import axios from "axios";
import React, { useRef, useState, useEffect } from "react";

const DeleteIndustry = () => {
  const [industryNames, setIndustryNames] = useState("");
  const [selectedIndustryId, setSelectedIndustryId] = useState("");
  const [selectedIndustryName, setSelectedIndustryName] = useState("");
  const [inputMessage, setInputMessage] = useState("Loading...");
  const [selectMessage, setSelectMessage] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");

  const refSelectedIndustry = useRef("");

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

  const handleSelectedIndustry = (e) => {
    e.preventDefault();
    setSelectedIndustryId(refSelectedIndustry.current.value);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!selectedIndustryId) {
      setSelectMessage("Please select industry");
    } else {
      try {
        const res = await axios(
          `https://natoursny.herokuapp.com/api/v1/industries/${selectedIndustryId}`
        );
        setSelectedIndustryName(res.data.data.industry.industry_name);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDeleteConfirm = async () => {
    setDeleteMessage("processing...");
    try {
      const res = await axios.delete(
        `https://natoursny.herokuapp.com/api/v1/industries/${selectedIndustryId}`
      );
      console.log(res);
      if (res.status === 204) {
        setDeleteMessage("Deleted successfully!");
        refSelectedIndustry.current.value = "DEFAULT_Industry";
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
                <form>
                  <fieldset>
                    <legend style={{ backgroundColor: "lavender" }}>
                      Select industry
                    </legend>
                    <div className="row g-3">
                      {/* ================*/}
                      <div className="col-12">
                        <select
                          required
                          defaultValue={"DEFAULT_Industry"}
                          className="form-select mb-2"
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
                              {inputMessage}
                            </option>
                          )}
                        </select>

                        <span className="text-danger m-0">{selectMessage}</span>
                      </div>
                      {/* ================*/}
                      {selectedIndustryId ? (
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
                    {` ${selectedIndustryName} ` || "------"}
                  </span>
                  industry permanently.
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

export default DeleteIndustry;

import axios from "axios";
import React, { useRef, useState, useEffect } from "react";

const UpdateIndustry = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const refName = useRef(null);
  const refCategory = useRef(null);
  const refIndustry = useRef(null);
  const refENM = useRef(null);
  const refShowToCPCB = useRef(null);
  const refIndustryAs = useRef(null);
  const refPartner = useRef(null);

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

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const dataObj = {
        industry_name: refName.current.value,
        industry_category: refCategory.current.value,
        industry_type: refIndustry.current.value,
        exceedance_notification_mail: refENM.current.value,
        show_to_CPCB: refShowToCPCB.current.value,
        industry_as: refIndustryAs.current.value,
        industry_partner: refPartner.current.value,
      };
      const res = await axios.post(
        "https://natoursny.herokuapp.com/api/v1/industries",
        dataObj
      );
      if (res.status === 201) {
        setMessage("Industry created successfully");
      }
    } catch (error) {
      if (error.response.data.message.includes("E11000")) {
        setError(`Industry name already exist!`);
      } else {
        setError(`Something went wrong! ${error.message}`);
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
                <form onSubmit={handleSubmit}>
                  <fieldset className="">
                    <legend style={{ backgroundColor: "lavender" }}>
                      Create New Industry
                    </legend>
                    <div className="row g-3">
                      {/* ============================================= */}
                      <div className="col-9 col-sm-10 col-xl-11">
                        <input
                          ref={refName}
                          required
                          type="text"
                          className="form-control"
                          placeholder="Name *"
                        ></input>
                      </div>

                      {/* col-10  */}
                      <div className="col-9 col-sm-10 col-xl-11">
                        <select
                          defaultValue={"DEFAULT_category"}
                          className="form-select"
                          ref={refCategory}
                          required
                        >
                          <option disabled value="DEFAULT_category">
                            Select a Category *
                          </option>
                          <option value="cement">cement</option>
                          <option value="chemical">chemical</option>
                          <option value="cppper">coppper</option>
                          <option value="sugar">sugar</option>
                        </select>
                      </div>

                      {/* col-10  */}
                      <div className="col-9 col-sm-10 col-xl-11">
                        <select
                          defaultValue={"DEFAULT_industry"}
                          className="form-select"
                          ref={refIndustry}
                          required
                        >
                          <option disabled value="DEFAULT_industry">
                            Select a industry *
                          </option>
                          <option value="CEPT">CEPT</option>
                          <option value="dairy">Dairy</option>
                          <option value="manufacturer">Manufacturer</option>
                          <option value="OEM">OEM</option>
                        </select>
                      </div>

                      {/* col-10  */}
                      <div className="col-9 col-sm-10 col-xl-11">
                        <select
                          defaultValue={"DEFAULT_ENM"}
                          className="form-select"
                          ref={refENM}
                        >
                          <option disabled value="DEFAULT_ENM">
                            Exceedance Notification mail
                          </option>
                          <option value={true}>Yes</option>
                          <option value={false}>no</option>
                        </select>
                      </div>

                      {/* col-10  */}
                      <div className="col-9 col-sm-10 col-xl-11">
                        <select
                          defaultValue={"DEFAULT_Show_CPCB"}
                          className="form-select"
                          ref={refShowToCPCB}
                        >
                          <option disabled value="DEFAULT_Show_CPCB">
                            Show Industry to CPCB?
                          </option>
                          <option value={true}>Yes</option>
                          <option value={false}>no</option>
                        </select>
                      </div>

                      {/* col-10  */}
                      <div className="col-9 col-sm-10 col-xl-11">
                        <select
                          defaultValue={"DEFAULT_AS"}
                          className="form-select"
                          ref={refIndustryAs}
                        >
                          <option disabled value="DEFAULT_AS">
                            Select Option
                          </option>
                          <option value="client">client</option>
                          <option value="partner">partner</option>
                        </select>
                      </div>

                      {/* col-10  */}
                      <div className="col-9 col-sm-10 col-xl-11">
                        <select
                          defaultValue={"DEFAULT_partner"}
                          className="form-select"
                          ref={refPartner}
                        >
                          <option disabled value="DEFAULT_partner">
                            Select Partner
                          </option>
                          <option value="envirozone">Envirozone</option>
                          <option value="ingeo">Ingeo</option>
                          <option value="hitech enviro solutions">
                            Hitech Enviro Solutions
                          </option>
                        </select>
                      </div>

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

export default UpdateIndustry;

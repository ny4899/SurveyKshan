import axios from "axios";
import React from "react";
import { useRef } from "react";

const CreateNewUser = () => {
  const refName = useRef(null);
  const refLastname = useRef(null);
  const refUsername = useRef(null);
  const refPassword = useRef(null);
  const refEmail = useRef(null);
  const refIndustry = useRef(null);
  const refPhone = useRef(null);
  const refCity = useRef(null);
  const refAddress = useRef(null);
  const refState = useRef(null);
  const refExpirein = useRef(null);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const dataObj = {
        name: refName.current.value,
        last_name: refLastname.current.value,
        username: refUsername.current.value,
        password: refPassword.current.value,
        email: refEmail.current.value,
        industry: refIndustry.current.value,
        phone: refPhone.current.value,
        city: refCity.current.value,
        address: refAddress.current.value,
        state: refState.current.value,
        expire_in: refExpirein.current.value,
      };
      console.log(dataObj);
      const res = await axios.post(
        "https://natoursny.herokuapp.com/api/v1/users",
        dataObj
      );
      console.log(res);
    } catch (error) {
      console.log(error.message);
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
                      Create New User
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
                      <div className="col-9 col-sm-10 col-xl-11">
                        <input
                          ref={refLastname}
                          type="text"
                          className="form-control"
                          placeholder="Lastname"
                        ></input>
                      </div>
                      <div className="col-9 col-sm-10 col-xl-11">
                        <input
                          ref={refUsername}
                          required
                          type="text"
                          className="form-control"
                          placeholder="Username *"
                        ></input>
                      </div>
                      <div className="col-9 col-sm-10 col-xl-11">
                        <input
                          ref={refPassword}
                          required
                          type="text"
                          className="form-control"
                          placeholder="Password *"
                        ></input>
                      </div>
                      <div className="col-9 col-sm-10 col-xl-11">
                        <input
                          ref={refExpirein}
                          required
                          type="number"
                          className="form-control"
                          placeholder="Expire in *"
                        ></input>
                      </div>
                      <div className="col-9 col-sm-10 col-xl-11">
                        <input
                          ref={refEmail}
                          type="email"
                          className="form-control"
                          placeholder="Email"
                        ></input>
                      </div>
                      <div className="col-9 col-sm-10 col-xl-11">
                        <input
                          ref={refIndustry}
                          type="text"
                          className="form-control"
                          placeholder="Industry"
                        ></input>
                      </div>
                      <div className="col-9 col-sm-10 col-xl-11">
                        <input
                          ref={refPhone}
                          type="text"
                          className="form-control"
                          placeholder="Phone no."
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
                          ref={refAddress}
                          type="text"
                          className="form-control"
                          placeholder="Address"
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

export default CreateNewUser;

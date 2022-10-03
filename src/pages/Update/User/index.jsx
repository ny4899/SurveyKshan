import axios from "axios";
import React, { useRef, useState, useEffect } from "react";

const UpdateUser = () => {
  const [userNames, setUserNames] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");

  const [formView, setformView] = useState("d-block");
  const [formMessage, setFormMessage] = useState("fetching data...");

  const [userListMessage, setUserListMessage] = useState("Loading...");
  const [industryListMessage, setIndustryListMessage] = useState("Loading...");

  const [industryList, setIndustryList] = useState("");
  const [message, setMessage] = useState("");

  const [error, setError] = useState("");

  const refName = useRef(null);
  const refLastname = useRef(null);
  const refUsername = useRef(null);
  const refPassword = useRef(null);
  const refEmail = useRef(null);
  const refPhone = useRef(null);
  const refIndustry = useRef(null);
  const refCity = useRef(null);
  const refAddress = useRef(null);
  const refState = useRef(null);

  const refSelectedUser = useRef("");

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
          "https://natoursny.herokuapp.com/api/v1/user_names"
        );
        if (res.status === 200) {
          setUserListMessage("");
          setUserNames(res.data.data.user_names);
        }
      } catch (error) {
        setUserListMessage(`Somthing went wrong ${error.message}`);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios(
          "https://natoursny.herokuapp.com/api/v1/industry_names"
        );
        setIndustryListMessage("");
        setIndustryList(res.data.data.industry_names);
      } catch (error) {
        setIndustryListMessage(`Somthing went wrong ${error.message}`);
      }
    }
    fetchData();
  }, []);

  const getUserData = async () => {
    try {
      const res = await axios(
        `https://natoursny.herokuapp.com/api/v1/users/${selectedUserId}`
      );

      if (res.status === 200) {
        const {
          name,
          last_name,
          username,
          password,
          email,
          industry,
          phone,
          city,
          address,
          state,
        } = res.data.data.user;

        refName.current.value = name;
        refLastname.current.value = last_name;
        refUsername.current.value = username;
        refPassword.current.value = password;
        refEmail.current.value = email;
        refIndustry.current.value = industry;
        refPhone.current.value = phone;
        refCity.current.value = city;
        refAddress.current.value = address;
        refState.current.value = state;
      } else {
        setFormMessage(`Unable to fetch: try again!`);
      }
      setformView("d-block");
    } catch (error) {
      setFormMessage(`Something went wrong: ${error.message}`);
    }
  };

  useEffect(() => {
    if (selectedUserId) {
      getUserData();
    }
  }, [selectedUserId]);

  const handleSelectedIndustry = (e) => {
    e.preventDefault();
    setformView("d-none");
    setSelectedUserId(refSelectedUser.current.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("processing!");
    try {
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
      };
      const res = await axios.patch(
        `https://natoursny.herokuapp.com/api/v1/users/${selectedUserId}`,
        dataObj
      );
      if (res.status === 204) {
        setMessage("Updated successfully!");
      }
    } catch (error) {
      setMessage("");
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
                      Select User
                    </legend>
                    <div className="row g-3">
                      {/* ================*/}
                      <div className="col-9 col-sm-10 col-xl-11">
                        <select
                          defaultValue={""}
                          className="form-select mb-3"
                          ref={refSelectedUser}
                          onChange={handleSelectedIndustry}
                        >
                          <option disabled value="">
                            Select User
                          </option>
                          {userNames ? (
                            userNames.map((name) => {
                              return (
                                <option key={name._id} value={name._id}>
                                  {name.username}
                                </option>
                              );
                            })
                          ) : (
                            <option disabled value="loading">
                              {userListMessage}
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

                {selectedUserId ? (
                  <form onSubmit={handleSubmit} className={`mt-3 ${formView}`}>
                    <fieldset>
                      <legend style={{ backgroundColor: "lavender" }}>
                        Update Industry
                      </legend>

                      <div className="row gx-3 gy-2">
                        {/* ================ */}
                        <div className="col-9 col-sm-10 col-xl-11">
                          <label htmlFor="name" className="col-form-label">
                            Name:
                          </label>
                          <input
                            id="name"
                            ref={refName}
                            type="text"
                            className="form-control"
                            placeholder="Name"
                          ></input>
                        </div>

                        {/* ================ */}
                        <div className="col-9 col-sm-10 col-xl-11">
                          <label htmlFor="lastname" className="col-form-label">
                            Lastname:
                          </label>
                          <input
                            id="lastname"
                            ref={refLastname}
                            type="text"
                            className="form-control"
                            placeholder="Name *"
                          ></input>
                        </div>

                        {/* ================ */}
                        <div className="col-9 col-sm-10 col-xl-11">
                          <label htmlFor="username" className="col-form-label">
                            Username:
                          </label>
                          <input
                            id="username"
                            ref={refUsername}
                            type="text"
                            className="form-control"
                            placeholder="Username"
                          ></input>
                        </div>

                        {/* ================ */}
                        <div className="col-9 col-sm-10 col-xl-11">
                          <label htmlFor="password" className="col-form-label">
                            Password:
                          </label>
                          <input
                            id="password"
                            ref={refPassword}
                            type="text"
                            className="form-control"
                            placeholder="Password"
                          ></input>
                        </div>

                        {/* ================ */}
                        <div className="col-9 col-sm-10 col-xl-11">
                          <label htmlFor="email" className="col-form-label">
                            Email:
                          </label>
                          <input
                            id="email"
                            ref={refEmail}
                            type="text"
                            className="form-control"
                            placeholder="email"
                          ></input>
                        </div>

                        {/* col-10  */}
                        <div className="col-9 col-sm-10 col-xl-11">
                          <label
                            htmlFor="selectIndustry"
                            className="col-form-label"
                          >
                            select Industry:
                          </label>
                          <select
                            id="selectIndustry"
                            defaultValue={""}
                            className="form-select"
                            ref={refIndustry}
                          >
                            <option disabled value="">
                              Select Industry
                            </option>
                            {industryList ? (
                              industryList.map((name) => {
                                return (
                                  <option
                                    key={name._id}
                                    value={name.industry_name}
                                  >
                                    {name.industry_name}
                                  </option>
                                );
                              })
                            ) : (
                              <option disabled value="loading">
                                {industryListMessage}
                              </option>
                            )}
                          </select>
                        </div>

                        {/* ================ */}
                        <div className="col-9 col-sm-10 col-xl-11">
                          <label htmlFor="phone" className="col-form-label">
                            Phone:
                          </label>
                          <input
                            id="phone"
                            ref={refPhone}
                            type="text"
                            className="form-control"
                            placeholder="Phone"
                          ></input>
                        </div>

                        {/* ================ */}
                        <div className="col-9 col-sm-10 col-xl-11">
                          <label htmlFor="city" className="col-form-label">
                            City:
                          </label>
                          <input
                            id="city"
                            ref={refCity}
                            type="text"
                            className="form-control"
                            placeholder="City"
                          ></input>
                        </div>

                        {/* ================ */}
                        <div className="col-9 col-sm-10 col-xl-11">
                          <label htmlFor="address" className="col-form-label">
                            Address:
                          </label>
                          <input
                            id="address"
                            ref={refAddress}
                            type="text"
                            className="form-control"
                            placeholder="Address"
                          ></input>
                        </div>

                        {/* ================ */}
                        <div className="col-9 col-sm-10 col-xl-11">
                          <label htmlFor="state" className="col-form-label">
                            State:
                          </label>
                          <input
                            id="state"
                            ref={refState}
                            type="text"
                            className="form-control"
                            placeholder="State *"
                          ></input>
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
                            <button
                              className="btn btn-secondary me-3"
                              onClick={() => {
                                setSelectedUserId("");
                                refSelectedUser.current.value =
                                  "DEFAULT_Industry";
                              }}
                            >
                              Cancel
                            </button>
                            <button type="submit" className="btn btn-success">
                              Update
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

export default UpdateUser;

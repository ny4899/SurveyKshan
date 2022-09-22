import React, { useEffect, useRef, useState } from "react";
import "./App.scss";
import axios from "axios";
// -----
import { Routes, Route } from "react-router-dom";
// -----
import { LoginForm, Loading, Navbar } from "./components";

import {
  Dashboard,
  Stations,
  Licenses,
  Devices,
  Consumables,
  Parameters,
  Location,
  Industry,
  People,
  Maintenance,
  Calibration,
  Audit,
  CameraConfig,
  DataSettings,
  CPCBlog,
  HRPCBlog,
  CreateNewConsumable,
  CreateNewStation,
  CreateNewLicense,
  CreateNewDevice,
  CreateNewParameter,
  CreateNewUser,
  CreateNewIndustry,
  CreateNewLocation,
  AssignedStations,
  RequestedAssets,
  EditProfile,
  ChangePassword,
  Nopage,
} from "./pages";
import Graph from "./components/Dashboard/ContentContainer/Graph";
import Map from "./components/Dashboard/ContentContainer/Map";
import Data from "./components/Dashboard/ContentContainer/Data";

function App() {
  const refUserName = useRef();
  const refPassword = useRef();
  const [loading, setLoading] = useState(true);
  const [fetchingData, setFetchingData] = useState("");
  const [user, setUser] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async function (e) {
    setFetchingData("Fetching data...");
    e.preventDefault();
    try {
      const data = await axios(
        `https://natoursny.herokuapp.com/api/v1/users?username=${refUserName.current.value}&password=${refPassword.current.value}`
      );
      if (data.data.results === 1) {
        setUser(data.data.data.users[0]);
        setFetchingData("");
        setLoading(false);
        localStorage.setItem(
          "user",
          JSON.stringify(data.data.data.users[0].username)
        );
      }
      if (!data.data.results) {
        setLoading(false);
        throw new Error("Username or password not matched!");
      }
    } catch (error) {
      setFetchingData("");
      setError(error.message);
    }
  };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("user"))) {
      setUser(true);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);

  const refmaincontainer = useRef(null);
  const toggleClass = () => {
    let element = refmaincontainer.current;
    const withConatinerFull = "main__wrapper container__full";
    const withOutConatinerFull = "main__wrapper";

    if (element.className === withConatinerFull) {
      element.className = withOutConatinerFull;
    } else if (element.className === withOutConatinerFull) {
      element.className = withConatinerFull;
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return (
      <LoginForm
        handleSubmit={handleSubmit}
        refUserName={refUserName}
        refPassword={refPassword}
        error={error}
        setError={setError}
        fetchingData={fetchingData}
      />
    );
  }

  return (
    <div className="site__warpper">
      <Navbar toggleClass={toggleClass} setUser={setUser} />
      <div ref={refmaincontainer} className="main__wrapper">
        <Routes>
          <Route element={<Dashboard />}>
            <Route index element={<Graph />} />
            <Route path="map" element={<Map />} />
            <Route path="data" element={<Data />} />
          </Route>
          <Route path="/licenses" element={<Licenses />}></Route>
          <Route path="/stations" element={<Stations />} />
          <Route path="consumables" element={<Consumables />} />
          <Route path="parameters" element={<Parameters />} />
          <Route path="maintenance" element={<Maintenance />} />
          <Route path="calibration" element={<Calibration />} />
          {/* create new  */}
          <Route path="createNewStation" element={<CreateNewStation />} />
          <Route path="createNewLicense" element={<CreateNewLicense />} />
          <Route path="createNewDevice" element={<CreateNewDevice />} />
          <Route path="createNewConsumable" element={<CreateNewConsumable />} />
          <Route path="createNewParameter" element={<CreateNewParameter />} />
          <Route path="createNewUser" element={<CreateNewUser />} />
          <Route path="createNewIndustry" element={<CreateNewIndustry />} />
          <Route path="createNewLocation" element={<CreateNewLocation />} />
          {/* Admin  */}
          <Route path="assignedStations" element={<AssignedStations />} />
          <Route path="requestedAssets" element={<RequestedAssets />} />
          <Route path="editProfile" element={<EditProfile />} />
          <Route path="changePassword" element={<ChangePassword />} />
          {/* configure  */}
          <Route path="people" element={<People />} />
          <Route path="industry" element={<Industry />} />
          <Route path="devices" element={<Devices />} />
          <Route path="location" element={<Location />} />
          <Route path="cameraconfig" element={<CameraConfig />} />
          <Route path="datasettings" element={<DataSettings />} />
          {/* settings  */}
          <Route path="audit" element={<Audit />} />
          {/* reports  */}
          <Route path="cpcblog" element={<CPCBlog />} />
          <Route path="hrpcblog" element={<HRPCBlog />} />

          <Route path="*" element={<Nopage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

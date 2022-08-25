import React, { useRef, useState } from "react";
import "./App.scss";
// -----

import { Routes, Route } from "react-router-dom";
import { auth } from "./firebaseConfig";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

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
  AssignedStations,
  RequestedAssets,
  EditProfile,
  ChangePassword,
  Nopage,
} from "./pages"
import Graph from "./components/Dashboard/ContentContainer/Graph";
import Map from "./components/Dashboard/ContentContainer/Map";
import Data from "./components/Dashboard/ContentContainer/Data";
function App() {
  const refUserName = useRef();
  const refPassword = useRef();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState("");
  const [error, setError] = useState("");

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
    setLoading(false);
  });

  const handleSubmit = async function (e) {
    e.preventDefault();
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        refUserName.current.value,
        refPassword.current.value
      );
    } catch (error) {
      setError(error.code);
    }
  };

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
      />
    );
  }

  return (
    <div className="site__warpper">
      <Navbar toggleClass={toggleClass} />
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

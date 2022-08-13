import React, { useRef, useState } from "react";
import "./App.scss";
// -----

import { Routes, Route } from "react-router-dom";
import { auth } from "./firebaseConfig";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

// -----
import LoginForm from "./components/LoginForm";
import Loading from "./components/Loading";
import Navbar from "./components/navbar/Navbar";
import Dashboard from "./pages/Dashboard";
import Stations from "./pages/Stations";
import Licenses from "./pages/Licenses";
import Devices from "./pages/Devices";
import Consumables from "./pages/Consumables";
import Parameters from "./pages/Parameters";
import People from "./pages/People";
import Maintenance from "./pages/Maintenance";
import Calibration from "./pages/Calibration";
// settings pages
import Audit from "./pages/Settings/Audit";
import CameraConfig from "./pages/Settings/CameraConfig";
import DataSettings from "./pages/Settings/DataSettings";
// reports pages
import CPCBlog from "./pages/Reports/CPCBlog";
import HRPCBlog from "./pages/Reports/HRPCBlog";
// create new
import CreateNewStation from "./pages/CreateNew/Station";
import CreateNewLicense from "./pages/CreateNew/License";
import CreateNewDevice from "./pages/CreateNew/Device";
import CreateNewConsumable from "./pages/CreateNew/Consumable";
import CreateNewParameter from "./pages/CreateNew/Parameter";
import CreateNewUser from "./pages/CreateNew/User";
// Admin
import AssignedStations from "./pages/Admin/AssignedStations";
import RequestedAssets from "./pages/Admin/RequestedAssets";
import EditProfile from "./pages/Admin/EditProfile";
import ChangePassword from "./pages/Admin/ChangePassword";
// -----
import Nopage from "./pages/Nopage";

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
      setError(error.code)
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
          <Route index element={<Dashboard />} />
          <Route path="/licenses" element={<Licenses />} />
          <Route path="/stations" element={<Stations />} />
          <Route path="devices" element={<Devices />} />
          <Route path="consumables" element={<Consumables />} />
          <Route path="parameters" element={<Parameters />} />
          <Route path="people" element={<People />} />
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
          {/* settings  */}
          <Route path="audit" element={<Audit />} />
          <Route path="cameraconfig" element={<CameraConfig />} />
          <Route path="datasettings" element={<DataSettings />} />
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

import React, { useState } from "react";
// import './App.module.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegistrationPage from "./pages/registration";
import DetailsPage from "./pages/details";
import ProfileUpdatePage from "./pages/profileUpdate";




const App = () => {
  // inside the app Component, the usestate hook is used to declear a state variable called profile and its setter function, profile is an object with an initial value of empty strings
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  // this func is defined to update the profile state with the updated profile data
  const handleProfileUpdate = (updatedProfile) => {
    setProfile(updatedProfile);
  };

  return (
    <Router>
      <div>

        <Routes>
{/* rather use the page as props */}
          <Route path="/" element={<RegistrationPage />} />

          <Route path="/details" element={<DetailsPage profile={profile} />} />

          <Route path="/profile-update" element={<ProfileUpdatePage profile={profile} onUpdate={handleProfileUpdate} /> }/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;

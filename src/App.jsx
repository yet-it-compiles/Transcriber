/**
 * @file App.jsx
 *
 * @description Serves as the root component of the application that contains
 * all other components along with managing the applications state. Will
 * initialize the primary UI features.
 *
 * @requires react
 */

import React from "react";
import AuthContextProvider from "./context/AuthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import ForgotPassword from "./pages/forgot-password/ForgotPassword";
import Register from "./pages/register/Register"
import StartRecording from "./pages/start-recording/StartRecording";
import EditTranscript from "./pages/editor/EditTranscript";
import DisplayAnalytics from "./pages/display-analytics/DisplayAnalytics";
import SupportFAQ from "./pages/support-FAQ/SupportFAQ";


/**
 * Entry level component that renders the application
 *
 * @returns {JSX.Element} Representing the application
 */
const App = () => {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/" element={<Login />} /> 
          <Route path="/forgot-password" element={<ForgotPassword />} /> 
          <Route path="/register-account" element={<Register/>}/>
          <Route path="/start-recording" element={<StartRecording />} />
          <Route path="/editor" element={<EditTranscript />} />
          <Route path="/display-analytics" element={<DisplayAnalytics />} />
          <Route path="/support-FAQ" element={<SupportFAQ />} />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
};

export default App;

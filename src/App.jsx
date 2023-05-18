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
import ProtectedRoute from "./components/protected-routes/ProtectedRoute";

/**
 * Entry level component that renders the application
 *
 * @returns {JSX.Element} Representing the application
 */

//Working protected routes commented out to allow easier access to other pages
/*const App = () => {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Login />} /> 
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/forgot-password" element={<ForgotPassword />} /> 
          <Route path="/register-account" element={<Register/>}/>
          <Route path="/start-recording" element={<ProtectedRoute><StartRecording /></ProtectedRoute>} />
          <Route path="/editor" element={<ProtectedRoute><EditTranscript /></ProtectedRoute>} />
          <Route path="/display-analytics" element={<ProtectedRoute><DisplayAnalytics /></ProtectedRoute>} />
          <Route path="/support-FAQ" element={<ProtectedRoute><SupportFAQ /></ProtectedRoute>} />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
};*/

const App = () => {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/home" element={<Home />} />
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

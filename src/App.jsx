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
import Dashboard from "./pages/dashboard/Dashboard";
//import CalendarWidget from "./components/calendar/CalendarWidget";
import TextEditor from "./pages/editor/TextEditor";
import WeatherCalendar from "./components/widgets/weather-calendar/WeatherCalendar";
import AudioRecorder from "./services/AudioRecorder";

import Login from "./pages/login/Login";
import ForgotPassword from "./pages/forgot-password/ForgotPassword";

//Import react router and auth context
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthContextProvider from "./context/AuthContext";

/**
 * Entry level component that renders the application
 *
 * @returns {JSX.Element} Representing the application
 */
const App = () => {
  return (
    <>
      <Routing />
      {/* <ActvielyWorkingOn /> */}
    </>
  );
};

const Presentation = () => {
  return (
    <>
      <Dashboard />
      {/* <WeatherCalendar /> */}
      <TextEditor />
      <AudioRecorder />
    </>
  );
};

const Routing = () => {
  return (
    <>
      <BrowserRouter>
        <AuthContextProvider>
        <Routes>  
          <Route
            path="/"
            element={
                <Login />
            }
          />
          <Route
            path="/forgot"
            element={
                <ForgotPassword />}
           />
          <Route path="/recorder" element={<AudioRecorder />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/editor" element={<TextEditor />} />
        
        </Routes>
        </AuthContextProvider>
      </BrowserRouter>
    </>
  );
};

export default App;

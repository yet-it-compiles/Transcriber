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
import LeftNavigation from "./components/navigation/left/LeftNavigation";
import RightNavigation from "./components/navigation/right/RightNavigation";
import Header from "./components/header/Header";
import CalendarWidget from "./components/calendar/CalendarWidget";
import MediaPlayer from "./components/media-player/MediaPlayer";
import TextEditor from "./pages/editor/TextEditor";

// Still needs fixes applied
import Login from "./pages/login/Login";
import ForgotPassword from "./pages/forgot-password/ForgotPassword";

//Import react router and auth context
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import AuthContextProvider from './context/AuthContext'


/**
 * Entry level component that renders the application
 *
 * @returns {JSX.Element} Representing the application
 */
const App = () => {
  return (
    <>
      <ActvielyWorkingOn />
    </>
  );
};

/**
 * Renders the files that are actively being developed on
 *
 * @returns
 */
const ActvielyWorkingOn = () => {
  return (
    <>
      <MediaPlayer />
      <TextEditor />
    </>
  );
};

/**
 * Displays the current dashboard layout
 *
 * @returns
 */
const DashboardLayout = () => {
  return (
    <>
      <RightNavigation />
      <DashboardHeader />
      <LeftNavigation />
      <MetricWidgets />
    </>
  );
};

const NearlyCompleted = () => {
  return (
    <>
      <Recording />
      <CalendarWidget />
      <TextEditor />
    </>
  );
};

const LoginAndForgotPassword = () => {
  return (
    <>
      <Login />
      <ForgotPassword />
    </>
  );
};

const Routing = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MediaPlayer />} />
          <Route
            path="/login"
            element={
              <AuthContextProvider>
                <Login />
              </AuthContextProvider>
            }
          />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/forgot" element={<ForgotPassword />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;

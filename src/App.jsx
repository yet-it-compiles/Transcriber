/**
 * @file App.jsx
 *
 * @description Serves as the root component of the application that contains
 * all other components along with managing the applications state. Will
 * initialize the primary UI features.
 *
 * @requires react
 * @requires LeftNavigation
 * @requires RightNavigation
 * @requires CalendarWidget
 * @requires MetricWidgets
 * @requires AudioRecorder
 * @requires Recording
 * @requires TextEditor
 */

import React from "react";
//import AuthContextProvider from "./contexts/AuthContext";
//import { BrowserRouter, Routes, Route } from "react-router-dom";
import LeftNavigation from "./components/navigation/left/LeftNavigation";
import DashboardHeader from "./components/dashboard-header/DashboardHeader";
import RightNavigation from "./components/navigation/right/RightNavigation";
import CalendarWidget from "./components/calendar-widget/CalendarWidget";
import MetricWidgets from "./components/widgets/MetricWidgets";

/* Responsive Design Completed For Everything Above This Comment */
import TextEditor from "./components/text-editor/TextEditor";
import MediaRecorder from "./components/media-player/MediaRecorder";
//import LoginScreen from "./components/login/LoginScreen";
//import Dashboard from "./components/dashboard/Dashboard";
//import ForgotPassword from "./components/login/ForgotPassword";

/**
 * Entry level component that renders the application
 *
 * @returns {JSX.Element} Representing the application
 */
const App = () => {
    return (
        <>
            {/* 1. Dashboard View - Active */}

            <RightNavigation />
            <DashboardHeader />
            <LeftNavigation />
            <MetricWidgets />

            {/* 2. Completed / Nearly Completed Pages />*/}

            {/* <Recording />
            <CalendarWidget />
            <TextEditor /> */}

            {/* 3. Functionality Testing / Building */}

            {/*  <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={<MediaRecorder />}
                    />
                    <Route
                        path="/login"
                        element={
                            <AuthContextProvider>
                                <LoginScreen />
                            </AuthContextProvider>
                        }
                    />
                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />

                    <Route
                        path="/forgot"
                        element={<ForgotPassword />}
                    />
                </Routes>
            </BrowserRouter> */}
        </>
    );
};

export default App;

/**
 * @file main.jsx
 *
 * @description Responsible for rendering the following components on the
 * initial render of the application.
 *
 * @requires react
 * @requires react-dom/client
 * @requires ./App
 */

import React from "react";
import ReactDOM from "react-dom/client";

/* Need to responsive design this */
/* import LeftNavigation from "./components/navigation/left/LeftNavigation";
import CalendarWidget from "./components/calendar-widget/CalendarWidget"
import RightNavigation from "./components/navigation/right/RightNavigation";
 */
import Dashboard from "./components/dashboard/Dashboard";
import DashboardHeader from "./components/dashboard-header/DashboardHeader";
import LeftNavigation from "./components/navigation/left/LeftNavigation";
import RightNavigation from "./components/navigation/right/RightNavigation";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LeftNavigation />
    <DashboardHeader/>
    <RightNavigation/>
  </React.StrictMode>
);

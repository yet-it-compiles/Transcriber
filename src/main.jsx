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
import LeftNavigation from "./components/navigation/left/LeftNavigation";
import CalendarWidget from "./components/calendar-widget/CalendarWidget"
import RightNavigation from "./components/navigation/right/RightNavigation";
import DashboardHeader from "./components/dashboard-header/DashboardHeader";
import TextEditor from "./components/text-editor/TextEditor"
import MetricWidgets from "./components/widgets/MetricWidgets"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <RightNavigation/>
    <DashboardHeader/>
    <LeftNavigation/> */}
    {/* <MetricWidgets/> */}
    {/* <TextEditor/> */}
    {/* <CalendarWidget/> */}

  </React.StrictMode>
);

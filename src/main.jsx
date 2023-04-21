/**
 * @file main.jsx
 *
 * @description Serves as the primary entry point component for the application
 * tasked with the responsibility to render the initial component along with hooking
 * itself into the index HTML document which allows it to asynchronously render
 * each update
 *
 * @requires react
 * @requires react-dom/client
 * @requires ./App
 */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import DashboardHeader from "./components/DashboardHeader/DashboardHeader";
import MetricWidgets from "./components/widgets/MetricWidgets";
import NavigationLeft from "./components/navigation/left/NavigationLeft";
import TextEditor from "./components/text-editor/TextEditor";
import AudioControlPanel from "./components/AudioRecorder/AudioRecorder";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<AudioControlPanel />
	</React.StrictMode>
);

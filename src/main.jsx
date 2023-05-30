/**
 * @file main.jsx
 *
 * @description Responsible for rendering the following components on the
 * initial render of the application.
 *
 * @requires App
 * @requires react
 * @requires react-dom/client
 */

import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

createRoot(document.getElementById("root")).render(
        <App />
);

/**
 * @file Home.jsx
 *
 * @description This component is responsible for rendering the dashboard UI
 *
 * @requires react
 * @requires home.module.scss
 *
 * @exports Home
 */

import React, { useState } from "react";
import styles from "./home.module.scss";
// import left navigation and right navigation

/**
 * Responsible for assembling the dashboard, and exporting it to App.jsx
 *
 * @returns {JSX.Element} that resembles the dashboard
 */
const Home = () => {
  return (
    <>
      <h1>Welcome To The Dashboard</h1>
    </>
  );
};

export default Home;

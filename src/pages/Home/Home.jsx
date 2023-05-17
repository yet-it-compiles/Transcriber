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
import LeftNavBar from "../../components/navigation/new-left/LeftNavBar";
import Dashboard from "../../components/dashboard/Dashboard";
import RightNavBar from "../../components/navigation/new-right/RightNavBar";

/**
 * Responsible for assembling the dashboard, and exporting it to App.jsx
 *
 * @returns {JSX.Element} that resembles the dashboard
 */
const Home = () => {
  return (
    <div className={styles.container}>
      <LeftNavBar />
      <Dashboard />
      <RightNavBar />
    </div>
  );
};

export default Home;

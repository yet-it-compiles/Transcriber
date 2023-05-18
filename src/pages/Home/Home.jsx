/**
 * @file Home.jsx
 *
 * @description This component is responsible for constructing the Dashboard
 * component from its related components.
 *
 * @requires react
 * @requires LeftNavBar
 * @requires RightNavBar
 * @requires home.module.scss
 *
 * @exports Home
 */

import React from "react";
import styles from "./home.module.scss";
import LeftNavBar from "../../components/navigation/left/LeftNavBar";
import Dashboard from "../../components/dashboard/Dashboard";
import RightNavBar from "../../components/navigation/right/RightNavBar";
import WeatherCalendar from "../../components/widgets/weather-calendar/WeatherCalendar";

/**
 * Renders the Dashboard, and centers it on the screen
 *
 * @returns {JSX.Element} The component representing the Dashboard
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

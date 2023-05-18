/**
 * @file RightNavBar.jsx
 *
 * @description
 *
 * @requires react
 * @requires RightNavBar.module.scss
 *
 * @exports RightNavBar
 */

import React, { useState } from "react";
import styles from "./right-nav.module.scss";
import WeatherCalendar from "../../widgets/weather-calendar/WeatherCalendar";

/**
 * Responsible for
 *
 * Accomplished by
 *
 * @returns {JSX.Element} -
 */
const RightNavBar = () => {
  return (
    <div className={styles.rightNavBar}>
      <WeatherCalendar />;
    </div>
  );
};

/**
 * Responsible for
 *
 * Accomplished by
 *
 * @returns {JSX.Element} -
 */
const ComponentName = () => {
  return <></>;
};

export default RightNavBar;

/**
 * @file DisplayAnalytics.jsx
 *
 * @description This function is responsible for rendering the analytics page
 * that displays the analytics of the current transcript.
 *
 * @requires react
 * @requires analytics.module.scss
 *
 * @exports Analytics
 */

import React from "react";
import styles from "./analytics.module.scss";

/**
 * @TODO - Was only implemented as a valid route for routing users
 *
 * Responsible for rendering the analytics page
 *
 * @returns {JSX.Element} The component that displays the analytics page
 */
const Analytics = () => {
  return (
    <div className={styles.analyticsContainer}>
      <h1>Displays Analytics</h1>
    </div>
  );
};
export default Analytics;

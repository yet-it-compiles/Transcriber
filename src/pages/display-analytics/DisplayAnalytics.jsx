/**
 * @file DisplayAnalytics.jsx
 *
 * @description This component is responsible for constructing the Analytics
 * page from its related components.
 *
 * @requires react
 * @requires Analytics
 * @requires LeftNavBar
 * @requires RightNavBar
 * @requires display-analytics.module.module.scss
 *
 * @exports Analytics
 */

import React from "react";
import styles from "./display-analytics.module.scss";
import LeftNavBar from "../../components/navigation/left/LeftNavBar";
import Analytics from "../../components/analytics/analytics";
import RightNavBar from "../../components/navigation/right/RightNavBar";

/**
 * Renders the analytics page and centers it on the screen
 *
 * @returns {JSX.Element} The component representing the analytics page
 */
const DisplayAnalytics = () => {
  return (
    <div className={styles.analyticsContainer}>
      <LeftNavBar />
      <Analytics />
      <RightNavBar />
    </div>
  );
};

export default DisplayAnalytics;

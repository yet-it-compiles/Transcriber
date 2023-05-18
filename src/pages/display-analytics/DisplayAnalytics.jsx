/**
 * @file Analytics.jsx
 *
 * @description This component is responsible for constructing the analytics
 * page
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

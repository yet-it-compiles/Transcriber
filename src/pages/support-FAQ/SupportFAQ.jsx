/**
 * @file SupportFAQ.jsx
 *
 * @description This file is responsible for constructing the Support and FAQ
 * page of the application.
 *
 * @requires react
 * @requires support.module.scss
 *
 * @exports SupportFAQ
 */

import React from "react";
import styles from "./support.module.scss";
import DisplaySupport from "../../components/support/DisplaySupport";
import LeftNavBar from "../../components/navigation/left/LeftNavBar";
import RightNavBar from "../../components/navigation/right/RightNavBar";

/**
 * Responsible for organizing and constructing the FAQ page within the application
 *
 * @returns {JSX.Element} an element representing the Support and FAQ page
 */
const SupportFAQ = () => {
  return (
    <div className={styles.supportContainer}>
      <LeftNavBar />
      <DisplaySupport />
      <RightNavBar />
    </div>
  );
};

export default SupportFAQ;

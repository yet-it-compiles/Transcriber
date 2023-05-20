/**
 * @file Settings.jsx
 *
 * @description This component is responsible for constructing the setting page
 * and rendering it
 *
 * @requires react
 * @requires Settings.module.css
 *
 * @exports Settings
 */

import React from "react";
import styles from "./settings.module.scss";
import LeftNavBar from "../../components/navigation/left/LeftNavBar";
import DisplaySettings from "../../components/settings/DisplaySettings";
import RightNavBar from "../../components/navigation/right/RightNavBar";

/**
 * Renders the Settings page and centers it on the screen
 *
 * @returns {JSX.Element} The component that represents the Settings page
 */
const Settings = () => {
  return (
    <div className={styles.settings}>
      <LeftNavBar />
      <DisplaySettings />
      <RightNavBar />
    </div>
  );
};

export default Settings;

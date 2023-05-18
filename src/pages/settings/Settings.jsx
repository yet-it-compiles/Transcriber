/**
 * @file SettingsPage.jsx
 *
 * @description This file is responsible for constructing the settings page
 * from its related components.
 *
 * @requires react
 * @requires settings.module.scss
 *
 * @exports Settings
 */

import React from "react";
import styles from "./settings.module.scss";
import LeftNavBar from "../../components/navigation/left/LeftNavBar";
import RightNavBar from "../../components/navigation/right/RightNavBar";

/**
 * Renders the Settings page and centers it on the screen
 *
 * @returns {JSX.Element} The component that represents the Settings page
 */
const Settings = () => {
  return (
    <>
      <LeftNavBar />
      <h1>Settings Page</h1>
      <RightNavBar />
    </>
  );
};

export default Settings;

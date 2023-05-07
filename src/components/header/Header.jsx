/**
 * @file DashboardHeader.jsx
 *
 * @description Responsible for rendering the header section for Dashboard.jsx
 * and is a critical component to the overall applications ux design.
 *
 * The component renders the 'Dashboard Overview' and defines the 'Import file',
 * 'Quick notes', and 'Quick record' buttons as well as the drop down metrics
 * overview for their daily / monthly usage and expenses.
 *
 * @requires react
 * @requires react-icons
 * @requires header.module.scss
 *
 * @exports DashboardHeader
 */

import React from "react";
import styles from "./header.module.scss";
import { GiNotebook } from "react-icons/gi";
import { FaMicrophoneAlt } from "react-icons/fa";
import { AiOutlineDownload } from "react-icons/ai";

/**
 * Creates the dashboard heading layout, along with providing various buttons
 *
 * @returns {JSX.Element} Used on the Dashboard.jsx as its header
 */
const Header = () => {
  return (
    <header className={styles.headerContainer}>
      <p className={styles.fucked}>Dashboard Overview</p>

      <button type="button">
        <AiOutlineDownload />
        Import File
      </button>

      <button type="button" name="notes">
        <GiNotebook />
        Quick Notes
      </button>

      <button type="button" name="record">
        <FaMicrophoneAlt />
        Quick Record
      </button>

      <select>
        <option value="option1">Todays Statistics</option>
        <option value="option2">This Months Statistics</option>
      </select>
    </header>
  );
};

export default Header;

/**
 * @file NavigationLeft.jsx
 *
 * @description This file is responsible for rendering and the left navigation
 * pane that stays persistent through the applications routing.
 *
 * @requires react
 * @requires react-icons
 * @requires navigation-left.module.css
 *
 * @exports LeftNavigation
 */

import React, { useState } from "react";
import styles from "./left-nav.module.css";
import { FaLongArrowAltRight } from "react-icons/fa";
import { GiArchiveResearch, GiConversation } from "react-icons/gi";
import { RxDividerVertical } from "react-icons/rx";
import {
  FcEditImage,
  FcHome,
  FcCalendar,
  FcStatistics,
  FcSettings,
  FcAudioFile,
} from "react-icons/fc";
import { BsSunrise, BsMoonStars } from "react-icons/bs";

/**
 * This component is responsible for rendering the left navigation panel on the
 * dashboard
 *
 * @returns {jsx Element} representing the left navigation panel
 */
const LeftNavigation = () => {
  return (
    <nav className={styles.navigationLeft}>
      <Branding />
      <TranscriptSearch />
      <Links />
      <div>
        <ToggleSwitch />
        <UserProfile />
      </div>
    </nav>
  );
};

/**
 * Renders the projects name, and logo to the top of the left navigation menu
 *
 * @returns {JSX.Element} representing the right project branding section
 */
const Branding = () => {
  return (
    <div className={styles.branding}>
      <img src="/project-logo.svg" alt="Project Logo" />
      <p>SLP</p>
      <p>Scribe</p>
    </div>
  );
};

/**
 * This component is responsible for rendering the transcription search input
 *
 * @returns {JSX.Element} representing the input search to find a transcription
 */
const TranscriptSearch = () => {
  return (
    <div className={styles.search}>
      <div>
        <GiArchiveResearch />
        <RxDividerVertical />
      </div>
      <label htmlFor="search-input" />
      <input
        type="text"
        id="search-input"
        placeholder="Search for transcript..."
      />
      <button>
        <FaLongArrowAltRight />
      </button>
    </div>
  );
};

/**
 *  This function provides the ability for a user to view different pages that
 * they can navigate to.
 *
 * @returns {JSX.Element} navigation bar that will route users to different pages
 */
const Links = () => {
  return (
    <nav className={styles.routingLinks}>
      <ul>
        <li>
          <FcHome />
          Dashboard
        </li>

        <li>
          <GiConversation />
          Conversations
        </li>

        <li>
          <FcEditImage />
          Text Editor
        </li>

        <li>
          <FcAudioFile />
          Record
        </li>

        <li>
          <FcCalendar />
          Calendar
        </li>

        <li>
          <FcStatistics />
          Analytics
        </li>

        <li>
          <FcSettings />
          Settings
        </li>
      </ul>
    </nav>
  );
};

/**
 * A functional component that provides the user the ability to toggle light
 * mode and dark mode
 *
 * @returns {JSX.Element} representing a toggle switch
 */
const ToggleSwitch = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
  };
  return (
    <div className={styles.toggle}>
      {isDarkMode ? <BsMoonStars /> : <BsSunrise />}
      {isDarkMode ? <p>Dark Mode</p> : <p>Light Mode</p>}
      <input type="checkbox" onClick={handleToggle} />
    </div>
  );
};

/**
 * A functional component the handles the rendering of the user profile
 *
 * @returns {JSX.Element} representing a user profile
 */
const UserProfile = () => {
  return (
    <section className={styles.profile}>
      <div>
        <p>Jane Doe</p>
        <p>jane.doe@gmail.com</p>
      </div>
      {/* <button type="submit"></button> */}
    </section>
  );
};

export default LeftNavigation;

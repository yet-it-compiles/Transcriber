/**
 * @file LeftNavBar.jsx
 *
 * @description
 *
 * @requires react
 * @requires LeftNavBar.module.scss
 *
 * @exports LeftNavBar
 */

import React, { useState } from "react";
import styles from "./new-left-nav.module.scss";

import { CiMicrophoneOn } from "react-icons/ci";
import { CgScreen } from "react-icons/cg";
import { BsToggle2On } from "react-icons/bs";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { RxDividerVertical } from "react-icons/rx";
import { GiArchiveResearch } from "react-icons/gi";
import { FaLongArrowAltRight } from "react-icons/fa";
import { FcHome, FcStatistics, FcReadingEbook } from "react-icons/fc";
import { FcVoicePresentation, FcElectricalSensor } from "react-icons/fc";

/**
 * Declares the avaliable pages to navigate to within the application.
 *
 * This is accomplished by giving it a unique identifier to efficiently update,
 * an associated icon, name, and path to navigate to.
 */
const APPLICATION_PAGES = [
  { id: 1, icon: <FcHome />, name: "Dashboard", path: "/dashboard" },
  {
    id: 2,
    icon: <FcElectricalSensor />,
    name: "Start Recording",
    path: "/recording",
  },
  {
    id: 3,
    icon: <FcReadingEbook />,
    name: "Edit Transcripts",
    path: "/editor",
  },
  { id: 4, icon: <FcStatistics />, name: "View Analytics", path: "/analytics" },
  {
    id: 5,
    icon: <FcVoicePresentation />,
    name: "Support / FAQ",
    path: "/support",
  },
];

/**
 * This component is responsible for rendering the left navigation panel on the
 * dashboard
 *
 * @returns {JSX.Element} representing the left navigation panel
 */
const LeftNavBar = () => {
  return (
    <div className={styles.leftNavBar}>
      <Branding />
      <TranscriptSearch />
      <NavigationList />
      <AudioControls />
    </div>
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
      <p>SLP </p>
      <p>Scribe</p>
      <span className={styles.collapsed}>
        <HiOutlineArrowNarrowRight />
      </span>
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
 * This function provides the ability for a user to view different pages that
 * they can navigate to.
 *
 * @returns {JSX.Element} navigation bar that will route users to different pages
 */
const NavigationList = () => {
  const [activePage, setActivePage] = useState(APPLICATION_PAGES[0]);

  const handleSetActive = (pageName) => {
    const newActive = APPLICATION_PAGES.find((page) => page.name === pageName);
    setActivePage(newActive);
  };

  return (
    <nav className={styles.navLinks}>
      <ul>
        {APPLICATION_PAGES.map((eachPage) => (
          <li
            key={eachPage.id}
            className={
              activePage.name === eachPage.name
                ? styles.activeLink
                : styles.navLink
            }
            onClick={() => handleSetActive(eachPage.name)}
          >
            {eachPage.icon}
            {eachPage.name}
          </li>
        ))}
      </ul>
    </nav>
  );
};

const AudioControls = () => {
  return (
    <div className={styles.miniAudioContainer}>
      <CiMicrophoneOn />
      <CgScreen />
      <BsToggle2On />
    </div>
  );
};

export default LeftNavBar;

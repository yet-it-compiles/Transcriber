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
import styles from "./left-nav.module.scss";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

import { FiLogOut } from "react-icons/fi";
import { CgScreen } from "react-icons/cg";
import { FiSettings } from "react-icons/fi";
import { BsToggle2On } from "react-icons/bs";
import { CiMicrophoneOn } from "react-icons/ci";
import { RxDividerVertical } from "react-icons/rx";
import { GiArchiveResearch } from "react-icons/gi";
import { FcVoicePresentation } from "react-icons/fc";
import { FaLongArrowAltRight, FaMicrophoneAlt } from "react-icons/fa";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { FcHome, FcStatistics, FcReadingEbook } from "react-icons/fc";


/**
 * @description
 * Declares the avaliable pages to navigate to within the application.
 *
 * This is accomplished by giving it a unique identifier to efficiently update,
 * an associated icon, name, and path to navigate to.
 */
const APPLICATION_PAGES = [
  // {
  //   id: 1,
  //   icon: <FcHome />,
  //   name: "Dashboard",
  //   path: "/home",
  // },
  {
    id: 1,
    icon: <FaMicrophoneAlt />,
    name: "Start Recording",
    path: "/start-recording",
  },
  {
    id: 2,
    icon: <FcReadingEbook />,
    name: "Edit Transcripts",
    path: "/editor",
  },
  {
    id: 3,
    icon: <FcStatistics />,
    name: "View Analytics",
    path: "/display-analytics",
  },
  {
    id: 4,
    icon: <FcVoicePresentation />,
    name: "Support / FAQ",
    path: "/support-FAQ",
  },
  {
    id: 5,
    icon: <FiSettings />,
    name: "Settings",
    path: "/settings",
  },
];

/**
 * This component is responsible for rendering the left navigation panel on the
 * dashboard
 *
 * @returns {JSX.Element} representing the left navigation panel
 */
const LeftNavBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <div
      className={
        isCollapsed
          ? `${styles.leftNavBar} ${styles.collapsed}`
          : `${styles.leftNavBar}`
      }
    >
      <Branding onCollapse={handleCollapse} isCollapsed={isCollapsed} />
      {!isCollapsed && <TranscriptSearch />}
      {!isCollapsed && <NavigationList />}
      {!isCollapsed && <AudioControls />}
      {!isCollapsed && <LogOut />}
    </div>
  );
};

/**
 * Renders the projects name, and logo to the top of the left navigation menu
 *
 * @returns {JSX.Element} representing the right project branding section
 */
const Branding = ({ onCollapse, isCollapsed }) => {
  return (
    <div className={styles.branding}>
      <img src="/project-logo.svg" alt="Project Logo" />
      <p>SLP </p>
      <p>Scribe</p>

      <button
        className={isCollapsed ? `${styles.isFlipped}` : `${styles.collapsed}`}
        onClick={onCollapse}
      >
        {<HiOutlineArrowNarrowRight />}
      </button>
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
 

  return (
    <nav className={styles.navLinks}>
      <ul>
        {APPLICATION_PAGES.map((eachPage) => ( 
          <li
            key={eachPage.id}
            className={
              window.location.pathname == eachPage.path
                ? styles.activeLink
                : styles.navLink
            }
          >
            <Link to={eachPage.path}>
              {eachPage.icon}
              {eachPage.name}
            </Link>
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

const LogOut = () => {
  const { signout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = (event) => {
    event.preventDefault();

    signout()
      .then((response) => {
        //console.log(response);
        //alert('You have been logged out. Press Ok to be redirected to login page.')
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <button className={styles.logoutButton} onClick={handleLogout}>
      <FiLogOut size={25} />
    </button>
  );
};

export default LeftNavBar;

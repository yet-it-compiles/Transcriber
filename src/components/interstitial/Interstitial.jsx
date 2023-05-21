/**
 * @file Screen.jsx
 *
 * @description This component is responsible for creating the intermediate
 * screen that asks the user what they would like to do on the recording screen.
 *
 * @requires react
 * @requires interstitial.module.scss
 *
 * @exports Interstitial
 */

import React from "react";
import { BsSoundwave } from "react-icons/bs";
import { AiOutlineRead } from "react-icons/ai";
import { MdOutlineLiveTv } from "react-icons/md";
import styles from "./interstitial.module.scss";

/**
 * Responsible for rendering the transitional screen
 *
 * @returns {JSX.Element} Resembling an nterstitial screen
 */
const Interstitial = () => {
  return (
    <div className={styles.screenContainer}>
      <h1>What Would You Like To Do? </h1>
      <InterstitialOptions />
    </div>
  );
};

const InterstitialOptions = () => {
  const pageOptions = [
    {
      id: 1,
      icon: <BsSoundwave />,
      name: "Record Audio",
    },
    {
      id: 2,
      icon: <AiOutlineRead />,
      name: "Upload to View",
    },
    {
      id: 3,
      icon: <MdOutlineLiveTv />,
      name: "Record w/ Live Transcription",
    },
  ];

  return (
    <>
      <p>
        {pageOptions.map((eachOption, eachIndex) => (
          <aside key={eachIndex} className={styles.eachOption}>
            <span>{eachOption.icon}</span>
            <span>{eachOption.name}</span>
          </aside>
        ))}
      </p>
    </>
  );
};

export default Interstitial;

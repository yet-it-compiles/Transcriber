/**
 * @file Record.jsx
 *
 * @description This file is responsible for constructing the Start Recording
 * page from its related components.
 *
 * @requires react
 * @requires LeftNavBar
 * @requires RightNavBar
 * @requires AudioRecorder
 * @requires Record.module.css
 *
 * @exports Record
 */

import React from "react";
import styles from "./record.module.scss";
import LeftNavBar from "../../components/navigation/left/LeftNavBar";
import AudioRecorder from "../../components/audio-recorder/AudioRecorder";
import RightNavBar from "../../components/navigation/right/RightNavBar";
import Interstitial from "../../components/interstitial/Interstitial";

/**
 * Renders the Start Recording page and centers it on the screen

 * @returns {JSX.Element} The component that represents the Start Recording page
 */
const StartRecording = () => {
  return (
    <div className={styles.recordContainer}>
      <LeftNavBar />
      <Interstitial />
      {/* <AudioRecorder /> */}
      <RightNavBar />
    </div>
  );
};

export default StartRecording;

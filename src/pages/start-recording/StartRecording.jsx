/**
 * @file Record.jsx
 *
 * @description This file is responsible for constructing the recording page
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

/**
 * Responsible for rendering the recording page
 *
 * @returns {JSX.Element}
 */
const StartRecording = () => {
  return (
    <div className={styles.recordContainer}>
      <LeftNavBar />
      <AudioRecorder />
      <RightNavBar />
    </div>
  );
};

export default StartRecording;

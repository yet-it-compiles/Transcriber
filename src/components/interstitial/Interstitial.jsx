/**
 * @file Interstitial.jsx
 *
 * @description This component is responsible for creating the intermediate
 * screen that asks the user what they would like to do on the recording screen.
 *
 * @requires react
 * @requires interstitial.module.scss
 *
 * @exports Interstitial
 */
import React, { useState } from "react";
import { BsSoundwave } from "react-icons/bs";
import { AiOutlineRead } from "react-icons/ai";
import { MdOutlineLiveTv } from "react-icons/md";
import styles from "./interstitial.module.scss";

import Uploader from "../uploader/Uploader";
import Transcriber from "../transcriber/Transcriber";
import AudioRecorder from "../audio-recorder/AudioRecorder";

/**
 * @component Interstitial
 *
 * @description responsible for rendering the transitional screen
 *
 * @returns {JSX.Element} Resembling an interstitial screen
 */
const Interstitial = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [showOptions, setShowOptions] = useState({
    option: false,
    currentTime: 0,
    file: false,
  });

  /**
   * @component handlePageRender
   *
   * @description responsible for rendering the correct page based off the users
   * selection
   */
  const handlePageRender = () => {
    switch (selectedOption) {
      case "Record Audio":
        return <AudioRecorder setShowOptions={setShowOptions} />;
      case "Upload to View":
        return <Uploader />;
      case "Record w/ Live Transcription":
        return <h2>Feature Coming Soon!</h2>;

      default:
        return <InterstitialOptions setSelectedOption={setSelectedOption} />;
    }
  };

  return (
    <div className={styles.interContainer}>
      <h1>{selectedOption ? "" : "What Would You Like To Do?"}</h1>
      {handlePageRender()}

      {showOptions.file ? (
        <Transcriber
          apiToken={import.meta.env.VITE_AUTHORIZATION_1}
          fileData={showOptions.file}
          currentTime={showOptions.currentTime}
        />
      ) : (
        ""
      )}
    </div>
  );
};

/**
 * @object pageOptions
 *
 * @description Responsible for containing the possible options the user has
 * when navigating to the Start Recording page.
 *
 * @return an object containing the avaliable page options the user can navigate
 * to
 */
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

/* const pageOptionsMinor = [
  {
    id: 1,
    icon: <BsSoundwave />,
    name: "Listen to Transcript",
  },
  {
    id: 2,
    icon: <AiOutlineRead />,
    name: "Edit Transcript In Editor",
  },
]; */

/**
 * @component InterstitialOptions
 *
 * @description responsible for rendering the avaliable features the user can access at on
 * the navigated page. This acts as a interstitial for the application.
 *
 * @param {boolean} setSelectedOption the selected transcription feature the user requests
 *
 * @returns {JSX.Element} resembling each transcription option
 */
const InterstitialOptions = ({ setSelectedOption }) => {
  return (
    <div className={styles.interOptionsContainer}>
      {pageOptions.map((eachOption) => (
        <aside
          key={eachOption.id}
          className={styles.eachOption}
          onClick={() => setSelectedOption(eachOption.name)}
        >
          <p>{eachOption.icon}</p>
          <p>{eachOption.name}</p>
        </aside>
      ))}
    </div>
  );
};

export default Interstitial;

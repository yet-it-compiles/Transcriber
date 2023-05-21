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

import React, { useState } from "react";
import { BsSoundwave } from "react-icons/bs";
import { AiOutlineRead } from "react-icons/ai";
import { MdOutlineLiveTv } from "react-icons/md";
import styles from "./interstitial.module.scss";

import AudioRecorder from "../audio-recorder/AudioRecorder";
import Uploader from "../uploader/Uploader";

/**
 * Responsible for rendering the transitional screen
 *
 * @returns {JSX.Element} Resembling an nterstitial screen
 */
const Interstitial = () => {
  const [selectedOption, setSelectedOption] = useState("");

  return (
    <div className={styles.screenContainer}>
      <h1>What Would You Like To Do? {selectedOption} </h1>

      {selectedOption == "Record Audio" ? (
        <AudioRecorder />
      ) : selectedOption == "Upload to View" ? (
        <Uploader />
      ) : selectedOption == "Record w/ Live Transcription" ? (
        <h1>Feature Coming Soon!</h1>
      ) : (
        <InterstitialOptions userOption={setSelectedOption} />
      )}

      {/* {viewTranscription && (
        <div className={styles.fileChange}>
          <input type="file" onChange={handleFileChange} />

          {documentState.data && (
            <Transcriber
              apiToken={import.meta.env.VITE_AUTHORIZATION_1}
              fileData={documentState.data}
              currentTime={recordingState.currentTime}
            />
          )}
        </div>
      )}

     */}
    </div>
  );
};

const pageOptions = [
  {
    id: 1,
    icon: <BsSoundwave />,
    name: "Record New Audio",
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

const pageOptionsMinor = [
  {
    id: 1,
    icon: <BsSoundwave />,
    name: "View Transcript",
  },
  {
    id: 2,
    icon: <AiOutlineRead />,
    name: "Edit Transcript In Editor",
  },
];

const InterstitialOptions = ({ userOption }) => {
  return (
    <>
      <p>
        {pageOptions.map((eachOption, eachIndex) => (
          <aside
            key={eachIndex}
            className={styles.eachOption}
            onClick={() => userOption(eachOption.name)}
          >
            <span>{eachOption.icon}</span>
            <span>{eachOption.name}</span>
          </aside>
        ))}
      </p>
    </>
  );
};

export default Interstitial;

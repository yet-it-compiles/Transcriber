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
import AudioRecorder from "../audio-recorder/AudioRecorder";

/**
 * Responsible for rendering the transitional screen
 *
 * @returns {JSX.Element} Resembling an interstitial screen
 */
const Interstitial = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const handlePageRender = () => {
    switch (selectedOption) {
      case "Record Audio":
        return <AudioRecorder />;
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

const pageOptionsMinor = [
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
];

/**
 * Responsible for rendering the avaliable features the user can access at on
 * the navigated page. This acts as a interstitial for the application.
 *
 * @param {userOption} param1 the selected transcription feature the user requests
 *
 * @returns {JSX.Element} Resembling each transcription option
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

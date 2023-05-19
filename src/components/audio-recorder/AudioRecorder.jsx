/**
 * @file AudioRecorder.jsx
 *
 * @description This module is responsible for providing the audio recording,
 * playback, and download functionality. Additionally, this is where the audio
 * is captured, to be s
 *
 * @requires react
 * @requires react-icons
 * @requires MediaPlayer
 * @requires record.module.scss
 *
 * @exports MakeRecording
 */

import React, { useState, useEffect, useRef } from "react";
import styles from "./record.module.scss";
import MediaPlayer from "../media-player/MediaPlayer";
import Transcriber from "../transcriber/Transcriber";

import { FaMicrophoneAlt } from "react-icons/fa";

/**
 * Allow the user to record audio from their mic and playback the recording, and
 * download it as a .wav file.
 *
 * This is accomplished by initializing the dynamic values of the recording
 * features, and then request audio recording permissions from the browser. The
 * function has many performance improvements, that help with both memory
 * consumption and rerendering.
 *
 * @returns {JSX.Element} representing an audio recorder
 */
const MakeRecording = () => {
  const audioRef = useRef();
  const mediaRecorderRef = useRef();

  const [error, setError] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlobURL, setAudioBlobURL] = useState(null);
  const [recordingDuration, setRecordingDuration] = useState(0);

  const [showOptions, setShowOptions] = useState(false);
  const [saveRecording, setSaveRecording] = useState(false);
  const [viewTranscription, setViewTranscription] = useState(false);
  const [fileData, setFileData] = useState(null);

  const [currentTime, setCurrentTime] = useState(0);

  const handleFileChange = (event) => {
    setFileData(event.target.files[0]);
  };

  let apiToken = import.meta.env.VITE_AUTHORIZATION_1;

  /**
   * Handles updating the error state and presents the message to the user
   * @param {error} error represents the error the user is experiencing
   */
  const handleError = (error) => {
    setIsRecording(false);
    setError(`Failed to start recording: ${error.message}`);
  };

  /**
   * Requests access to the users microphone and allows them to record audio.
   *
   * This is accomplished by creating an audioStream and mediaRecorder which
   * allows the user to record audio. The audio is then captured, chunked and
   * assigned to an object URL [blob:http:]
   */
  const startRecording = async () => {
    try {
      // Ensures the audio is captured directly from the microphone
      const audioStream = await navigator.mediaDevices.getUserMedia({
        audio: { capture: true },
      });

      const capturedRecordings = [];
      const mediaRecorder = new MediaRecorder(audioStream);
      let startTime = Date.now();

      mediaRecorder.ondataavailable = ({ data }) => {
        capturedRecordings.push(data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(capturedRecordings);
        setAudioBlobURL(URL.createObjectURL(blob));
        setAudioBlob(blob);
        setRecordingDuration(Math.floor((Date.now() - startTime) / 1000));
        setShowOptions(true);
      };

      setIsRecording(true);
      mediaRecorder?.start();
      mediaRecorderRef.current = mediaRecorder;
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    return () => {
      if (isRecording && mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
      }
    };
  }, [isRecording]);

  /**
   * Callback that handles stopping the audio recording by toggling the state
   */
  const stopRecording = () => {
    setIsRecording(false);
    mediaRecorderRef.current?.stop();
  };

  /**
   * Callback function that handles downloading the audio file to the users
   * default downlaods location
   */
  const downloadAudio = () => {
    const downloadLink = document.createElement("a");
    downloadLink.href = audioBlobURL;
    downloadLink.download = "recorded_audio.wav";
    downloadLink.click();
  };

  /**
   * Callback function that handles providing the different options for the user
   * to choose after recording the audio.
   *
   * @param {option} option Choice of what to do with the audio transcription
   */
  const handleRecordingOption = (option) => {
    setShowOptions(false);
    downloadAudio();
    if (option === "view") {
      setViewTranscription(true);
    } else if (option === "edit") {
      setSaveRecording(true);
    }
  };

  return (
    <div className={styles.recordingContainer}>
      {isRecording ? (
        <RecordingInProgress stopRecording={stopRecording} />
      ) : (
        <NotListening startRecording={startRecording} />
      )}

      {audioBlobURL && (
        <audio
          ref={audioRef}
          src={audioBlobURL}
          onError={(event) => console.error("Error playing audio:", event)}
        />
      )}

      {showOptions && (
        <div className={styles.optionsContainer}>
          <h2>What Would You Like To Do?</h2>
          <button onClick={() => handleRecordingOption("view")}>
            View Transcript
          </button>
          <button onClick={() => handleRecordingOption("edit")}>
            Edit In Text Editor
          </button>
        </div>
      )}

      {viewTranscription && (
        <div>
          <input type="file" onChange={handleFileChange} />
          {fileData && (
            <Transcriber
              apiToken={apiToken}
              fileData={fileData}
              currentTime={currentTime}
            />
          )}
        </div>
      )}

      <MediaPlayer
        audioBlobURL={audioBlobURL}
        audioRef={audioRef}
        recordingDuration={recordingDuration}
        currentTime={currentTime}
        setCurrentTime={setCurrentTime}
      />
    </div>
  );
};

/**
 * This component is responsible for rendering the animated listening ellipsis,
 * that jump on the screen when the user is recording.
 *
 * @param {stopRecording} param0 a bool value representing the current state
 * of the recorder
 *
 * @returns animated ellipsis that animate when a recording is in progress
 */
const RecordingInProgress = ({ stopRecording }) => (
  <div>
    <h2>
      Listening
      <span className={styles.dotsContainer}>
        {[...Array(3)].map((_, i) => (
          <span key={i} className={styles.dots}></span>
        ))}
      </span>
    </h2>
    <button onClick={stopRecording}>
      <FaMicrophoneAlt className={`${styles.isRec}`} />
    </button>
  </div>
);

/**
 * This component is responsible for prompting the user to click on the
 * microphone icon to start a recording.
 *
 * @param {startRecording} param0 react-icon displaying a microphone
 *
 * @returns page introduction text and an interactable react-icon to start
 * recording
 */
const NotListening = ({ startRecording }) => (
  <div className={styles.isNotListening}>
    <h2>Please click the microphone when you're ready to start a recording</h2>
    <button onClick={startRecording}>
      <FaMicrophoneAlt className={`${styles.isNotRec} `} />
    </button>
  </div>
);

export default MakeRecording;

/**
 * @file AudioRecorder.jsx
 *
 * @description Provides audio recording and playback functionality for the
 * entire application. Accomplished by captuing the audio using MediaDevices API,
 * encodes the audio as a Blob object and finally creates an object URL.
 *
 * @requires react
 * @requires react-icons
 * @requires record.module.scss
 *
 * @exports MakeRecording
 */

import React, { useState, useEffect, useRef } from "react";
import styles from "./record.module.scss";
import MediaPlayer from "../media-player/MediaPlayer";
import { FaMicrophoneAlt } from "react-icons/fa";

/**
 * @component
 *
 * @description This component is responsible for rendering Audio Recorder.
 *
 * This is accomplished by initializing the dynamic values of the recording
 * features, and then request audio recording permissions from the browser. The
 * function has many performance improvements, that help with both memory
 * consumption and rerendering.
 *
 * @returns {JSX.Element} representing an audio recorder
 */
const MakeRecording = ({ setShowOptions }) => {
  const audioRef = useRef();
  const mediaRecorderRef = useRef();

  const [error, setError] = useState(null);
  const [recordingState, setRecordingState] = useState({
    isRecording: false,
    audioBlob: null,
    audioBlobURL: null,
    currentTime: 0,
    recordingDuration: 0,
    saveRecording: false,
  });

  /**
   * Handles updating the error state and presents the message to the user
   *
   * @param {error} error represents the error the user is experiencing
   */
  const handleError = (error) => {
    setRecordingState((prevState) => ({
      ...prevState,
      isRecording: false,
    }));
    setError(`Failed to start recording: ${error.message}`);
  };

  /* ! DELETE */
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setRecordingState((prevState) => {
      const newState = {
        ...prevState,
        audioBlob: file,
        audioBlobURL: URL.createObjectURL(file),
      };
      return newState;
    });
  };

  /**
   * @function
   *
   * @description Requests access to the users microphone and allows them to
   * record audio. This is accomplished by creating an audioStream and
   * mediaRecorder which allows the user to record audio. The audio is then
   * captured, chunked and assigned to an object URL [blob:http:]
   */
  const startRecording = async () => {
    try {
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

        setRecordingState((prevState) => ({
          ...prevState,
          audioBlob: blob,
          audioBlobURL: URL.createObjectURL(blob),
          recordingDuration: Math.floor((Date.now() - startTime) / 1000),
        }));

        setShowOptions((prevOptions) => ({
          ...prevOptions,
          file: blob,
        }));
      };

      setRecordingState((prevState) => ({
        ...prevState,
        isRecording: true,
      }));

      mediaRecorder?.start();
      mediaRecorderRef.current = mediaRecorder;
    } catch (error) {
      handleError(error);
    }
  };

  /**
   * @useEffect
   *
   * @description useEffect hook used to run side effects that handle stopping
   * the recording when the component unmounts, or when isRecording changes to false.
   */
  useEffect(() => {
    return () => {
      if (recordingState.isRecording && mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
      }
    };
  }, [recordingState.isRecording]);

  /**
   * @stateUpdaterFunction
   *
   * @description Tasked with updating the components recording state by using
   * its previous state, and specifically updating isRecording to false.
   */
  const stopRecording = () => {
    setRecordingState((prevState) => ({
      ...prevState,
      isRecording: false,
    }));
    mediaRecorderRef.current?.stop();
  };

  return (
    <div className={styles.recordingContainer}>
      {recordingState.isRecording ? (
        <RecordingInProgress stopRecording={stopRecording} />
      ) : (
        <NotListening startRecording={startRecording} />
      )}

      {recordingState.audioBlobURL && (
        <audio
          ref={audioRef}
          src={recordingState.audioBlobURL}
          onError={(playbackError) =>
            console.error("Error playing audio:", playbackError)
          }
        />
      )}

      <MediaPlayer
        audioBlobURL={recordingState.audioBlobURL}
        audioRef={audioRef}
        recordingDuration={recordingState.recordingDuration}
        currentTime={recordingState.currentTime}
        setTime={setRecordingState}
      />
    </div>
  );
};

/**
 * @component
 *
 * @description Responsible for rendering the animated jumping ellipsis that
 * play when the user is actively recording.
 *
 * @param {boolean} stopRecording the current state of stopRecording
 *
 * @returns {JSX.Element} resembling the animated ellipsis to signal the
 * application is currently recording
 */
const RecordingInProgress = ({ stopRecording }) => (
  <div>
    <p>
      Listening
      <span className={styles.dotsContainer}>
        {[...Array(3)].map((_, i) => (
          <span key={i} className={styles.dots}></span>
        ))}
      </span>
    </p>

    <button onClick={stopRecording}>
      <FaMicrophoneAlt className={`${styles.isRec}`} />
    </button>
  </div>
);

/**
 * @component
 *
 * @description Responsible for rendering the prompt notifying the user to click
 * on the microphone to begin recording.
 *
 * @param {boolean} startRecording react-icon displaying a microphone
 *
 * @returns {JSX.Element} page introduction text and an interactable react-icon to start
 * recording
 */
const NotListening = ({ startRecording }) => (
  <>
    <h2>Please click the microphone when you're ready to start a recording</h2>
    <button onClick={startRecording}>
      <FaMicrophoneAlt className={`${styles.isNotRec} `} />
    </button>
  </>
);

export default MakeRecording;

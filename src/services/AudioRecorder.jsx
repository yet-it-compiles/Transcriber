/**
 * @file AudioRecorder.jsx
 *
 * @description This module is responsible for allowing the application to connect
 * to the users microphone, and provide them the ability to play, pause, skip,
 * and adjust the volume of the applications audio playback.
 *
 * @requires react
 * @requires MediaRecorder
 *
 * @exports AudioRecorder
 */

import React, { useState, useRef } from "react";
import MediaPlayer from "../components/media-player/MediaPlayer";
import { FaMicrophoneAlt } from "react-icons/fa";
import styles from "../pages/record/record.module.scss";

/**
 * Handles the functionality to allow the user to record audio from their mic,
 * and playback the recording, and download it as a .wav file.
 *
 * This is accomplished by initializing the dynamic values of the recording
 * features, and then request audio recording permissions from the browser. The
 * function has many performance improvements, that help with both memory
 * consumption and rerendering.
 *
 * @returns {JSX.Element} representing an audio recorder
 */
const AudioRecorder = () => {
  const audioRef = useRef();
  const mediaRecorderRef = useRef();

  const [audioBlob, setAudioBlob] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlobURL, setAudioBlobURL] = useState(null);
  const [recordingDuration, setRecordingDuration] = useState(0);

  /**
   * Requests access to the browsers microphone, and sets the primary mic as
   * the requested target. Once the data is retrieved, we efficiently chunk
   * it and assign it an object URL
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

      // captures the audio recording
      mediaRecorder.ondataavailable = ({ data }) => {
        capturedRecordings.push(data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(capturedRecordings);
        setAudioBlobURL(URL.createObjectURL(blob));
        setAudioBlob(blob);
        setRecordingDuration(Math.floor((Date.now() - startTime) / 1000));
      };

      setIsRecording(true);
      mediaRecorder?.start();
      mediaRecorderRef.current = mediaRecorder;
    } catch (error) {
      setIsRecording(false);
      throw new Error("Failed to start recording:", error);
    }
  };

  /**
   * Callback that handles the ability to let a user stop the recording by
   * accessing the mediaRecorderRef switching its value to false.
   */
  const stopRecording = () => {
    setIsRecording(false);
    mediaRecorderRef.current?.stop();
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

      <MediaPlayer
        audioBlobURL={audioBlobURL}
        audioRef={audioRef}
        audiBlob={audioBlob}
        recordingDuration={recordingDuration}
      />

      {/* <button onClick={startRecording} disabled={isRecording}>
        {isRecording ? "Recording..." : "Start Recording"}
      </button>

      <button onClick={stopRecording} disabled={!isRecording}>
        Stop Recording
      </button>

      <button onClick={playRecording} disabled={!audioBlobURL}>
        Play Recording
      </button>

      <button onClick={downloadRecording} disabled={!audioBlob}>
        Download
      </button> */}
    </div>
  );
};

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
      <FaMicrophoneAlt className={styles.isRec} />
    </button>
  </div>
);

const NotListening = ({ startRecording }) => (
  <div className={styles.isNotListening}>
    <h2>Please click the microphone when you're ready to start a recording</h2>
    <button onClick={startRecording}>
      <FaMicrophoneAlt className={styles.isNotRec} />
    </button>
  </div>
);

export default AudioRecorder;

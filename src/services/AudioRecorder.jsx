/**
 * @file AudioRecorder.jsx
 *
 * @description Handles the responsibility of initializing various
 * tools to effectively manage audio data along with
 * providing recording, and playback features.
 *
 * @requires react
 * @requires DisplayTranscription
 *
 * @exports AudioRecorder
 */

import React, { useState, useRef, useCallback } from "react";
import DisplayTranscription from "./DisplayTranscription";



/**
 * Defines the ability to start recording audio from the users browser, and
 * initializes various values to manage audio data.
 *
 * Accomplished by prompting the user for permission, and
 * initializing chunking mechanisms that help with breaking down large data
 */
const AudioRecorder = () => {
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioBlobURL, setAudioURL] = useState(null);
  const [fileURL, setFileURL] = useState(null);

  const mediaRecorderRef = useRef();
  const audioRef = useRef();

  const handleStartRecording = useCallback(async () => {
    try {
      // Prompts the user for media permission
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);

      // Allows the ability to record media data
      mediaRecorderRef.current = mediaRecorder;

      const chunks = [];

      mediaRecorder.ondataavailable = (event) => chunks.push(event.data);

      mediaRecorder.onstop = async () => {
        setAudioBlob(new Blob(chunks));
        setAudioURL(URL.createObjectURL(new Blob(chunks)));
        const formData = new FormData();
        formData.append("file", new Blob(chunks), "audioRecording.wav");
        const response = await fetch("https://file.io", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        setFileURL(data.link);
        console.log("File URL:", data.link);
      };

      mediaRecorder.start();

      setRecording(true);
    } catch (error) {
      console.error("Attempting to start the recording.", error);
      setRecording(false);
    }
  }, []);

	const handleStopRecording = useCallback(() => {
		setRecording(false);
		mediaRecorderRef.current?.stop();
	}, []);

	const handlePlayRecording = useCallback(() => {
		if (audioBlobURL) {
			audioRef.current.onerror = (event) => {
				console.error("Error playing audio:", event);
			};
			audioRef.current.onloadedmetadata = (event) => {
				audioRef.current.play();
			};
			audioRef.current.src = audioBlobURL;
		}
	}, [audioBlobURL]);

  const handleDownload = useCallback(() => {
    if (audioBlob) {
      const url = URL.createObjectURL(audioBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "audioRecording.wav";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  }, [audioBlob]);

  return (
    <>
      <button onClick={handleStartRecording} disabled={recording}>
        {recording ? "Recording..." : "Start Recording"}
      </button>

      <button onClick={handleStopRecording}>Stop Recording</button>

      <button onClick={handlePlayRecording}>Play Recording</button>

      <button onClick={handleDownload} disabled={!audioBlob}>
        Download
      </button>

      {fileURL && (
        <div>
          <p>File URL: {fileURL}</p>
          <a href={fileURL} target="_blank" rel="noopener noreferrer">
            Open file
          </a>
        </div>
      )}

      <audio src={audioBlobURL} ref={audioRef} />

			{console.log("This is the audio blob", audioBlob)}
      <DisplayTranscription audioLink={fileURL} />
    </>
	);
}

export default AudioRecorder;

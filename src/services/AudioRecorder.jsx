/**
 * @file AudioRecorder.jsx
 *
 * @description
 * Handles the responsibility of initializing various tools to
 * effectively manage
 * audio data along with providing recording, and
 *
 * @requires DisplayTranscription
 * @requires react
 *
 * @exports AudioRecorder
 */

import DisplayTranscription from "./DisplayTranscription";
import React, { useState, useRef, useCallback } from "react";

/**
 * Provides the applications ability to allow users to control
 * audio playback in various ways along with establishing
 * mechanisms to deal with audio data
 *
 * @returns A simple JSX layout of buttons to allow a user to
 * control limited audio settings.
 */
function AudioRecorder() {
	const [recording, setRecording] = useState(false);
	const [audioBlob, setAudioBlob] = useState(null);
	const [audioBlobURL, setAudioURL] = useState(null);
	const mediaRecorderRef = useRef();
	const audioRef = useRef();

	/**
	 * Defines the ability to start recording audio from the
	 * users browser, and initializes various values to manage
	 * audio data.
	 *
	 * Accomplished by prompting the user for permission, and
	 * initializing
	 * chunking mechanisms that help with breaking down large
	 * data.
	 */
	const handleStartRecording = useCallback(async () => {
		try {
			// Prompts user for media/audio permission
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
			const mediaRecorder = new MediaRecorder(stream);
			const chunks = [];

			// Initializes a render persistent recorder
			mediaRecorderRef.current = mediaRecorder;
			mediaRecorder.ondataavailable = (event) => chunks.push(event.data);

			// Starts breaking down the blob by chunks for efficient packaging
			mediaRecorder.onstop = () => {
				setAudioBlob(new Blob(chunks));
				setAudioURL(URL.createObjectURL(new Blob(chunks)));
			};

			mediaRecorder.start();
			setRecording(true);
		} catch (error) {
			console.error(
				"Error: Attempted to start recoding but process was terminated:",
				error
			);
			console.error(MediaRecorder.isTypeSupported("audio/webm")); // true
			console.error(MediaRecorder.isTypeSupported("audio/ogg")); // false
			console.error(MediaRecorder.isTypeSupported("audio/wav")); // false
			console.error(MediaRecorder.isTypeSupported("audio/aac")); // false
			console.error(MediaRecorder.isTypeSupported("audio/x-aiff")); // false
			console.error(MediaRecorder.isTypeSupported("audio/x-mpegurl")); // false
			console.error(MediaRecorder.isTypeSupported("audio/x-pn-realaudio")); // false
			console.error(MediaRecorder.isTypeSupported("audio/x-wav")); // false
			setRecording(false);
		}
	}, []);

	/**
	 * Provides the ability to pause/stop the audio sources
	 */
	const handleStopRecording = useCallback(() => {
		setRecording(false);
		mediaRecorderRef.current?.stop();
	}, []);

	/**
	 * Provides the ability to playback audio sources
	 */
	const handlePlayRecording = useCallback(() => {
		if (audioBlobURL) {
			audioRef.current.onerror = (event) => {
				console.error("Error: Audio unable to play:", event);
			};
			audioRef.current.onloadedmetadata = () => {
				audioRef.current.play();
			};
			audioRef.current.src = audioBlobURL;
		}
	}, [audioBlobURL]);

	/**
	 * Simple button layout that gives limited control over
	 * the audio playback
	 */
	return (
		<>
			<button onClick={handleStartRecording} disabled={recording}>
				{recording ? "Recording..." : "Start Recording"}
			</button>

			<button onClick={handleStopRecording} disabled={!recording}>
				Stop Recording
			</button>

			<button onClick={handlePlayRecording} disabled={recording}>
				Play Recording
			</button>

			{/*<DisplayTranscription theAudioBlob={audioBlob} /> */}

			{/* Displays audio controls */}
			<audio src={audioBlobURL} ref={audioRef} />
		</>
	);
}

export default AudioRecorder;

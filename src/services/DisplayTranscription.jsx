//import dotenv from "dotenv";
//dotenv.config();

/**
 * @file DisplayTranscription.jsx
 *
 * @description
 * Handles the responsibility of converting the most recent
 * recorded AudioBlob
 * to a temporary public URL, and sends it as a HTTP POST to
 * be transcribed
 *
 * @requires react
 * @requires axios
 * @requires dotenv
 * @requires dotenv.config
 *
 * @exports DisplayTranscription
 */

import React, { useState } from "react";
import axios from "axios";

/**
 * Provides the ability to submit the most recently recorded
 * audio clip, and
 * request it to be transcribed in real time.
 *
 * @param {theAudioBlob} param0 Audio object that represents
 * binary audio data
 *
 * @returns Single submission button that sends an audio file
 * to be transcribed
 */
const DisplayTranscription = ({ theAudioBlob }) => {
	const [transcription, setTranscription] = useState("");

	/**
	 * Converts the AudioBlob into a temporary public URL that
	 * is sent to the transcription API
	 *
	 * Accomplished by converting the binary audio object to
	 * form data, and then append the information in a
	 * specified format
	 */
	const handleGetTranscription = async () => {
		try {
			const formData = new FormData();
			formData.append("file", theAudioBlob, "audio/wav");

			// !Initializes a temporary public URL that upon any interaction is destroyed.
			const uploadResponse = await axios.post(
				process.env.REACT_APP_UPLOAD,
				formData,
				{
					headers: {
						Authorization: process.env.REACT_APP_AUTHORIZATION_1,
					},
				}
			);

			// Event listener for transcript submission request
			const assemblyAIResponse = await axios.post(
				process.env.transcribe,
				{
					audio_url: uploadResponse.data.upload_url,
				},
				{
					headers: {
						authorization: process.env.REACT_APP_AUTHORIZATION_1,
						"Content-Type": "application/json",
					},
				}
			);

			// Polls the API every 3 seconds checking on the status of the delivered transcript.
			let pollingIntervalId = setInterval(async () => {
				const pollingResponse = await axios.get(
					`https://api.assemblyai.com/v2/transcript/${assemblyAIResponse.data.id}`,
					{
						headers: {
							authorization: process.env.REACT_APP_AUTHORIZATION_1,
						},
					}
				);
				if (pollingResponse.data.status === "completed") {
					clearInterval(pollingIntervalId);
					setTranscription(pollingResponse.data.text);
				}
			}, 3000);
		} catch (error) {
			console.error(
				"Error occurred while attempting to fetch the transcript:",
				error
			);
		}
	};

	/**
	 * JSX button that will submit the currently tracked
	 * AudioBlob to be the API to be transcribed.
	 *
	 * @returns Single button that submits the
	 */
	return (
		<>
			<button onClick={handleGetTranscription}>Get Transcription</button>
			{transcription && <p>Transcription: {transcription}</p>}
		</>
	);
};

export default DisplayTranscription;

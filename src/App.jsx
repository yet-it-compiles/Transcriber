/**
 * @file App.jsx
 *
 * @description Serves as the root component of the application that contains all
 * other components along with managing the applications state. Will initialize
 * the primary UI features.
 *
 * @requires react
 * @requires ./AudioRecorder
 */

import React from "react";
import AudioRecorder from "./services/AudioRecorder";

/**
 * - @TODO
 * @returns Simple JSX button layout to provide recording, and
 * playback features
 */
function App() {
	return (
		<>
			<AudioRecorder />
		</>
	);
}

export default App;

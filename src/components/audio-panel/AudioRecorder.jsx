/**
 * @file AudioRecorder.jsx
 *
 * @description
 *
 * @requires react
 * @requires react-player
 * @requires audio-panel.module.css
 *
 * @exports AudioPanel
 */

import Reacts from "react";
import ReactPlayer from "react-player";
import styles from "./audio-panel.module.css";

/**
 *
 * @returns
 */
const AudioPanel = () => {
	return (
		<div className={styles.container}>
			<div className={styles.playerWrapper}>
				<ReactPlayer
					url="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
					controls
				/>
			</div>
		</div>
	);
};

export default AudioPanel;

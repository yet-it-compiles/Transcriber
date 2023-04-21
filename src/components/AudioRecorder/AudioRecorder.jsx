import React, { useState } from "react";
import ReactPlayer from "react-player";
import styles from "./audio-recorder.module.css";

const AudioControlPanel = () => {
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

export default AudioControlPanel;

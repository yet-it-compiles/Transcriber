import React, { useState, useCallback, useMemo } from "react";
import ReactPlayer from "react-player";
import styles from "./audio-panel.module.css";

const AudioPanel = () => {
	const [duration, setDuration] = useState(0);
	const [volume, setVolume] = useState(0.5);
	const [playbackRate, setPlaybackRate] = useState(1);

	const handleDuration = (duration) => {
		setDuration(duration);
	};

	const handleVolumeChange = (event) => {
		setVolume(parseFloat(event.target.value));
	};

	const handlePlaybackRateChange = (event) => {
		setPlaybackRate(parseFloat(event.target.value));
	};

	return (
		<div className={styles.container}>
			<div className={styles.playerWrapper}>
				<ReactPlayer
					url="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
					controls
					onDuration={handleDuration}
					volume={volume}
					playbackRate={playbackRate}
				/>
				<Controls
					duration={duration}
					volume={volume}
					playbackRate={playbackRate}
					onVolumeChange={handleVolumeChange}
					onPlaybackRateChange={handlePlaybackRateChange}
				/>
			</div>
		</div>
	);
};

const Controls = ({
	duration,
	volume,
	playbackRate,
	onVolumeChange,
	onPlaybackRateChange,
}) => {
	return (
		<div className={styles.controls}>
			<div className={styles.controlGroup}>
				<p>Duration: {duration.toFixed(2)} seconds</p>
			</div>

			<div className={styles.controlGroup}>
				<label htmlFor="playbackRate">Playback Rate:</label>
				<select
					id="playbackRate"
					name="playbackRate"
					value={playbackRate}
					onChange={onPlaybackRateChange}
				>
					<option value="0.5">0.5x</option>
					<option value="1">1x</option>
					<option value="1.5">1.5x</option>
					<option value="2">2x</option>
				</select>
			</div>
		</div>
	);
};

export default AudioPanel;

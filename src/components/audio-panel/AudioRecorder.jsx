import React, { useState, useCallback, useMemo } from "react";
import ReactPlayer from "react-player";
import styles from "./audio-panel.module.css";

const AudioPanel = () => {
	const [duration, setDuration] = useState(0);
	const [volume, setVolume] = useState(0.5);
	const [playbackRate, setPlaybackRate] = useState(1);
	const [isPlaying, setIsPlaying] = useState(false);

	const handleDuration = useCallback((duration) => {
		setDuration(duration);
	}, []);

	const handleVolumeChange = useCallback((event) => {
		setVolume(parseFloat(event.target.value));
	}, []);

	const handlePlaybackRateChange = useCallback((event) => {
		setPlaybackRate(parseFloat(event.target.value));
	}, []);

	const handlePlay = useCallback(() => {
		setIsPlaying(true);
	}, []);

	const handlePause = useCallback(() => {
		setIsPlaying(false);
	}, []);

	const durationInSeconds = useMemo(() => {
		return Math.floor(duration);
	}, [duration]);

	return (
		<div className={styles.container}>
			<div className={styles.playerWrapper}>
				<ReactPlayer
					url="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
					controls
					onDuration={handleDuration}
					volume={volume}
					playbackRate={playbackRate}
					onPlay={handlePlay}
					onPause={handlePause}
				/>
				<div className={styles.controls}>
					<p>Duration: {durationInSeconds} seconds</p>

					<input
						type="range"
						id="volume"
						name="volume"
						min="0"
						max="1"
						step="0.01"
						onChange={handleVolumeChange}
					/>
					<label htmlFor="playbackRate">Playback Rate:</label>
					<select
						id="playbackRate"
						name="playbackRate"
						value={playbackRate}
						onChange={handlePlaybackRateChange}
					>
						<option value="0.5">0.5x</option>
						<option value="1">1x</option>
						<option value="1.5">1.5x</option>
						<option value="2">2x</option>
					</select>
				</div>
			</div>
			<div
				className={`${styles.waveform} ${isPlaying ? styles.playing : ""}`}
			/>
		</div>
	);
};

export default AudioPanel;

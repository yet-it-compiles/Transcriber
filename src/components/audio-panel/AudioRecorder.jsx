import React, { useState, useMemo } from "react";
import ReactPlayer from "react-player";
import styles from "./audio-panel.module.css";

const PLAYBACK_RATES = [0.5, 1, 1.5, 2];
const DEFAULT_PLAYBACK_RATE = PLAYBACK_RATES[1];

const AudioPanel = () => {
	const [duration, setDuration] = useState(0);
	const [volume, setVolume] = useState(0.5);
	const [playbackRate, setPlaybackRate] = useState(DEFAULT_PLAYBACK_RATE);
	const [isPlaying, setIsPlaying] = useState(false);

	const durationInSeconds = useMemo(() => Math.floor(duration), [duration]);

	const handleDuration = (duration) => {
		setDuration(duration);
	};

	const handleVolumeChange = (event) => {
		setVolume(event.target.value);
	};

	const handlePlaybackRateChange = (event) => {
		setPlaybackRate(event.target.value);
	};

	const handlePlay = () => {
		setIsPlaying(true);
	};

	const handlePause = () => {
		setIsPlaying(false);
	};

	const { container, playerWrapper, controls, waveform, playing } = styles;

	return (
		<div className={container}>
			<div className={playerWrapper}>
				<ReactPlayer
					url="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
					controls
					onDuration={handleDuration}
					volume={volume}
					playbackRate={playbackRate}
					onPlay={handlePlay}
					onPause={handlePause}
				/>
				<div className={controls}>
					<p>Duration: {durationInSeconds} seconds</p>
					<label htmlFor="playbackRate">Playback Rate:</label>
					<select
						id="playbackRate"
						name="playbackRate"
						value={playbackRate}
						onChange={handlePlaybackRateChange}
					>
						{PLAYBACK_RATES.map((rate) => (
							<option key={rate} value={rate}>
								{rate}x
							</option>
						))}
					</select>
				</div>
			</div>
			<div className={`${waveform} ${isPlaying ? playing : ""}`} />
		</div>
	);
};

export default AudioPanel;

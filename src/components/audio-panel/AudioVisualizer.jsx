import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import "./audio-visualizer.css";

function MediaControlPanel() {
	const [isPlaying, setIsPlaying] = useState(false);
	const [isRecording, setIsRecording] = useState(false);
	const [progress, setProgress] = useState(0);

	const togglePlayPause = () => {
		setIsPlaying(!isPlaying);
	};

	const toggleRecording = () => {
		setIsRecording(!isRecording);
	};

	const handleProgressChange = (event) => {
		setProgress(event.target.value);
	};

	return (
		<div className="media-control-panel">
			<div className="playback-controls">
				<button className="record-button" onClick={toggleRecording}>
					<i className={isRecording ? "fa fa-stop-circle" : "fa fa-circle"}></i>
				</button>

				<button className="previous-button">
					<i className="fa fa-step-backward"></i>
				</button>
				<button
					className={isPlaying ? "pause-button" : "play-button"}
					onClick={togglePlayPause}
				>
					<i className={isPlaying ? "fa fa-pause" : "fa fa-play"}></i>
				</button>
				<button className="next-button">
					<i className="fa fa-step-forward"></i>
				</button>
			</div>
			<div className="volume-controls">
				{/* <button className="volume-up-button">
					<i className="fa fa-volume-up"></i>
				</button> */}
				<button className="volume-down-button">
					<i className="fa fa-volume-down"></i>
				</button>
			</div>
			<div className="song-info">
				<div className="song-title">Song Title</div>
				<div className="song-artist">Artist Name</div>
			</div>
			<div className="progress-bar">
				<input
					type="range"
					min="0"
					max="100"
					value={progress}
					onChange={handleProgressChange}
					className="slider"
				/>
			</div>
		</div>
	);
}

export default MediaControlPanel;

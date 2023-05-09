/**
 * @file MediaRecorder.jsx
 *
 * @description This file is responsible for rendering the media player that
 * allow the user to fast-forward, rewind, play, pause, and download the audio.
 *
 * @requires react
 * @requires react-icons
 * @requires media-recorder.module.scss
 *
 * @exports MediaPlayerUI
 */

import React, { useState, useCallback, useEffect } from "react";
import styles from "./player.module.scss";
import { AiOutlineFastForward } from "react-icons/ai";
import {
  BsVolumeDownFill,
  BsFillVolumeUpFill,
  BsFillVolumeMuteFill,
} from "react-icons/bs";
import { FaPlayCircle, FaPauseCircle } from "react-icons/fa";
import { FcVideoFile, FcDownload } from "react-icons/fc";

const MediaPlayerUI = ({ audioBlobURL, audioRef, recordingDuration }) => {
  const [volume, setVolume] = useState(25);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPlace, setCurrentPlace] = useState(0);
  const [title, setTitle] = useState("Set Audio Name");

  useEffect(() => {
    const audio = audioRef.current || new Audio(audioBlobURL);

    const handleTimeUpdate = () => {
      setCurrentPlace(audio.currentTime);
    };
    const handleAudioEnded = () => {
      setIsPlaying((prev) => !prev);
      setCurrentPlace(0);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleAudioEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [audioBlobURL, volume]);

  const playRecording = useCallback(() => {
    if (!audioBlobURL) return;
    setIsPlaying((prev) => !prev);

    const audio = audioRef.current || new Audio(audioBlobURL);

    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
    audioRef.current = audio;
  }, [audioBlobURL, volume]);

  const downloadRecording = () => {
    const link = document.createElement("a");
    link.href = audioBlobURL;
    link.download = "NEW_recorded_audio.wav";
    link.click();
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleVolumeChange = (event) => {
    setVolume(parseInt(event.target.value, 10));
  };

  return (
    <div className={styles.mediaPlayer}>
      <div className={styles.MetaData}>
        <FcVideoFile className={styles.icons} />
        <p>
          {title}
          <br />
          05/09/2023
        </p>
      </div>

      <div className={styles.audioControls}>
        <button type="submit">
          <AiOutlineFastForward className={styles.flip} />
        </button>

        {isPlaying ? (
          <button onClick={playRecording}>
            <FaPauseCircle className={styles.transitional} />
          </button>
        ) : (
          <button onClick={playRecording}>
            <FaPlayCircle />
          </button>
        )}

        <button type="submit">
          <AiOutlineFastForward />
        </button>

        <div className={styles.progress}>
          <div className={styles.current}>{formatTime(currentPlace)}</div>
          <div className={`${styles.progressBar} ${styles.progressMoved}`}>
            <div
              className={`${styles.progressAnimation} ${styles.isActive}`}
              style={{
                width: `${(currentPlace / recordingDuration) * 100}%`,
              }}
            />
          </div>
        </div>
        <div className={styles.total}>{formatTime(recordingDuration)}</div>
      </div>

      <div className={styles.volumeControl}>
        {volume <= 1 ? (
          <BsFillVolumeMuteFill onClick={() => setVolume(45)} />
        ) : volume < 50 ? (
          <BsVolumeDownFill onClick={() => setVolume(100)} />
        ) : volume >= 50 ? (
          <BsFillVolumeUpFill onClick={() => setVolume(0)} />
        ) : (
          <BsFillVolumeMuteFill onClick={() => setVolume(25)} />
        )}

        <div className={styles.sliderContainer}>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
          />
        </div>
      </div>

      <button type="submit" onClick={downloadRecording}>
        <FcDownload />
      </button>
    </div>
  );
};

export default MediaPlayerUI;

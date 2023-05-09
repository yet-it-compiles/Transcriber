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

import React, { useState, useCallback, useMemo } from "react";
import styles from "./player.module.scss";
import { AiOutlineFastForward } from "react-icons/ai";
import {
  BsVolumeDownFill,
  BsFillVolumeUpFill,
  BsFillVolumeMuteFill,
} from "react-icons/bs";
import { FaPlayCircle, FaPauseCircle } from "react-icons/fa";
import { FcVideoFile, FcDownload } from "react-icons/fc";

const MediaPlayerUI = ({
  audioBlobURL,
  audioRef,
  audioBlob,
  recordingDuration,
}) => {
  const [volume, setVolume] = useState(25);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPlace, setCurrentPlace] = useState(0);

  /**
   * Callback that handles the ability for the user to play the recording by
   * using the audioBlobURL to create an audio element.
   */
  const playRecording = useCallback(() => {
    if (!audioBlobURL) return;
    setIsPlaying((prev) => !prev);

    const audio = audioRef.current || new Audio(audioBlobURL);
    audio.volume = volume / 100; // Set the volume based on the slider value

    audio.addEventListener("timeupdate", () => {
      setCurrentPlace(audio.currentTime);
    });

    if (audio.paused) {
      audio.play();
    } else {
      setIsPlaying((prev) => !prev);
      audio.pause();
    }

    audioRef.current = audio;

    return () => {
      audio.removeEventListener("timeupdate", () => {
        setCurrentPlace(audio.currentTime);
      });
    };
  }, [audioBlobURL]);

  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const downloadURL = useCallback(() => {
    if (!audioBlob) return null;
    return URL.createObjectURL(audioBlob);
  }, [audioBlob]);

  const downloadRecording = useMemo(() => {
    if (!audioBlob) return null;
    return () => {
      const link = document.createElement("a");
      link.href = downloadURL();
      link.download = "audioRecording.wav";
      link.click();
    };
  }, [audioBlob, downloadURL]);

  return (
    <div className={styles.mediaPlayer}>
      <div className={styles.MetaData}>
        <FcVideoFile className={styles.icons} />
        <p>
          Audio File #1 <br />
          05/01/2023
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

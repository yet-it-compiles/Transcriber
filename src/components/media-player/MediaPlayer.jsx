/**
 * @file MediaRecorder.jsx
 *
 * @description This file is responsible for rendering the media player that
 * allow the user to fast-forward, rewind, play, pause, and download the audio.
 *
 * @requires react
 * @requires react-icons
 * @requires player.module.scss
 *
 * @exports MediaPlayerUI
 */

import React, { useState, useCallback, useEffect } from "react";
import styles from "./player.module.scss";
import { FcVideoFile } from "react-icons/fc";
import { AiOutlineFastForward } from "react-icons/ai";
import { FaPlayCircle, FaPauseCircle } from "react-icons/fa";
import {
  BsVolumeDownFill,
  BsFillVolumeUpFill,
  BsFillVolumeMuteFill,
} from "react-icons/bs";

/**
 * This component is responsible for rendering the audio player UI that provides
 * the interface for the user to interact with the audio player.
 *
 * @param {audioBlobURL} param1
 * @param {audioRef} param2
 * @param {recordingDuration} param3
 * @param {currentTime} param4
 * @param {setTime} param5
 *
 * @returns The media player component that resembles an audio player
 */
const MediaPlayerUI = ({
  audioBlobURL,
  audioRef,
  recordingDuration,
  currentTime,
  setTime,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [title, setTitle] = useState("Set Audio Name");

  useEffect(() => {
    const audio = audioRef.current || new Audio(audioBlobURL);

    /**
     * Callback that handles updating the progress counter
     */
    const handleTimeUpdate = () => {
      setTime((prevState) => ({
        ...prevState,
        currentTime: audio.currentTime,
      }));
    };

    /**
     * Callback that handles ensuring correct state of play/pause and reset time
     */
    const handleAudioEnded = () => {
      setIsPlaying(false);
      setTime((prevState) => ({
        ...prevState,
        currentTime: 0,
      }));
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleAudioEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleAudioEnded);
    };
  }, [audioBlobURL]);

  /**
   * Callback function that allows the audio to be played
   */
  const playRecording = useCallback(() => {
    if (!audioBlobURL) return;
    setIsPlaying((prev) => !prev);

    const audio = audioRef.current || new Audio(audioBlobURL);

    if (audio.paused) {
      audio.play();
    } else {
      setIsPlaying();
      audio.pause();
    }
    audioRef.current = audio;
  }, [audioBlobURL]);

  /**
   * Callback function that takes in the time, and formats it to resemble the
   * audio on a timer
   *
   * @param {time} time the amount of time that has passed
   *
   * @returns a formatted string that represents the current time of the audio
   */
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className={styles.mediaPlayer}>
      <div className={styles.MetaData}>
        <FcVideoFile className={styles.icons} />
        <p>
          {title}
          <br />
          05/20/2023
        </p>
      </div>

      <div className={styles.audioControls}>
        <button>
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

        <button>
          <AiOutlineFastForward />
        </button>

        <div className={styles.progress}>
          <div className={styles.current}>{formatTime(currentTime)}</div>
          <div className={`${styles.progressBar} ${styles.progressMoved}`}>
            <div
              className={`${styles.progressAnimation} ${styles.isActive}`}
              style={{
                width: `${(currentTime / recordingDuration) * 100}%`,
              }}
            />
          </div>
        </div>
        <div className={styles.total}>{formatTime(recordingDuration)}</div>
      </div>

      <VolumeControl />
    </div>
  );
};

const VolumeControl = () => {
  const [volume, setVolume] = useState(25);

  /**
   * Callback function that handles the ability to change the volume
   *
   * @param {event} volume represents the value of the volume
   */
  const handleVolumeChange = (newVolume) => {
    setVolume(parseInt(newVolume.target.value, 10));
  };

  return (
    <>
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
      </div>

      <div className={styles.sliderContainer}>
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={handleVolumeChange}
        />
        {/* className={sliderContainer} */}
      </div>
    </>
  );
};

export default MediaPlayerUI;

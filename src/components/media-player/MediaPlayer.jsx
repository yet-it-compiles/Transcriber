/**
 * @file MediaRecorder.jsx
 *
 * @description This file is responsible for rendering the media UI that enables
 * the user to play, pause, and download any media type.
 *
 * @requires react-icons
 * @requires media-recorder.module.css
 *
 * @exports MediaPlayerUI
 */

import React, { useState, useRef, useEffect, useCallback } from "react";
import styles from "./player.module.css";
import { AiOutlineFastForward } from "react-icons/ai";
import {
    BsFillVolumeMuteFill,
    BsVolumeDownFill,
    BsFillVolumeUpFill,
} from "react-icons/bs";
import { FaPlayCircle, FaPauseCircle } from "react-icons/fa";
import { FcVideoFile, FcDownload } from "react-icons/fc";

/**
 * Responsible for rendering a media player UI that allows the user to play,
 * pause, skip, and download the media file.
 *
 * Accomplished by declaring a useEffect that will update the timer each second
 * until the duration of the file has been hit. Then establishes the minor player
 * values through the use of callback functions.
 *
 * @returns [JSX.Element] Bottom covering media player
 */
const MediaPlayerUI = () => {
    const [volume, setVolume] = useState(25);
    const [duration, setDuration] = useState(20);
    const [currentTime, setCurrentTime] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const timerRef = useRef(null);

    /**
     * Declares a useEffect that will update the timer every second from 0.00 to
     * the duration of the file it's playing.
     */
    useEffect(() => {
        if (isPlaying) {
            timerRef.current = setInterval(() => {
                setCurrentTime((currentTime) => {
                    if (currentTime < duration) {
                        return currentTime + 1;
                    } else {
                        setIsPlaying(false);
                        return currentTime;
                    }
                });
            }, 1000);
        } else {
            clearInterval(timerRef.current);
        }

        return () => {
            clearInterval(timerRef.current);
        };
    }, [isPlaying, duration]);

    /**
     * Handles the ability to play and pause the audio by changing bool value
     */
    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    /**
     * Handles the ability to change the volume level by a slider
     * @param {event} event The current value of the volume slider
     */
    const handleVolumeChange = (event) => {
        setVolume(event.target.value);
    };

    const handleTimeUpdate = (event) => {
        setCurrentTime(event.target.currentTime);
    };

    /**
     * Handles formatting the play time value
     * @param {number} time the time that should be rendered
     * @returns a JSX element representing a formatted timer
     */
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60)
            .toString()
            .padStart(2, "0");
        return `${minutes}:${seconds}`;
    };

    /**
     * Callback that handles the ability for the user to download the audio file
     */
    const downloadAudio = () => {
        const link = document.createElement("a");
        // Point it to what it should download: link.href =
        link.download = "recorded-audio.mp3";
        link.style.display = "none"; // hide the link
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

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

                <button
                    type="submit"
                    onClick={handlePlayPause}
                    className={`${styles.playButton} ${
                        isPlaying ? styles.isPlaying : ""
                    }`}
                >
                    {isPlaying ? (
                        <FaPauseCircle
                            className={`${styles.pauseIcon} fa-pause-circle`}
                        />
                    ) : (
                        <FaPlayCircle
                            className={`${styles.playIcon} fa-play-circle`}
                        />
                    )}
                </button>

                <button type="submit">
                    <AiOutlineFastForward />
                </button>

                <div className={styles.progress}>
                    <div className={styles.timer}>
                        {formatTime(currentTime)}
                    </div>
                    <div
                        className={`${styles.progressBar} ${styles.progressMoved}`}
                    >
                        <div
                            className={`${styles.progressAnimation} ${styles.isActive}`}
                            style={{
                                width: `${(currentTime / duration) * 100}%`,
                            }}
                        />
                    </div>
                </div>
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

            <div className={styles.download}>
                <FcDownload />
            </div>
        </div>
    );
};

export default MediaPlayerUI;
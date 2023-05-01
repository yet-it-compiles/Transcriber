import React, { useState, useRef, useEffect, useCallback } from "react";
import styles from "./media-recorder.module.css";
import { AiOutlineFastForward } from "react-icons/ai";
import {
    BsFillVolumeMuteFill,
    BsFillVolumeOffFill,
    BsVolumeDownFill,
    BsFillVolumeUpFill,
} from "react-icons/bs";
import { FaPlayCircle, FaPauseCircle } from "react-icons/fa";
import { CiMicrophoneOn, CiMicrophoneOff } from "react-icons/ci";
import { FcVideoFile, FcDownload } from "react-icons/fc";

const MediaPlayerUI = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [recordedAudio, setRecordedAudio] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0.0);
    const [volume, setVolume] = useState(75);
    const [sliderVisible, setSliderVisible] = useState(false);

    const audioRecorderRef = useRef(null);
    const audioRef = useRef(null);
    const timerRef = useRef(null);

    /**
     * Callback function that ensures the media recorder is stopped when
     * the component unmounts. Ensures the preventing of memory leaking
     */
    useEffect(() => {
        return () => {
            if (
                audioRecorderRef.current &&
                audioRecorderRef.current.state === "recording"
            ) {
                audioRecorderRef.current.stop();
            }
        };
    }, []);

    /**
     * Callback responsible for starting the audio recording functionality
     *
     * Accomplished by obtaining audio permission from the browser, creating
     * the audio recorder and starting the recording timer.
     */
    const startRecording = async () => {
        try {
            const streamRequest = await navigator.mediaDevices.getUserMedia({
                audio: true,
            });
            setIsRecording(true);
            const audioRecorder = new MediaRecorder(streamRequest);
            audioRecorderRef.current = audioRecorder;
            audioRecorder.addEventListener(
                "dataavailable",
                handleDataAvailable
            );
            audioRecorder.start();
            startTimer();
        } catch (error) {
            console.error(
                "There was an error obtaining audio permission from the browser."
            );
        }
    };

    /**
     * Callback to handle stopping the audio player
     */
    const stopRecording = () => {
        audioRecorderRef.current.stop();
        setIsRecording(false);
        stopTimer();
    };

    /**
     * Callback to handle playing back the audio player
     */
    const playAudio = () => {
        audioRef.current.play();
        setIsPlaying(true);
        startTimer();
    };

    /**
     * Callback to handling pausing the audio player
     */
    const pauseAudio = () => {
        audioRef.current.pause();
        setIsPlaying(false);
        stopTimer();
    };

    const handleChange = (event) => {
        setVolume(event.target.value);
    };

    const handleMuteClick = () => {
        setVolume(0);
    };

    const handlePlusClick = () => {
        setVolume((prevVolume) => Math.min(prevVolume + 10, 100));
    };

    const handleMinusClick = () => {
        setVolume((prevVolume) => Math.max(prevVolume - 10, 0));
    };

    const handleIconClick = () => {
        setSliderVisible(true);
    };

    /**
     * Callback responsible for capturing the audio data creating a blob object
     * as a audio/mp3 then gives the audio blob a URL to be used as an SRC
     *
     * @param {event} event
     */
    const handleDataAvailable = (event) => {
        const audioBlob = new Blob([event.data], { type: "audio/mp3" });
        setRecordedAudio(URL.createObjectURL(audioBlob));
    };

    /**
     * Callback that handles creating a timer to record the audio duration
     *
     * @param {number} intervalDuration the duration of audio
     */
    const startTimer = (intervalDuration = 1000) => {
        timerRef.current = setInterval(() => {
            setRecordingTime((prevTime) => prevTime + 1);
        }, intervalDuration);
    };

    /**
     * Callback that handles resetting the timer
     *
     * @param {*} resetTime
     */
    const stopTimer = (resetTime = false) => {
        clearInterval(timerRef.current);
        if (resetTime) {
            setRecordingTime(0.0);
        }
    };

    /**
     * Calculates the percentage of recoding for the progress bar
     * @returns
     */
    const getProgressBarWidth = () => {
        const progress = (recordingTime / 60) * 100; // set length of recording to 5 seconds
        return `${progress}%`;
    };

    /**
     * Callback that handles the ability for the user to download the audio file
     */
    const downloadAudio = () => {
        const link = document.createElement("a");
        link.href = recordedAudio;
        link.download = "recorded-audio.mp3";
        link.style.display = "none"; // hide the link
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className={styles.componentContainer}>
            <div className={styles.MetaData}>
                <FcVideoFile className={styles.icons} />
                <div>
                    {/* Change into span when variables are ready */}
                    <p>Title</p>
                    <p>04/30/2023</p>
                </div>
            </div>

            <div className={styles.MicNTimer}>
                <button
                    type="submit"
                    onClick={startRecording}
                    disabled={isRecording}
                    className={
                        isRecording
                            ? `${styles.isRecording} ${styles.midOff}`
                            : styles.isRecording
                    }>
                    {isRecording ? <CiMicrophoneOff /> : <CiMicrophoneOn />}
                </button>
                <span>{recordingTime}s</span>
            </div>

            <div className={styles.AudioControl}>
                <div>
                    <button type="submit">
                        <AiOutlineFastForward className={styles.flip} />
                    </button>

                    <button
                        onClick={isRecording ? stopRecording : playAudio}
                        disabled={
                            isRecording ? false : !recordedAudio || isPlaying
                        }>
                        {isRecording ? <FaPauseCircle /> : <FaPlayCircle />}
                    </button>

                    <button type="submit">
                        <AiOutlineFastForward />
                    </button>
                </div>

                <div className={styles.progress}>
                    <div
                        className={`${styles.progressBar} ${styles.progressMoved}`}>
                        <div
                            className={styles.progressAnimation}
                            style={{
                                width: getProgressBarWidth(),
                            }}
                        />
                    </div>
                </div>

                <audio
                    src={recordedAudio}
                    ref={audioRef}
                />
            </div>

            <div className={styles.volumeSlider}>
                <button onClick={handleIconClick}>
                    <BsFillVolumeOffFill />
                </button>
                {sliderVisible && (
                    <div className={styles.sliderContainer}>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={volume}
                            onChange={handleChange}
                            className={styles.slider}
                        />
                        <div
                            className={styles.volumeLevel}
                            style={{ height: `${volume}%` }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default MediaPlayerUI;

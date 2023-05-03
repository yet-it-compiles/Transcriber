/**
 * @file Record.jsx
 *
 * @description
 *
 * @requires react
 * @requires Record.module.css
 *
 * @exports Record
 */

import React, { useState } from "react";
import styles from "./record.module.css";
import { CiMicrophoneOn, CiMicrophoneOff } from "react-icons/ci";

/**
 * Responsible for
 *
 * Accomplished by
 *
 * @returns {JSX.Element} -
 */
const Record = () => {
    return (
        <>
            <ComponentName />
        </>
    );
};

/**
 * Responsible for handling the recording feature by providing the user the
 * ability to press the record icon.
 *
 * Accomplished by setting up an event listener waiting for the user to click
 * the record icon. Once the user clicks record, an audio wave animation starts
 * playng.
 *
 * @returns {JSX.Element} - Representing text, and a single button
 */
const ComponentName = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [showWaveAnimation, setShowWaveAnimation] = useState(false);

    const handleIsRecording = () => {
        setIsRecording((prev) => !prev);
        setShowWaveAnimation((prev) => !prev);
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.trackingInContract}>
                Please tap the record icon when you're ready
            </h1>
            <button
                className={styles.bounceInTop}
                type="submit"
                onClick={handleIsRecording}>
                <span
                    className={isRecording ? styles.recordButtonActive : null}>
                    {isRecording ? (
                        <CiMicrophoneOff className={styles.icons} />
                    ) : (
                        <CiMicrophoneOn className={styles.icons} />
                    )}
                </span>
            </button>

            {showWaveAnimation && <AudioWaveAnimation />}

            <div className={styles.conseal}></div>
        </div>
    );
};

/**
 * Generates a wave animation that will be connected to the playback audio
 *
 * @returns {JSX.Element} Representing an audio wave animation
 */
const AudioWaveAnimation = () => {
    const audioWaves = Array.from(
        { length: 20 },
        (_, eachIndex) => eachIndex + 1
    );
    return (
        <div className={styles.waveContainer}>
            {audioWaves.map((eachWave) => (
                <span
                    key={eachWave}
                    style={{
                        left: `${6 * eachWave}px`,
                        animationDelay: `${0.3 * eachWave}s`,
                    }}
                />
            ))}
        </div>
    );
};

export default Record;

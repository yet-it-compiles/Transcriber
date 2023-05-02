/**
 * @file Record.jsx
 *
 * @description
 *
 * @requires react
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
 * Responsible for
 *
 * Accomplished by
 *
 * @returns {JSX.Element} -
 */
const ComponentName = () => {
    const [isRecording, setIsRecording] = useState(false);

    const handleIsRecording = () => {
        setIsRecording((prev) => !prev);
    };

    return (
        <div className={styles.container}>
            <h1>Please tap the record icon when you're ready</h1>
            <button
                className={styles.recordButton}
                type="submit"
                onClick={handleIsRecording}
            >
                <span
                    className={isRecording ? styles.recordButtonActive : null}
                >
                    {isRecording ? (
                        <CiMicrophoneOn className={styles.icons} />
                    ) : (
                        <CiMicrophoneOff className={styles.icons} />
                    )}
                </span>
            </button>
        </div>
    );
};

export default Record;

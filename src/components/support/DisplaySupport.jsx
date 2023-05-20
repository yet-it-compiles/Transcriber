/**
 * @file DisplaySupport.jsx
 *
 * @description Renders the support page
 *
 * @requires react
 * @requires support.module.scss
 *
 * @exports DisplaySupport
 */

import React from "react";
import styles from "./support.module.scss";

/**
 * Responsible for rendering the support page for the appliction
 *
 * @returns {JSX.Element} Representing the support page
 */
const DisplaySupport = () => {
  return (
    <div className={styles.supportContainer}>
      <h2>Help Center</h2>
      <div className={styles.section}>
        <hr />
        <h3>General Questions</h3>
        <div className={styles.question}>
          <h4>How do I use the Transcription feature?</h4>
          <p>
            To use the Transcription feature, click on the Record button and
            start speaking. Once you're done, click on the Stop button to end
            the recording. The audio will be transcribed automatically.
          </p>
        </div>
        <div className={styles.question}>
          <h4>Can I edit the transcribed text?</h4>
          <p>
            Yes, you can edit the transcribed text. Simply click on the
            transcribed text and make the necessary changes.
          </p>
        </div>
      </div>
      <div className={styles.section}>
        <h3>Technical Issues</h3>
        <div className={styles.question}>
          <h4>Why is the transcription not accurate?</h4>
          <p>
            The accuracy of the transcription depends on various factors such as
            audio quality, background noise, and accents. Ensure that you have a
            clear audio input and minimize background noise for better accuracy.
          </p>
        </div>
        <div className={styles.question}>
          <h4>I'm experiencing issues with playback. What should I do?</h4>
          <p>
            If you're experiencing issues with playback, make sure your device's
            audio settings are properly configured. You can also try closing and
            reopening the application or restarting your device.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DisplaySupport;

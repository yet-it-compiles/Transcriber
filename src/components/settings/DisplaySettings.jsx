/**
 * @file SettingsPage.jsx
 *
 * @description This file is responsible for constructing the settings page
 * from its related components.
 *
 * @requires react
 * @requires display-settings.module.scss
 *
 * @exports Settings
 */

import React, { useState } from "react";
import styles from "./display-settings.module.scss";

/**
 * This component is responsible for rendering the settings page
 *
 * @returns The settings page
 */
const Settings = () => {
  return (
    <div className={styles.settingsContainer}>
      <UserSettings />
      <TranscriptionSettings />
    </div>
  );
};

/**
 * Responsible for rendering the user settings section of the settings
 * page for the application
 *
 * @returns A component resenbling the user settings section
 */
const UserSettings = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (newEmail) => {
    setEmail(newEmail.target.value);
  };

  const handlePasswordChange = (newPassword) => {
    setPassword(newPassword.target.value);
  };

  // @TODO implement save changes

  return (
    <div className={styles.userSettingsContainer}>
      <h2>User Settings</h2>
      <div className={styles.setOption}>
        <label>Email</label>
        <input type="email" value={email} onChange={handleEmailChange} />
      </div>
      <div className={styles.setOption}>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <button className="save-button">Save Changes</button>
    </div>
  );
};

/**
 * Responsible for rendering the transcription settings section of the settings
 * page for the application
 *
 * @returns A component resenbling a section on the settings page
 */
const TranscriptionSettings = () => {
  const [language, setLanguage] = useState("English");
  const [notifications, setNotifications] = useState(false);
  const [transcriptionSpeed, setTranscriptionSpeed] = useState("Normal");

  const handleNotificationToggle = () => {
    setNotifications(!notifications);
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage.target.value);
  };

  const handleTranscriptionSpeedChange = (newSpeed) => {
    setTranscriptionSpeed(newSpeed.target.value);
  };

  return (
    <div className={styles.transcriptSetContainer}>
      <h2>Transcription Settings</h2>
      <div className={styles.setOption}>
        <label>Enable Notifications</label>
        <input
          type="checkbox"
          checked={notifications}
          onChange={handleNotificationToggle}
        />
      </div>
      <div className={styles.setOption}>
        <label>Language</label>
        <select value={language} onChange={handleLanguageChange}>
          <option value="English">English</option>
          <option value="Spanish">Spanish</option>
        </select>
      </div>
      {/* Create section for all parameters that can be enabled */}
      <div className={styles.setOption}>
        <label>Transcription Speed</label>
        <select
          value={transcriptionSpeed}
          onChange={handleTranscriptionSpeedChange}
        >
          <option value="Normal">Normal</option>
          <option value="Fast">Fast</option>
          <option value="Slow">Slow</option>
        </select>
      </div>
      <button className={styles.saveBtn}>Save Changes</button>
    </div>
  );
};

export default Settings;

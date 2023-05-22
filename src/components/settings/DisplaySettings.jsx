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
import { useAuth } from "../../context/AuthContext";
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

  return (
    <div className={styles.userSettingsContainer}>
        <h2>User Settings</h2>
        <div className={styles.userSettingsFormsContainer}>
            <ChangeEmailForm/>
            <ChangePasswordForm/>
        </div>
    </div>
  );
};

const ChangePasswordForm = () => {

    const {reAuthenticate, changePassword} = useAuth();

    const [currPassword, setCurrPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");



    const handleSubmit = (event) => {
        event.preventDefault();
        reAuthenticate(currPassword)
        .then((response) => {
            console.log(response)
            if(newPassword === confirmPassword) {
                changePassword(newPassword)
                .then((res) => {
                console.log(res);
                alert('Password updated successfully')
                })
                .catch((error) => {
                console.log(error.message);
                });
            }else {
                alert('New password and confirm new password do not match')
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }

    return (
        <form onSubmit={handleSubmit} className={styles.userForm}>
            <h3>Change Password</h3>
            <input 
                type="password"
                value={currPassword}
                onChange={(event) => setCurrPassword(event.target.value)}
                placeholder="Current Password"
            />
            <input 
                type="password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                placeholder="New Password"
            />
            <input 
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="Confirm New Password"
            />
            <button type ="submit" className={styles.confirmFormButton}>Set New Password</button>
        </form>
    )
}

const ChangeEmailForm = () => {

    const {reAuthenticate, changeEmail} = useAuth();

    const [newEmail, setNewEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        reAuthenticate(password)
            .then((response) => {
                console.log(response)
                changeEmail(newEmail)
                .then((res) => {
                    console.log(res);
                    alert('email update successfully')
                })
                .catch((err) => {
                    console.log(err)
                })
            })
            .catch((error) => {
                console.log(error.message);
                alert('error updating email')
            });
    }
    

    return (

        <form onSubmit={handleSubmit} className={styles.userForm}>
            <h3>Change Email</h3>
            <input 
                type="text"
                value={newEmail}
                onChange={(event) => setNewEmail(event.target.value)}
                placeholder="New Email"
            />
            <input 
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Password"
            />
            <button type="submit" className={styles.confirmFormButton}>Set New Email</button>
        </form>
    )
}

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

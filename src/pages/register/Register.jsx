/**
 * @file Login.jsx
 *
 * @description The file is responsible for rending the login screen allowing
 * the user to login to their account using a registered username and password.
 *
 * @requires react
 * @requires useAuth
 * @requires register.scss
 *
 * @exports Login
 */

import React, { useState } from "react";
import styles from "./register.module.scss";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

/**
 * Proviles the ability to allow the user to login to their profile
 *
 * @returns a login screen with two input fields for email and password
 */
const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { register } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (confirmPassword === password) {
      register(email, password)
        .then((response) => {
          console.log(response);
          navigate("/");
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      alert("Passwords don't match");
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.overlay}>
        <h1 className={styles.welcome}>Register Now To</h1>
        <h1 className={styles.transcriber}>
          &nbsp;SLPscribe<sup className={styles.tm}>TM</sup>
        </h1>

        <h2 className={styles.motto}>
          Record Conversations
          <br />
          Analyze Articulation
        </h2>

        <form onSubmit={handleSubmit}>
          <div className={styles.fieldHolder}>
            <input
              className={`${styles.loginField} ${styles.username}`}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="text"
              required
              placeholder="Enter Email"
            />
          </div>

          <div className={styles.fieldHolder}>
            <input
              className={`${styles.loginField} ${styles.password}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
              placeholder="Password"
            />
          </div>

          <div className={styles.fieldHolder}>
            <input
              className={`${styles.loginField} ${styles.confirmPassword}`}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              required
              placeholder="Confirm Password"
            />
          </div>

          <button type="submit" className={styles.loginBtn}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;

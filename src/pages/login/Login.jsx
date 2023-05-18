/**
 * @file Login.jsx
 *
 * @description The file is responsible for rending the login screen allowing
 * the user to login to their account using a registered username and password.
 *
 * @requires react
 * @requires useAuth
 * @requires login.scss
 *
 * @exports Login
 *
 * @TODO
 * - Refactor component to only use classes instead of IDs
 * - Refactor component to use proper CSS module import syntax to prompt better
 * interaction with other components.
 * - Refactor CSS to get rid of warning messages related fire-fox notifications
 */

import React, { useState } from "react";
import styles from "./login.module.scss";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import googleImage from "../../assets/pictures/google-signin.png"

/**
 * Provides the ability to allow the user to login to their profile
 *
 * @returns a login screen with two input fields for email and password
 */
const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login, googleLogin } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!username || !password) {
      console.log("Incorrect values");
    }
    login(username, password)
      .then((response) => {
        console.log(response);
        navigate("/home");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleGoogle = (event) => {
    event.preventDefault();

    googleLogin(username, password)
    .then((response) => {
      console.log(response);
      navigate("/home");
    })
    .catch((error) => {
      console.log(error.message);
    });
};

  return (
    <div className={styles.wrapper}>
      <div className={styles.overlay}>
        <h1 className={styles.welcome}>Welcome to</h1>
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
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              type="text"
              required
              placeholder="Username"
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

            <Link to="/forgot-password" className={styles.forgot}>
              Forgot Password?
            </Link>
          </div>

          <button type="submit" className={styles.loginBtn}>
            Login
          </button>
        </form>

        
        <div className={styles.horizontalLineFrame}>
          <div className={styles.horizontalLineAttributesLeft} />
          <div>
            <p className={styles.horizontalAttributesMiddle}>Alternatively</p>
          </div>
          <div className={styles.horizontalLineAttributesRight} />
        </div>

        <button type="submit" onClick={handleGoogle} className={styles.googleButton}>
          <img src={googleImage} alt="loginWithGoogle" />
        </button>

        <p className={styles.registerText}>Don't Have An Account? &nbsp;
          <Link to="/register-account" className={styles.register}>
              Register Now
          </Link>
        </p>
        
      </div>
    </div>
  );
};

export default Login;

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

import React, { useEffect, useState } from "react";
import styles from "./login.scss";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

/**
 * Proviles the ability to allow the user to login to their profile
 *
 * @returns a login screen with two input fields for email and password
 */
const Login = () => {
  useEffect(() => {
    document.body.classList.add("login-body");
  }, []);

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!username || !password) {
      console.log("Incorrect values");
    }
    login(username, password)
      .then((response) => {
        console.log(response);
        navigate("/");
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
          &nbsp;SLPscribe<sup>TM</sup>
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
            />
            <label className={styles.loginLabel} htmlFor="username">
              Username
            </label>
          </div>

          <div className={styles.filedHoder}>
            <input
              className={`${styles.loginField} ${styles.password}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
            />

            <label className={styles.loginLabel} htmlFor="password">
              Password
            </label>

            <Link to="/forgot" className={styles.forgot}>
              Forgot Password?
            </Link>
          </div>

          <button type="submit" className={styles.loginBtn}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

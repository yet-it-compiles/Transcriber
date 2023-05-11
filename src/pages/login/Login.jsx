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
import "./login.scss";
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

  const handleSubmit = (e) => {
    e.preventDefault();

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
    <div className="wrapper">
      <div className="overlay">
        <h1 className="welcome">Welcome to</h1>
        {/* /// ! Change to span */}
        <h1 id="transcriber">
          &nbsp;SLPscribe<sup>TM</sup>
        </h1>

        {/* // ! Change to p */}
        <h2 id="motto">
          Record Conversations
          <br />
          {/* // ! Change to p */}
          Analyze Articulation
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="field-holder">
            <input
              className="login-field"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              type="text"
              id="username"
              required
            />
            <label className="login-label" htmlFor="username">
              Username
            </label>
          </div>

          <div className="field-holder">
            <input
              className="login-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              required
            />

            <label className="login-label" htmlFor="password">
              Password
            </label>

            <Link to="/forgot" id="forgot">
              Forgot Password?
            </Link>
          </div>

          <button type="submit" id="login-btn">
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

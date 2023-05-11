/**
 * @file ForgotPassword.jsx
 *
 * @description This module is responsible for rendering the forgot password
 * UI which allows the user to recover their email or password.
 *
 * @requires React
 * @requires react-router-dom
 * @requires emailjs/browser
 * @requires login.css
 *
 * @exports ForgotPassword
 */

import React, { useState, useRef, useEffect } from "react";
import styles from "../login/login.scss";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router-dom";

/**
 * This component is responsible for rendering a simple form that sends an email
 * to the user's specified email address with a link to reset their password.
 */
const ForgotPassword = () => {
  useEffect(() => {
    document.body.classList.add("login-body");
  }, []);

  const formRef = useRef();
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSendEmail = (event) => {
    event.preventDefault();

    emailjs
      .sendForm(
        "service_agw179e",
        "template_3n339qq",
        formRef.current,
        "NDXZ96LTvQ5VbtPcX"
      )
      .then(
        (result) => {
          console.log(`${result.text} Email sent succesfully`);
        },
        (error) => {
          throw new Error(error);
        }
      );
    event.target.reset();
    alert(
      `Email sent to ${email} If you don't see it, be sure to check your spam folder`
    );
    navigate("/login");
  };

  return (
    <div className="wrapper">
      <div className="overlay">
        <h1 className="forgotHeader">Forgot Password?</h1>
        <form ref={formRef} onSubmit={handleSendEmail}>
          <div className="field-holder">
            <input
              className="login-field"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="text"
              id="email"
              name="user_email"
              required
            />
            <label className="login-label" htmlFor="email">
              Email
            </label>
          </div>
          <button type="submit" id="login-btn">
            Send Email
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;

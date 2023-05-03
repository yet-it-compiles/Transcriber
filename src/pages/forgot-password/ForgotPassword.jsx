/**
 * @file ForgotPassword.jsx
 *
 * @description
 *
 * @requires React
 * @requires react-router-dom
 * @requires emailjs/browser
 * @requires login.css
 *
 * @exports ForgotPassword
 */

import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import "./login.css";

const ForgotPassword = () => {
  const form = useRef();
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const sendEmail = (event) => {
    event.preventDefault();

    emailjs
      .sendForm(
        "service_agw179e",
        "template_3n339qq",
        form.current,
        "NDXZ96LTvQ5VbtPcX"
      )
      .then(
        (result) => {
          console.log(`${result.text} Email sent succesfully`);
        },
        (error) => {
          console.log(error.text);
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
        <form ref={form} onSubmit={sendEmail}>
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

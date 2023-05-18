/**
 * @file ForgotPassword.jsx
 *
 * @description This module is responsible for rendering the forgot password
 * UI which allows the user to recover their email or password.
 *
 * @requires React
 * @requires emailjs/browser
 * @requires react-router-dom
 * @requires login.module.scss
 *
 * @exports ForgotPassword
 */

import React, { useState, useRef } from "react";
import styles from "../login/login.module.scss";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

/**
 * This component renders the forgot password Ui which allows the user to recover
 * their email or password for their account by submitting their email and
 * folloing the directions in the email that gets sent.
 *
 * @returns a forgot password UI page
 */
const ForgotPassword = () => {
  const formRef = useRef();
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { resetPassword } = useAuth();

  const handleSendEmail = (event) => {
    event.preventDefault();

    resetPassword(email)
      .then((response) => {
        console.log(response);
        event.target.reset();
        alert(
          `Email sent to ${email}, If you don't see it, be sure to check your spam folder`
        );
        navigate("/");
      })
      .catch((error) => {
        alert(`${email} email doesn't exist`);
        //console.log(error);
      });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.overlay}>
        <h1 className={styles.forgotHeader}>Forgot Password?</h1>
        <form ref={formRef} onSubmit={handleSendEmail}>
          <div className={styles.fieldHolder}>
            <input
              className={styles.loginField}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="text"
              id="email"
              name="user_email"
              required
              placeholder="Email"
            />
          </div>
          <button type="submit" className={styles.loginBtn}>
            Send Email
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;

import React from 'react'
import "./login.css";
import {useRef} from "react";
import emailjs from '@emailjs/browser';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {

  const form = useRef()
  const [email, setEmail] = useState("");
  const navigate = useNavigate()

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_agw179e', 'template_3n339qq', form.current, 'NDXZ96LTvQ5VbtPcX')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
      e.target.reset();
      alert(`Email sent to ${email} If you don't see it, be sure to check your spam folder`)
      navigate("/login")
  };

  return (
    <div className="wrapper">
      <div className="overlay">
        <h1 className="forgotHeader">Forgot Password?</h1>
        <form ref = {form} onSubmit={sendEmail}>
          <div className="field-holder">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              id='email'
              name="user_email"
              required />
            <label htmlFor="email">Email</label>
          </div>
          <button type="submit" id="login-btn">
            Send Email
          </button>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword
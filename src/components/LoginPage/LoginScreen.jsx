import React from "react";
import {useState} from "react";
import './login-style.css';
import { useAuth } from '../../contexts/AuthContext'


function LoginScreen() {

  //Update username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setSubmitting] = useState(false)

  const { login } = useAuth()

  const handleSubmit = (e) => { //When the form is submitted
    e.preventDefault();

    if(!username || !password){
      console.log('Incorrect values')
    }
    setSubmitting(true)
    login(username, password)
      .then((response) => console.log(response))
      .catch((error) => {console.log(error.message)
      })
      .finally(() => setSubmitting(false))
    console.log(`username: ${username}\npassword: ${password}`);
  }

  const handleForgotClick = () => {
    console.log('Forgot password');
  }

  
  return (
    
    <div className="overlay">
      <h1 id="welcome">Welcome to</h1>
      <h1 id="transcriber">&nbsp;SLPscribe<sup>TM</sup></h1>
      <h2 id="motto">Record Conversations<br />Analyze Articulation</h2>

      <form onSubmit={handleSubmit}>

        <div className="field-holder">
          <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" id="username" required></input>
          <label htmlFor="username">Username</label>
        </div>

        <div className="field-holder">
          <input value={password} onChange={(e) => setPassword(e.target.value)}type="password" id="password" required></input>
          
          <label htmlFor="password">Password</label>

          <a href="#" onClick={handleForgotClick} id="forgot">Forgot Password?</a>
        </div>

        <button type="submit" id="login-btn">Log in</button>
      </form>
    </div>
  );
}

export default LoginScreen;
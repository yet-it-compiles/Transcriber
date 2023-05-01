/**
 * @file
 *
 * @description
 *
 * @requires react
 * @requires login.css
 * @requires useState
 * @requires useAuth
 *
 * @exports LoginScreen
 */

import React from "react";
// @ ! TODO - Conflicts with the rest of the files

//import "./login.css";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useLocation, useNavigate, Link } from 'react-router-dom';
import "./login.css"

const Login = () => {

	const navigate = useNavigate()
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
				console.log(response)
				navigate("/dashboard")})
			.catch((error) => {
				console.log(error.message);
			});
		console.log(`username: ${username}\npassword: ${password}`);
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
							onChange={(e) => setUsername(e.target.value)}
							type="text"
							id="username"
							required
						></input>
						<label className="login-label" htmlFor="username">Username</label>
					</div>

					<div className="field-holder">
						<input
							className="login-field"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							type="password"
							id="password"
							required
						></input>

						<label className="login-label"  htmlFor="password">Password</label>

						<Link to="/forgot" id="forgot">Forgot Password?</Link>
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

/**
 * @file
 *
 * @description
 *
 * @requires react
 * @requires login-style.css
 * @requires useState
 * @requires useAuth
 *
 * @exports LoginScreen
 */

import React from "react";
// @ ! TODO - Conflicts with the rest of the files
//import "./login-style.css";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

const LoginScreen = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const { login } = useAuth();

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!username || !password) {
			console.log("Incorrect values");
		}
		login(username, password)
			.then((response) => console.log(response))
			.catch((error) => {
				console.log(error.message);
			});
		console.log(`username: ${username}\npassword: ${password}`);
	};

	const handleForgotClick = () => {
		console.log("Forgot Password Was Clicked! ");
	};

	return (
		<div className="overlay">
			<h1 id="welcome">Welcome to</h1>
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
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						type="text"
						id="username"
						required
					></input>
					<label htmlFor="username">Username</label>
				</div>

				<div className="field-holder">
					<input
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						type="password"
						id="password"
						required
					></input>

					<label htmlFor="password">Password</label>

					{/* // ! Change to li */}
					<a href="#" onClick={handleForgotClick} id="forgot">
						Forgot Password?
					</a>
				</div>

				<button type="submit" id="login-btn">
					Log in
				</button>
			</form>
		</div>
	);
};

export default LoginScreen;

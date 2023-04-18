/**
 * @file NavigationLeft.jsx
 *
 * @description This module defines the left navigation component that stays
 * persistent through the application on the left side.
 *
 * @requires react
 * @requires react-router-dom
 * @requires navigation-left.css
 *
 * @exports NavigationLeft
 */

import React from "react";
import { BrowserRouter, Link, NavLink } from "react-router-dom";
import styles from "./navigation-left.module.css?inline";

/**
 *
 * @returns {jsx Element}
 */
const NavigationLeft = () => {
	return (
		<BrowserRouter>
			<span>
				<img src="/src/assets/project-logo.svg" alt="Project Logo" />
				<p>SLPScribe</p>
			</span>

			<input type="text" placeholder="Search for transcript..." />
			<br />
			<br />

			<nav>
				<ul>
					<li>
						<NavLink exact to="/">
							Dashboard
						</NavLink>
					</li>
					<li>
						<NavLink exact="true" to="/conversations">
							Conversations
						</NavLink>
					</li>
					<li>
						<NavLink exact="true" to="/text-editor">
							Text Editor
						</NavLink>
					</li>
					<li>
						<NavLink exact="true" to="/recordings">
							Recordings
						</NavLink>
					</li>
					<li>
						<NavLink exact="true" to="/calendar">
							Calendar
						</NavLink>
					</li>
					<li>
						<NavLink exact="true" to="/analytics">
							Analytics
						</NavLink>
					</li>
					<li>
						<NavLink exact="true" to="/settings">
							Settings
						</NavLink>
					</li>
				</ul>
			</nav>
		</BrowserRouter>
	);
};

export default NavigationLeft;

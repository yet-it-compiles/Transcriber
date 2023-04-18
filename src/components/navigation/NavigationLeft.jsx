/**
 * @file NavigationLeft.jsx
 *
 * @description This module defines the left navigation component that stays
 * persistent through the application on the left side.
 *
 * @requires react
 * @requires navigation-left.css
 *
 * @exports NavigationLeft
 */

import React from "react";
// import { NavLink } from "react-router-dom";
import styles from "./navigation-left.module.css";

/**
 *
 * @returns {jsx Element}
 */
const NavigationLeft = () => {
	return (
		<nav className={styles.navigationLeft}>
			<span>
				<img src="/src/assets/project-logo.svg" alt="Project Logo" />

				<p>SLPScribe</p>
			</span>

			<input type="text" placeholder="Search for transcript..." />

			<br />
			<br />

			<ul>
				<li>Dashboard</li>
				<li>Conversations</li>
				<li>Text-Editor</li>
				<li>Recordings</li>
				<li>Calendar</li>
				<li>Analytics</li>
				<li>Settings</li>
			</ul>

			{/* <li>
					<NavLink to="/">Dashboard</NavLink>
				</li> */}
			{/* <li>
					<NavLink to="/conversations">Conversations</NavLink>
				</li>
				<li>
					<NavLink to="/text-editor">Text Editor</NavLink>
				</li>
				<li>
					<NavLink to="/recordings">Recordings</NavLink>
				</li>
				<li>
					<NavLink to="/calendar">Calendar</NavLink>
				</li>
				<li>
					<NavLink to="/analytics">Analytics</NavLink>
				</li>
				<li>
					<NavLink to="/settings">Settings</NavLink>
				</li> */}
		</nav>
	);
};

export default NavigationLeft;

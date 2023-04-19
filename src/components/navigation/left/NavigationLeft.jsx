/**
 * @file NavigationLeft.jsx
 *
 * @description This module defines the left navigation component that stays
 * persistent through the application on the left side.
 *
 * @requires react
 * @requires navigation-left.module.css
 *
 * @exports NavigationLeft
 */

import React from "react";
import styles from "./navigation-left.module.css";

/**
 *
 * @returns {jsx Element}
 */
const NavigationLeft = () => {
	return (
		<aside className={styles.navigationLeft}>
			<ApplicationSection />
			<TranscriptSearch />
			<Links />
			<ToggleSwitch />
			<UserProfile />
		</aside>
	);
};

const ApplicationSection = () => {
	return (
		<section className={styles.projectSection}>
			<img src="/project-logo.svg" alt="Project Logo" />
			<p>SLP</p>
			<p>Scribe</p>
		</section>
	);
};

const TranscriptSearch = () => {
	return (
		<form className={styles.search}>
			<label htmlFor="search-input"></label>
			<input
				type="text"
				id="search-input"
				placeholder="Search for transcript..."
			/>
		</form>
	);
};

const Links = () => {
	return (
		<nav className={styles.links}>
			<ul>
				<li>Dashboard</li>
				<li>Conversations</li>
				<li>Text-Editor</li>
				<li>Recordings</li>
				<li>Calendar</li>
				<li>Analytics</li>
				<li>Settings</li>
			</ul>
		</nav>
	);
};

const ToggleSwitch = () => {
	return (
		<section className={styles.toggle}>
			<img src="/src/assets/navigation-icons/light-mode-icon.svg" alt="" />
			<p>Light Mode</p>
		</section>
	);
};

const UserProfile = () => {
	return (
		<section className={styles.profile}>
			<p>Jane Doe</p>
			<br />
			<p>jane.doe@gmail.com</p>
			<button type="submit">Logout</button>
		</section>
	);
};

export default NavigationLeft;

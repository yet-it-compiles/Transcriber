/**
 * @file NavigationLeft.jsx
 *
 * @description This module defines the left navigation component that
 * stays persistent through the applications left pane.
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
				<li>
					<img src="/src/assets/navigation-icons/dashboard-icon.svg" />
					Dashboard
				</li>

				<li>
					<img src="/src/assets/navigation-icons/conversation-icon.svg" />
					Conversations
				</li>

				<li>
					<img src="/src/assets/navigation-icons/text-editor-icon.svg" />
					Text-Editor
				</li>
				<li>
					<img src="/src/assets/navigation-icons/record-icon.svg" />
					Recordings
				</li>
				<li>
					<img src="/src/assets/navigation-icons/calendar-icon.svg" />
					Calendar
				</li>
				<li>
					<img src="/src/assets/navigation-icons/analytics-icon.svg" />
					Analytics
				</li>
				<li>
					<img src="/src/assets/navigation-icons/settings-icon.svg" />
					Settings
				</li>
			</ul>
		</nav>
	);
};

const ToggleSwitch = () => {
	return (
		<section className={styles.toggle}>
			<img src="/src/assets/navigation-icons/light-mode-icon.svg" alt="" />
			<br />
			<p>Light Mode</p>
		</section>
	);
};

const UserProfile = () => {
	return (
		<section className={styles.profile}>
			<p>Jane Doe</p>

			<p>jane.doe@gmail.com</p>
			<button type="submit">Logout</button>
		</section>
	);
};

export default NavigationLeft;

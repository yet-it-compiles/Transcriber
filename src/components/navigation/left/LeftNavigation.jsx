/**
 * @file NavigationLeft.jsx
 *
 * @description This file is responsible for rendering and the left navigation
 * pane that stays persistent through the applications routing.
 *
 * @requires react
 * @requires react-icons
 * @requires navigation-left.module.css
 *
 * @exports LeftNavigation
 */

import React, { useState } from "react";
import styles from "./left-nav.module.css";
import { FaLongArrowAltRight } from 'react-icons/fa'
import { GiArchiveResearch, GiConversation } from 'react-icons/gi';
import { RxDividerVertical } from 'react-icons/rx';
import { FcEditImage, FcHome, FcCalendar, FcStatistics, FcSettings, FcAudioFile } from 'react-icons/fc';
import { BsSunrise, BsMoonStars } from 'react-icons/bs';

/**
 *
 * @returns {jsx Element}
 */
const LeftNavigation = () => {

	return (
		<nav className={styles.navigationLeft}>
			<Branding />
			<TranscriptSearch />
			<Links />
			<div>
				<ToggleSwitch />
				<UserProfile />
			</div>

		</nav>
	);
};

const Branding = () => {
	return (
		<div className={styles.branding}>
			<img src="/project-logo.svg" alt="Project Logo" />
			<p>SLP</p>
			<p>Scribe</p>
		</div>
	);
};

const TranscriptSearch = () => {
	return (
		<div className={styles.search}>
				<div>
					<GiArchiveResearch/>
					<RxDividerVertical/>
				</div>
				<label htmlFor="search-input"></label>
				<input
					type="text"
					id="search-input"
					placeholder="Search for transcript..."
				/>
				<button>
					<FaLongArrowAltRight/>
				</button>
		</div>
	);
};

const Links = () => {
	return (
		<nav className={styles.routingLinks}>
			<ul>
				<li>
					<FcHome/>
					Dashboard
				</li>

				<li>
					<GiConversation/>
					Conversations
				</li>

				<li>
					<FcEditImage/>
					Text-Editor
				</li>
				<li>
					<FcAudioFile/>
					Recordings
				</li>
				<li>
					<FcCalendar/>
					Calendar
				</li>
				<li>
					<FcStatistics/>
					Analytics
				</li>
				<li>
					<FcSettings/>
					Settings
				</li>
			</ul>
		</nav>
	);
};

const ToggleSwitch = () => {
	const [isDarkMode, setIsDarkMode
	] = useState(false);

	const handleToggle = () => {
		setIsDarkMode
		(!isDarkMode);
	}
	return (
		<div className={styles.toggle}>
			{isDarkMode ? <BsMoonStars/> : <BsSunrise/>}
			{isDarkMode ? <p>Dark Mode</p> : <p>Light Mode</p>}
			<input type="checkbox" onClick={handleToggle}/>

		</div>
	);
};

const UserProfile = () => {
	return (
		<section className={styles.profile}>
			<div>
				<p>Jane Doe</p>
				<p>jane.doe@gmail.com</p>
			</div>
			{/* <button type="submit"></button> */}
		</section>
	);
};

export default LeftNavigation;

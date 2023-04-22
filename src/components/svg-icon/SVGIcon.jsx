/**
 * @file SVGIcon.jsx
 *
 * @description A reusable base component that can dynamically render variously
 * sized user specified [default 48px by 48px] SVG icons that are centered and
 * scaled with a viewBox of 0 0 24 24
 *
 * The entry level component accepts a path, optional height and width and
 * renders a white-colored centered and scaled SVG icon with a viewBox
 *
 * @requires react
 *
 * @exports SVGIcons
 * @exports Microphone
 * @exports Recording
 * @exports NotRecording
 * @exports Play
 * @exports Stop
 * @exports Transcript
 */

import React from "react";

/**
 * Defines a reusable base SVG component that dynamically renders scaled and
 * centered SVG icons of user specified height and width.
 *
 * Accepts a path, optional height and width [defaults 48px by 48px] and
 * renders an centered and scaled SVG icon with a viewBox of 0 0 24 24
 *
 * @param {path} param0 - Represents the SVG path data
 * @param {width} param1 - *Optional* width property [default 48px]
 * @param {height} param2 - *Optional* height property [default 48px]
 *
 * @returns {JSX.Element} - Properly scaled and centered SVG icon with a
 * viewBox of 0 0 24 24
 */
export const SVGIcon = ({ path, width = 48, height = 48 }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={width}
		height={height}
		viewBox="0 0 24 24"
	>
		<path d={path} />
	</svg>
);

/**
 * Responsible for rendering a white-colored microphone icon that
 * optionally takes in a width, and height parameter [default 48px by
 * 48px] with a viewBox of 0 0 24 24, centered and scaled to fit its container.
 *
 * @returns {JSX.Element} - Properly scaled and centered SVG icon with a
 * viewBox of 0 0 24 24
 */
export const Microphone = () => (
	<Icon
		path="M12 16.9A3.1 3.1 0 0 0 15.1 13.8V8.2A3.1 3.1 0 0 0 12 5.1a3.1
	3.1 0 0 0-3.1 3.1v5.6a3.1 3.1 0 0 0 3.1 3.1zm-1-1V8.2a2.1 2.1 0 0 1 4.2
	0v7.6a2.1 2.1 0 0 1-4.2 0z"
	/>
);

/**
 * Responsible for rendering a white-colored recording SVG icon that optionally
 * takes in a width, and height parameter [default 48px by 48px] with a viewBox
 * of 0 0 24 24, centered and scaled to fit its container.
 *
 * @returns {JSX.Element} - Properly scaled and centered SVG icon with a
 * viewBox of 0 0 24 24
 */
export const Recording = () => (
	<Icon
		path="M12 18.4A6.4 6.4 0 0 1 5.6 12v-1.6A6.4 6.4 0 0 1 12 4.4a6.4 6.4
	0 0 1 6.4 6.4v1.6a6.4 6.4 0 0 1-6.4 6.4zm0-10.8a4.4 4.4 0 0 0-4.4
	4.4v1.6a4.4 4.4 0 0 0 8.8 0v-1.6a4.4 4.4 0 0 0-4.4-4.4z"
	/>
);

/**
 * Responsible for rendering a white-colored circle SVG icon representing 'not
 * actively recording' that optionally takes in a width, and height parameter
 * [default 48px by 48px] with a viewBox  of 0 0 24 24, centered and scaled to
 * fit its container.
 *
 * @returns {JSX.Element} - Properly scaled and centered SVG icon with a
 * viewBox of 0 0 24 24
 */
export const NotRecording = () => (
	<Icon
		path="M12 18.4A6.4 6.4 0 0 1 5.6 12v-1.6A6.4 6.4 0 0 1 12 4.4a6.4 6.4
	 0 0 1 6.4 6.4v1.6a6.4 6.4 0 0 1-6.4 6.4zm0-1.2a5.2 5.2 0 0 0 5.2-5.2V12a5.2
	  5.2 0 0 0-10.4 0v1.6a5.2 5.2 0 0 0 5.2 5.2zm0-11.6a8.8 8.8 0 0 1 8.8 8.8v1.
	  6a8.8 8.8 0 0 1-17.6 0v-1.6a8.8 8.8 0 0 1 8.8-8.8z"
	/>
);

/**
 * Responsible for rendering a white-colored play SVG icon that optionally
 * takes in a width, and height parameter [default 48px by 48px] with a viewBox
 * of 0 0 24 24, centered and scaled to fit its container.
 *
 * @returns {JSX.Element} - Properly scaled and centered SVG icon with a
 * viewBox of 0 0 24 24
 */
export const Play = () => (
	<Icon
		path="m383 746 267-170-267-170v340Zm97 230q-82 0-155-31.5t-127.5-86Q143
	 804 111.5 731T80 576q0-83 31.5-156t86-127Q252 239 325 207.5T480 176q83 0 156
	  31.5T763 293q54 54 85.5 127T880 576q0 82-31.5 155T763 858.5q-54 54.5-127
	  86T480 976Z"
	/>
);

/**
 * Responsible for rendering a white-colored stop SVG icon that optionally takes
 * in a width, and height parameter [default 48px by 48px] with a viewBox of
 * 0 0 24 24, centered and scaled to fit its container.
 *
 * @returns {JSX.Element} - Properly scaled and centered SVG icon with  a viewBox
 * of 0 0 24 24
 */
export const Stop = () => (
	<Icon
		path="M330 726h300V426H330v300Zm150 250q-82 0-155-31.5t-127.5-86Q143
	804 111.5 731T80 576q0-83 31.5-156t86-127Q252 239 325 207.5T480 176q83 0 156
	 31.5T763 293q54 54 85.5 127T880 576q0 82-31.5 155T763 858.5q-54 54.5-127
	 86T480 976Z"
	/>
);

/**
 * Responsible for rendering a white-colored document SVG icon that optionally
 * takes in a width, and height parameter [default 48px by 48px] with a viewBox
 * of 0 0 24 24, centered and scaled to fit its container.
 *
 * @returns {JSX.Element} - Properly scaled and centered SVG icon with  a viewBox
 *  of 0 0 24 24
 */
export const Transcript = () => (
	<Icon
		path="M319 806h322v-60H319v60Zm0-170h322v-60H319v60Zm-99 340q-24
	0-42-18t-18-42V236q0-24 18-42t42-18h361l219 219v521q0 24-18 42t-42
	18H220Zm331-554h189L551 236v186Z"
	/>
);

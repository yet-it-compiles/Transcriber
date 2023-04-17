/**
 * @file MetricWidgets.jsx
 *
 * @description
 * This file is responsible for creating each of the four metric widgets
 *
 * @requires metric-widgets.css
 */

import React, { useState } from "react";

/**
 * Defines the metric widgets for the Dashboard
 *
 * @returns Four JSX metric widgets
 */
const Widgets = () => {
	const [minutes, setMinutes] = useState(0);
	const [recordings, setRecordings] = useState(0);
	const [balance, setBalance] = useState(0);
	const [memoryUsed, setMemoryUsed] = useState(0);

	return (
		<>
			<div className="metricCard">
				<p>Total Minutes Used</p>
				<p>{minutes} minutes</p>
				<p>0.00%</p>
			</div>

			<div className="metricCard">
				<p>Number of Recordings</p>
				<p>{recordings} recordings</p>
				<p>0.00%</p>
			</div>

			<div className="metricCard">
				<p>This Months Balance</p>
				<p>{balance} USD</p>
				<p>0.00%</p>
			</div>

			<div className="metricCard">
				<p>Total Memory Used</p>
				<p>{memoryUsed} utilized</p>
				<p>0.00%</p>
			</div>
		</>
	);
};

export default Widgets;

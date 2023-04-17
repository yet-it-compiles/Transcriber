/**
 * @file MetricWidgets.jsx
 *
 * @description This file exports a set of components that render four metric
 * widgets that will be used in the Dashboard
 *
 * @exports
 * @requires metric-widgets.module.css
 */

import React, { useState, memo } from "react";
import styles from "./metric-widgets.module.css";

/**
 * Defines four memoized metric widget components for the Dashboard
 *
 * The component is memoized using 'memo' since its behavior is independent of
 * its props which ensures better performance by preventing unnecessary re-renders
 *
 * @returns Four JSX metric widgets
 */
const Widgets = memo(() => {
	const [totalMinutesUsed, setTotalMinutesUsed] = useState(0);
	const [numberOfRecordings, setNumberOfRecordings] = useState(0);
	const [currentMonthBalance, setCurrentMonthBalance] = useState(0);
	const [totalMemoryUsed, setTotalMemoryUsed] = useState(0);

	return (
		<>
			<div className={styles.metricCard}>
				<p>Total Minutes Used</p>
				<p>{totalMinutesUsed} minutes</p>
				<p>0.00%</p>
			</div>

			<div className={styles.metricCard}>
				<p>Number of Recordings</p>
				<p>{numberOfRecordings} recordings</p>
				<p>0.00%</p>
			</div>

			<div className={styles.metricCard}>
				<p>This Month's Balance</p>
				<p>{currentMonthBalance} USD</p>
				<p>0.00%</p>
			</div>

			<div className={styles.metricCard}>
				<p>Total Memory Used</p>
				<p>{totalMemoryUsed} utilized</p>
				<p>0.00%</p>
			</div>
		</>
	);
});

export default Widgets;

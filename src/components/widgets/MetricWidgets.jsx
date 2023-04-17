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
 * Defines a memoized metric widget components for the Dashboard.jsx
 *
 * The component is memoized using 'memo' since its behavior is independent of
 * its props which ensures better performance by preventing unnecessary re-renders
 *
 * @returns {JSX.Element} - a JSX metric widget
 */
const Widgets = memo(() => {
	const [metrics, setMetrics] = useState({
		totalMinutesUsed: 0,
		numberOfRecordings: 0,
		currentMonthBalance: 0.0,
		totalMemoryUsed: 0,
		percentChange: 1,
	});

	return (
		//className={styles.metricCardsContainer}
		<>
			<div className={styles.metricCardContainer}>
				<MetricCard
					title="Total Minutes Used"
					value={metrics.totalMinutesUsed}
					unit="minutes"
					sign={metrics.percentChange}
				/>
			</div>

			<div className={styles.metricCardContainer}>
				<MetricCard
					title="Number of Recordings"
					value={metrics.numberOfRecordings}
					unit="recordings"
					sign={metrics.percentChange}
				/>
			</div>

			<div className={styles.metricCardContainer}>
				<MetricCard
					title="This Month's Balance"
					value={metrics.currentMonthBalance}
					unit="USD"
					sign={metrics.percentChange}
				/>
			</div>
			<div className={styles.metricCardContainer}>
				<MetricCard
					title="Total Memory Used"
					value={metrics.totalMemoryUsed}
					unit="utilized"
					sign={metrics.percentChange}
				/>
			</div>
		</>
	);
});

/**
 * Renders a metric card with a title, value, unit, and sign.
 *
 * @param {string} title - The title of the metric card.
 * @param {number} value - The value of the metric card.
 * @param {string} unit - The unit of the metric card.
 * @param {number} sign - The number of decimal places to show for the sign (percentage).
 *
 * @returns {JSX.Element} - A metric card component with the specified props.
 */
const MetricCard = ({ title, value, unit, sign }) => {
	return (
		(
			// className={styles.metricCard}
			<>
				<h1>{title}</h1>
				<h2>
					{value} {unit}
				</h2>
				<h3>{value ? (value * 100).toFixed(sign) : "0.00"}%</h3>
			</>
		),
		[title, value, unit, sign]
	);
};

export default Widgets;

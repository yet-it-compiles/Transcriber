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
 * Defines a memoized metric widget component for the Dashboard.jsx
 *
 * The component is memoized using 'memo' since its behavior is independent of
 * its props which ensures better performance by preventing unnecessary re-renders
 *
 * @returns {JSX.Element} - a metric widget
 */
const Widgets = memo(() => {
	const [metrics, setMetrics] = useState([
		{
			title: "Total Minutes Used",
			value: 0,
			unit: "minutes",
			percentChange: 0.0,
		},
		{
			title: "Number of Recordings",
			value: 0,
			unit: "recordings",
			percentChange: 0.0,
		},
		{
			title: "This Month's Balance",
			value: 0.0,
			unit: "USD",
			percentChange: 10.0,
		},
		{
			title: "Total Memory Used",
			value: 0,
			unit: "utilized",
			percentChange: 10.0,
		},
	]);

	return (
		<>
			{metrics.map((metric, index) => (
				<div className={styles.metricCardContainer} key={index}>
					<MetricCard {...metric} />
				</div>
			))}
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
 * @returns {JSX.Element} - A metric card with the specified props
 */
const MetricCard = ({ title, value, unit, percentChange }) => {
	return (
		<div className={styles.metricCard}>
			<h1>{title}</h1>
			<h2>
				{value} {unit}
			</h2>
			{/*Displays $0.00 */}
			<h3>{value ? (value * 100).toFixed(percentChange) : "0.00"}%</h3>
		</div>
	);
};

export default Widgets;

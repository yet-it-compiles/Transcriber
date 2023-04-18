/**
 * @file MetricWidgets.jsx
 *
 * @description This file exports a set of 4 components that render four metric
 * widgets that will be used in the Dashboard
 *
 * @requires react
 * @requires metric-widgets.module.css
 *
 * @exports Widgets
 */

import React, { useState, memo } from "react";
import styles from "./metric-widgets.module.css";

/**
 * Defines a memoized metric widget for the Dashboard.jsx
 *
 * The component is memoized using 'memo' since its behavior is independent of
 * its props which ensures better performance by preventing unnecessary re-renders
 *
 * @returns {JSX.Element} - a metric widget
 */
const Widgets = memo(() => {
	const [metricWidget, setMetricWidget] = useState([
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
			percentChange: 0.0,
		},
		{
			title: "Total Memory Used",
			value: 0,
			unit: "utilized",
			percentChange: 0.0,
		},
	]);

	return (
		<>
			{metricWidget.map((eachMetric, eachIndex) => (
				<div className={styles.metricCardContainer} key={eachIndex}>
					<MetricCard {...eachMetric} />
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
 * @param {number} percentChange - The percentChange of the metric card
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
			<h3>{percentChange}%</h3>
		</div>
	);
};

export default Widgets;

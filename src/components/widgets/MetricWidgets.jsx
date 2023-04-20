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

const initialWidgetMetrics = [
	{
		title: "Total Minutes Used",
		value: 119,
		unit: "minutes",
		percentChange: 11.01,
	},
	{
		title: "Number of Recordings",
		value: 4,
		unit: "recordings",
		percentChange: 9.15,
	},
	{
		title: "This Month's Balance",
		value: 1.79,
		unit: "USD",
		percentChange: -0.56,
	},
	{
		title: "Total Memory Used",
		value: 29,
		unit: "utilized",
		percentChange: 9.12,
	},
];

/**
 * Responsible for displaying four memoized widgets on the Dashboard.jsx.
 *
 * Accomplished by mapping over each widget with the
 * Generates four memoized metric widgets that will be displayed in the header
 * section of the dashboard.
 *
 * @returns {JSX.Element} - a metric widget
 */
const DisplayWidgets = () => {
	const [widgetMetrics, setWidgetMetrics] = useState(initialWidgetMetrics);

	return (
		<aside className={styles.widget}>
			{widgetMetrics.map((eachMetric, eachIndex) => (
				<aside key={eachIndex}>
					<UpdateWidget {...eachMetric} />
				</aside>
			))}
		</aside>
	);
};

/**
 * Responsible for updating the memorized widget with its new state
 *
 * @param {string} title - The title of the metric card.
 * @param {number} value - The value of the metric card.
 * @param {string} unit - The unit of the metric card.
 * @param {number} percentChange - The percentChange of the metric card
 *
 * @returns {JSX.Element} - A metric card with the specified props
 */
const UpdateWidget = memo(({ title, value, unit, percentChange }) => {
	return (
		<>
			<p>{title}</p>
			<p>
				{unit === "USD"
					? "$" + value
					: unit === "utilized"
					? value + "%"
					: value}
			</p>
			<p>{unit}</p>
			<p>
				{percentChange >= 0.0
					? "+" + percentChange.toFixed(2)
					: percentChange.toFixed(2)}
				%
			</p>
		</>
	);
});

export default DisplayWidgets;

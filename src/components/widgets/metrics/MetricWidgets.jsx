/**
 * @file MetricWidgets.jsx
 *
 * @description This file is responsible for rendering and managing the state
 * for the 4 metric widgets displayed in Dashboard.jsx. The components uses
 * memoization to optimize performance and the CSS layout uses responsive
 * design.
 *
 * @requires react
 * @requires metric-widgets.module.scss
 *
 * @exports DisplayWidgets
 */

import React, { useState } from "react";
import styles from "./widgets.module.scss";

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
 * Responsible for rendering and managing the state of the metric widgets
 *
 * Accomplished by mapping over each widget in the array creating the widget as
 * an <aside> with a unique key representing its array index.
 *
 * @param {string} title - The title of the metric card.
 * @param {number} value - The value of the metric card.
 * @param {string} unit - The unit of the metric card.
 * @param {number} percentChange - The percentChange of the metric card
 *
 * @returns {JSX.Element} - An <aside> widget with its current state
 */
const DisplayWidgets = ({ title, value, unit, percentChange }) => {
  const [widgetMetrics] = useState(initialWidgetMetrics);

  return (
    <div className={styles.widget}>
      {widgetMetrics.map((eachMetric, eachIndex) => (
        <aside key={eachIndex}>
          <p>{eachMetric.title}</p>
          <p>
            {eachMetric.unit === "USD"
              ? `$${eachMetric.value}`
              : eachMetric.unit === "utilized"
              ? `${eachMetric.value}%`
              : eachMetric.value}
          </p>
          <p>{eachMetric.unit}</p>
          <p>
            {eachMetric.percentChange >= 0.0
              ? `+${eachMetric.percentChange.toFixed(2)}`
              : eachMetric.percentChange.toFixed(2)}
            %
          </p>
        </aside>
      ))}
    </div>
  );
};

export default DisplayWidgets;

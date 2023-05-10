/**
 * @file WeatherCalendar.jsx
 *
 * @description Alternative design for the dashboard widget calendar
 *
 * @requires react
 * @requires react-spring
 * @requires react-calendar
 * @requires calendar.module.scss
 *
 * @exports WeatherCalendar
 */

import React, { useState, useEffect } from "react";
import { animated, useSpring } from "react-spring";
import styles from "./calendar-window.module.scss";

const API_URL = import.meta.env.VITE_API_URL;

/**
 * WeatherCalendar first starts by establishing a connection the weather API
 * in effort to retrieve current weather data.
 *
 * @returns {JSX.Element} Calendar widget for Dashboard.jsx
 */
const WeatherCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);
  const [weather, setWeather] = useState(null);
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  /**
   * Retrieves weather data on component mount
   */
  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setWeather(data));
  }, []);

  const monthAnimation = useSpring({
    from: { opacity: 0, transform: "translateY(-50px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
  });

  const yearAnimation = useSpring({
    from: { opacity: 0, transform: "translateY(-50px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
  });

  const dayAnimation = useSpring({
    from: { opacity: 0, transform: "translateY(-50px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
  });
  const handleDateClick = (date) => {
    calendar.classList.add("slide-left");
    setSelectedDate(date);
  };
  const handlePrevMonthClick = () => setCurrentMonth(currentMonth - 1);
  const handleNextMonthClick = () => setCurrentMonth(currentMonth + 1);
  const handlePrevYearClick = () => setCurrentYear(currentYear - 1);
  const handleNextYearClick = () => setCurrentYear(currentYear + 1);

  return (
    <div className={styles.calendar}>
      <div className={styles.header}>
        {weather && (
          <>
            <span className={styles.weatherAnimation}>
              {Math.round(weather.main.temp)}°F
            </span>
            <span className={styles.weatherDesc}>
              {weather.weather[0].description}
            </span>
          </>
        )}
      </div>
      <div className={styles.monthYear}>
        <div className={styles.arrow} onClick={handlePrevYearClick}>
          &#171;
        </div>
        <animated.div style={yearAnimation} className={styles.year}>
          {currentYear}
        </animated.div>
        <div className={styles.arrow} onClick={handleNextYearClick}>
          &#187;
        </div>
        <div className={styles.arrow} onClick={handlePrevMonthClick}>
          &#171;
        </div>
        <animated.div style={monthAnimation} className={styles.month}>
          {new Date(currentYear, currentMonth).toLocaleString("default", {
            month: "long",
          })}
        </animated.div>
        <div className={styles.arrow} onClick={handleNextMonthClick}>
          &#187;
        </div>
      </div>
      <div className={styles.daysOfWeek}>
        {daysOfWeek.map((day) => (
          <div key={day} className={styles.dayOfWeek}>
            {day}
          </div>
        ))}
      </div>
      <div className={styles.daysOfMonth}>
        {Array.from(
          { length: new Date(currentYear, currentMonth + 1, 0).getDate() },
          (_, index) => {
            const date = new Date(currentYear, currentMonth, index + 1);
            const isCurrentMonth = date.getMonth() === currentMonth;
            const isSelected =
              selectedDate && date.getTime() === selectedDate.getTime();
            return (
              <animated.div
                key={date.getTime()}
                style={dayAnimation}
                className={`${styles.day} ${
                  !isCurrentMonth && styles.disabled
                } ${isSelected && styles.selected}`}
                onClick={() => handleDateClick(date)}
              >
                {index + 1}
              </animated.div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default WeatherCalendar;

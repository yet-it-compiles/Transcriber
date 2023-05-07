/**
 * @file Calendar.jsx
 *
 * @description
 *
 * @requires react
 * @requires react-calendar
 * @requires calendar.module.scss
 *
 * @exports CalendarWidget
 */

import React, { useState, useCallback } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.scss";
import styles from "./calendar.module.scss";

const CalendarWidget = ({ onDateSelect }) => {
  const [date, setDate] = useState(new Date());
  const [appointment, setAppointment] = useState(null);

  const handleDateSelect = useCallback(
    (date) => {
      setDate(date);
      if (onDateSelect) {
        onDateSelect(date);
      }
    },
    [onDateSelect]
  );

  const handleAppointmentCreate = useCallback(() => {
    setAppointment({
      date,
      time: "",
      location: "",
      reminder: "",
    });
  }, [date]);

  const handleAppointmentSave = useCallback(() => {
    console.log("Saving appointment:", appointment);
    setAppointment(null);
  }, [appointment]);

  const handleAppointmentCancel = useCallback(() => {
    setAppointment(null);
  }, []);

  const handleAppointmentChange = useCallback((field, value) => {
    setAppointment((prevAppointment) => ({
      ...prevAppointment,
      [field]: value,
    }));
  }, []);

  const isDisabled = useCallback(({ date, view }) => {
    if (view === "month") {
      return date < new Date();
    } else {
      return false;
    }
  }, []);

  return (
    <div className={styles.widgetContainer}>
      <Calendar
        value={date}
        onChange={handleDateSelect}
        calendarType="US"
        className={styles.calendar}
        tileDisabled={isDisabled}
        tileClassName={styles.calendarTile}
      />
      {appointment ? (
        <div className={styles.appointmentForm}>
          <div className={styles.formRow}>
            <label>Date:</label>
            <span>{appointment.date.toLocaleDateString()}</span>
          </div>
          <div className={styles.formRow}>
            <label>Time:</label>
            <input
              type="time"
              value={appointment.time}
              onChange={(e) => handleAppointmentChange("time", e.target.value)}
            />
          </div>
          <div className={styles.formRow}>
            <label>Location:</label>
            <input
              type="text"
              value={appointment.location}
              onChange={(e) =>
                handleAppointmentChange("location", e.target.value)
              }
            />
          </div>
          <div className={styles.formRow}>
            <label>Reminder:</label>
            <input
              type="text"
              value={appointment.reminder}
              onChange={(e) =>
                handleAppointmentChange("reminder", e.target.value)
              }
            />
          </div>
          <div className={styles.formRow}>
            <button onClick={handleAppointmentSave}>Save</button>
            <button onClick={handleAppointmentCancel}>Cancel</button>
          </div>
        </div>
      ) : (
        <div className={styles.selectedDate}>
          <div>Selected date: {date.toLocaleDateString()}</div>
          <button onClick={handleAppointmentCreate} disabled>
            Create Appointment
          </button>
        </div>
      )}
    </div>
  );
};

export default CalendarWidget;

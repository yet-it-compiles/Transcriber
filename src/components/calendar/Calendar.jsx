/**
 * @file Calendar.jsx
 *
 * @description
 *
 * @requires react
 *
 * @exports Calendar
 */

import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import googleCalendarPlugin from "@fullcalendar/google-calendar";

const Calendar = () => {
	return (
		<div  className="App" style={{ width: '340px', height: '500px' }}>
   			 <FullCalendar
        			plugins={[dayGridPlugin, googleCalendarPlugin]}
       				 initialView="dayGridMonth"
        			// googleCalendarApiKey= ''
        			// eventSources={
        			//     { googleCalendarId: };
      			/>
      		</div>
	);
};

export default Calendar;

/**
 * @file RightNavigation.jsx
 *
 * @description
 *
 * @requires react
 * @requires RightNavigation.module.css
 *
 * @exports RightNavigation
 */

import React, { useState } from 'react';
import styles from './right-nav.module.css';
import { FcGoogle, FcLeave, FcTodoList} from 'react-icons/fc';
import { MdNotificationsActive } from 'react-icons/md';
import CalendarWidget from '../../calendar-widget/CalendarWidget';

/**
 * Responsible for
 *
 * Accomplished by
 *
 * @returns {JSX.Element} -
 */
const RightNavigation = () => {
  return (
    <nav className={styles.navRight}>
      <CalendarWidget/>
       <Notifications/>
    </nav>
  );
};

/**
 * Responsible for
 *
 * Accomplished by
 *
 * @returns {JSX.Element} -
 */
const Notifications = () => {
  return (
    <div className={styles.notifications}>
      <p>Notifications</p>

      <div>
        <MdNotificationsActive/>
        <p>You Have 3 Transcripts Left To Finish!</p>
      </div>
      <span>Just Now</span>



      <div>
        <FcLeave/>
        <p>Your appointment just started</p>
      </div>
      <span><p>59 minutes ago</p></span>

      <div>
        <FcTodoList/>
        <p>Don't forget to update your calendar for next week!</p>
      </div>
      <span>12 hours ago</span>
    </div>
  );
};

export default RightNavigation;
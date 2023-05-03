/**
 * @file Dashboard.jsx
 *
 * @description
 *
 * @requires react
 *
 * @exports Dashboard
 */

import React from "react";
import LeftNavigation from "../../components/navigation/left/LeftNavigation";
import RightNavigation from "../../components/navigation/right/RightNavigation";
import DashboardHeader from "../../components/header/Header";

function Dashboard() {
  return (
    <>
      <RightNavigation />
      <DashboardHeader />
      <LeftNavigation />
    </>
  );
}

export default Dashboard;

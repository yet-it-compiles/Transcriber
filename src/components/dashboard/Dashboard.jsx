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
import LeftNavigation from "../navigation/left/LeftNavigation";
import RightNavigation from "../navigation/right/RightNavigation";
import DashboardHeader from "../dashboard-header/DashboardHeader"

function Dashboard() {
	return (
		<>
			<LeftNavigation/>
			<DashboardHeader/>
			<RightNavigation/>
		</>
	);
}

export default Dashboard;

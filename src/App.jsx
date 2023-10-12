/**
 * @file App.jsx
 *
 * @description Serves as the root component of the application that contains
 * all other components along with managing the applications state. Will
 * initialize the primary UI features.
 *
 * @requires react
 * @requires react-spring
 * @requires react-router-dom
 *
 * @exports App
 */

import React from "react";
import { animated, useTransition } from "react-spring";
import AuthContextProvider from "./context/AuthContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Settings from "./pages/settings/Settings";
import Register from "./pages/register/Register";
import SupportFAQ from "./pages/support-FAQ/SupportFAQ";
import EditTranscript from "./pages/editor/EditTranscript";
import StartRecording from "./pages/start-recording/StartRecording";
import ForgotPassword from "./pages/forgot-password/ForgotPassword";
import ProtectedRoute from "./components/protected-routes/ProtectedRoute";
import DisplayAnalytics from "./pages/display-analytics/DisplayAnalytics";

/**
 * @component AnimatedRoutes
 *
 * @description Responsible for animating the transitions between application
 * routes using the react-spring library
 *
 * @param {Route} children represents navigation routes
 *
 * @returns {JSX.Element} an animated route that applies the animations and
 * transitions
 */
const AnimatedRoutes = ({ children }) => {
  const location = useLocation();
  const transitions = useTransition(location, {
    from: { opacity: 0, transform: "translate3d(0, 20%, 0)" },
    enter: { opacity: 1, transform: "translate3d(0, 0, 0)" },
    leave: { opacity: 0, transform: "translate3d(0, -20%, 0)" },
    config: { mass: 1, tension: 540, friction: 50 },
  });

  return transitions((style, item) => (
    <animated.div style={{ ...style, position: "absolute", width: "100%" }}>
      <Routes location={item}>{children}</Routes>
    </animated.div>
  ));
};

/**
 * @component App
 *
 * @description This component is responsible for providing routes to the
 * AnimatedRoutes component above and returns animated routes when the user
 * navigates through the application.
 *
 * @returns {JSX.Element} representing an animated route
 */
 const App = () => {
  return (
    <Router>
      <AuthContextProvider>
        <AnimatedRoutes>
          <Route path="/" element={<Login />} /> 
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/forgot-password" element={<ForgotPassword />} /> 
          <Route path="/register-account" element={<Register/>}/>
          <Route path="/start-recording" element={<ProtectedRoute><StartRecording /></ProtectedRoute>} />
          <Route path="/editor" element={<ProtectedRoute><EditTranscript /></ProtectedRoute>} />
          <Route path="/display-analytics" element={<ProtectedRoute><DisplayAnalytics /></ProtectedRoute>} />
          <Route path="/support-FAQ" element={<ProtectedRoute><SupportFAQ /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        </AnimatedRoutes>
      </AuthContextProvider>
    </Router>
  );
}; 

export default App;

/**
 * @file Dashboard.jsx
 *
 * @description This component is responsible for rendering the content on the
 * dashboard.
 *
 * @requires react
 * @requires modal.module.scss
 *
 * @exports Dashboard
 */

import React from "react";
import DisplayModal from "../../components/modal/DisplayModal";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <h2> Quick Access </h2>
      {/* Define Modals */}
      <div>
        <button onClick={() => setIsModalOpen(true)}>Clients</button>
        <button>Transcripts</button>
        <button>Recordings</button>
        <button>Current Editor</button>
        <button>Downloads</button>
        <button>Recently Deleted</button>
        <DisplayModal isOpen={isModalOpen} />
      </div>

      <h2>Previews</h2>

      <h2>Recent Files</h2>
    </>
  );
};

export default Dashboard;

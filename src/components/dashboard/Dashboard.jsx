/**
 * @file Dashboard.jsx
 *
 * @description This component is responsible for rendering the content on the
 * dashboard.
 *
 * @requires react
 * @requires react-icons
 * @requires dashboard.module.scss
 *
 * @exports Dashboard
 */

import React, { useState } from "react";
import styles from "./dashboard.module.scss";
import DisplayModal from "../modal/DisplayModal";
import Widgets from "../widgets/metrics/MetricWidgets";

import { BiEdit } from "react-icons/bi";
import { HiDownload } from "react-icons/hi";
import { GiNotebook } from "react-icons/gi";
import { IoMdMicrophone } from "react-icons/io";
import { BsTrash, BsPersonVcard } from "react-icons/bs";

/**
 * Defines an object of various templates the modal can have dependent on which
 * button invokes it.
 */
const modalTemplate = {
  clients: {
    content: "Client-Title",
    body: "Client-Body",
    icon: "",
    key: 1,
  },
  transcript: {
    content: "Transcript-Title",
    body: "Client-Body",
    icon: "",
    key: 2,
  },
  edits: {
    content: "Edits-Title",
    body: "Client-Body",
    icon: "",
    key: 3,
  },
  downloads: {
    content: "Downloads-Title",
    body: "Client-Body",
    icon: "",
    key: 4,
  },
  deleted: {
    content: "Deleted-Title",
    body: "Client-Body",
    icon: "",
    key: 5,
  },
};

/**
 * @component FolderModals
 *
 * @description responsible for rendering a list of modal templates that allows
 * the presentation of information to be displayed.
 *
 * @returns a list of templates
 */
const FolderModals = () => {
  const [template, setTemplate] = useState(modalTemplate[0]);

  /**
   * Callback function that will apply the template to the modal when clicked
   */
  const handleSetTemplate = (key) => {
    const selectedTemplate = modalTemplate.find(
      (template) => template.key === key
    );
    if (selectedTemplate) {
      setTemplate(selectedTemplate);
    }
  };

  return (
    <ul>
      {modalTemplate.map((eachTemplate) => (
        <li
          key={eachTemplate.key}
          className={styles.activeModal}
          onClick={() => handleSetTemplate(eachTemplate.key)}
        >
          {eachTemplate.content}
        </li>
      ))}
    </ul>
  );
};

/**
 * @component Dashboard
 *
 * @description responsible for rendering the dashboard component
 *
 * @returns {JSX.Element} representing the contents of the dashboard
 */
const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  /**
   * @callback handleSetModal
   *
   * @description callBack function that controls the current state of the modal
   */
  const handleSetModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <div className={styles.dashboard}>
      <Widgets />
      <h2> Quick Access {isModalOpen} </h2>
      <div className={styles.btnContainers}>
        <button onClick={handleSetModal}>
          <BsPersonVcard />
          <span>Folders</span>
        </button>

        <button onClick={handleSetModal}>
          <GiNotebook />
          <span>Transcripts</span>
        </button>

        <button onClick={handleSetModal}>
          <IoMdMicrophone />
          <span>Recordings</span>
        </button>

        <button onClick={handleSetModal}>
          <BiEdit />
          <span>In-Progress</span>
        </button>

        <button onClick={handleSetModal}>
          <HiDownload />
          <span>Downloads</span>
        </button>

        <button onClick={handleSetModal}>
          <BsTrash />
          <span>Trash</span>
        </button>
      </div>

      <DisplayModal isOpen={isModalOpen} onRequestClose={handleSetModal} />

      <div>
        <h2>Transcript Previews</h2>

        <div className={styles.movie}>
          <p>Conversation with ...</p>
          <p>May 30th, 2023</p>
        </div>
      </div>

      <div>
        <h2>Currently Tracked Files</h2>
      </div>
    </div>
  );
};

export default Dashboard;

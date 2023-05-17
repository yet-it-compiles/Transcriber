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

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  /**
   * Callback function that controls the current state of the modal
   *
   * Accomplished by changing its value back and fourth by interacting with it
   */
  const handleSetModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <div className={styles.dashboard}>
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

      <h2>Previews</h2>

      <div className={styles.movie}>
        <p>Conversation with ...</p>
        <p>May 17th, 2023</p>
      </div>

      <h2>Recent Files</h2>
    </div>
  );
};

export default Dashboard;

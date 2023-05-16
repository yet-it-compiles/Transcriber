/**
 * @file Dashboard.jsx
 *
 * @description This component is responsible for rendering the content on the
 * dashboard.
 *
 * @requires react
 * @requires react-icons
 * @requires modal.module.scss
 *
 * @exports Dashboard
 */

import React, { useState } from "react";
import styles from "./dashboard.module.scss";
import DisplayModal from "../../components/modal/DisplayModal";

import { BiEdit } from "react-icons/bi";
import { HiDownload } from "react-icons/hi";
import { GiNotebook } from "react-icons/gi";
import { BsTrash, BsBodyText, BsPersonVcard } from "react-icons/bs";
import { FcFolder, FcOpenedFolder, FcDownload } from "react-icons/fc";
import { IoMdMicrophone } from "react-icons/io";

const modalTemplate = {
  clients: {
    content: "Client-Title",
    body: "Client-Body",
    key: 1,
  },
  transcript: {
    content: "Transcript-Title",
    body: "Client-Body",
    key: 2,
  },
  edits: {
    content: "Edits-Title",
    body: "Client-Body",
    key: 3,
  },
  downloads: {
    content: "Downloads-Title",
    body: "Client-Body",
    key: 4,
  },
  deleted: {
    content: "deleted-Title",
    body: "Client-Body",
    key: 5,
  },
};

const FolderModals = () => {
  const [template, setTemplate] = useState(modalTemplate[0]);

  /**
   * Callback function that
   */
  const handleSetTemplate = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <ul>
      {modalTemplate.map((eachTemplate) => (
        <li
          key={eachTemplate.key}
          className={styles.activeModal}
          onClick={handleSetTemplate}
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
   * Callback function that
   */
  const handleSetModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <div className={styles.dashboard}>
      <h2> Quick Access - {isModalOpen} </h2>

      <div className={styles.btnContainers}>
        <button onClick={handleSetModal}>
          <BsPersonVcard />
          Clients
        </button>

        <button onClick={handleSetModal}>
          <GiNotebook />
          Transcripts
        </button>

        <button onClick={handleSetModal}>
          <IoMdMicrophone />
          Recordings
        </button>

        <button onClick={handleSetModal}>
          <BiEdit />
          Current Edits
        </button>

        <button onClick={handleSetModal}>
          <HiDownload />
          Downloads
        </button>

        <button onClick={handleSetModal}>
          <BsTrash /> Recently Deleted
        </button>
      </div>

      <DisplayModal isOpen={isModalOpen} onRequestClose={handleSetModal} />

      <h2>Previews</h2>

      <h2>Recent Files</h2>
    </div>
  );
};

export default Dashboard;

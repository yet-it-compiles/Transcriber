/**
 * @file DisplayModal.jsx
 *
 * @description This module is responsible for for buidling the modal dialog
 * that is shown when a button is clicked.
 *
 * @requires react
 * @requires react-modal
 * @requires modal.module.scss
 *
 * @exports DisplayModal
 */

import React, { useState } from "react";
import styles from "./modal.module.scss";
import Modal from "react-modal";

// Accessibility feature that ensures screen readers will ignore elements outside the modal.
Modal.setAppElement(document.body);

/**
 * Defines a template modal that will be displayed when a button is clicked
 *
 * @param {isOpen} param represents the current state of the modal
 *
 * @returns a modal with the specified template state
 */
const DisplayModal = ({ isOpen, onRequestClose }) => {
  return (
    <div className={styles.modalContainer}>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="File System Modal"
        overlayClassName={styles.modalWrapper}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <h2>Your File System</h2>

        <label>File System</label>

        <br />

        <button>Submit</button>

        <br />

        <button onClick={onRequestClose}>Close</button>
      </Modal>
    </div>
  );
};

export default DisplayModal;

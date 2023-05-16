/**
 * @file DisplayModal.jsx
 *
 * @description This module is responsible for for buidling the modal dialog
 * that is shown when a button is clicked.
 *
 * @requires react
 * @requires modal.module.scss
 *
 * @exports DisplayModal
 */

import React, { useState } from "react";
import styles from "./modal.module.scss";

// Accessibility feature that ensures screen readers will ignore elements outside the modal.
Modal.setAppElement(document.body);

/**
 * Defines a template modal that will be displayed when a button is clicked
 *
 * @param {isOpen} param represents the current state of the modal
 *
 * @returns a modal with the specified template state
 */
const DisplayModal = ({ isOpen }) => {
  const [template, setTemplate] = useState(null);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={!isOpen}
      contentLabel=""
      className={styles.modalContainer}
      overlayClassName={styles.modalWrapper}
    >
      <h2>Your File System</h2>

      <label htmlFor="add-stock">File System</label>

      <input
        type="text"
        className={styles.modalWrapper}
        value={template}
        onChange={handleInputChange}
      />

      <br />

      <button onClick={handleSubmit}>Submit</button>

      <br />

      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
};

export default DisplayModal;

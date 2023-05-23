/**
 * @file Uploader.jsx
 *
 * @description This component is responsible for rendering the upload component
 * that aloows a user to upload a file to the application
 *
 * @requires react
 * @requires uploader.module.scss
 *
 * @exports Uploader
 */

import React, { useState, useEffect } from "react";
import styles from "./uploader.module.scss";

/**
 * @component Uploader
 *
 * @description responsible for rendering the component that handles uploading documents
 * to the application. This is accomplished by assigning an event listener that will update the
 * state with the meta data about the file being uploaded.
 *
 * @param {object} showOptions representing the parents state updater function
 *
 * @returns {JSX.Element} resembling the upload component
 */
const Uploader = ({ showOptions }) => {
  /**
   * @typedef {Object} documentState
   *
   * @property {File|null} file - The file being uploaded
   * @property {string|null} content - The content of the uploaded file
   * @property {string|null} error - Error message that occured during handling
   * @property {boolean} isLoading - The loading state of the file upload
   * @property {boolean} isImage - Whether or not the file is an image
   */
  const [documentState, setDocumentState] = useState({
    file: null,
    content: null,
    error: null,
    isLoading: false,
    isImage: false,
    isTranscript: false,
  });

  /**
   * @useEffect
   *
   * @description useEffect responsible for reading the contents of a file and updates the state with
   * the content or an error message.
   *
   * @param {Object} documentState The state object containing the file,
   * content, and error properties.
   */
  useEffect(() => {
    if (documentState.file) {
      setDocumentState((prevState) => ({ ...prevState, isLoading: true }));

      const reader = new FileReader();

      reader.onloadend = () => {
        setDocumentState((prevState) => ({
          ...prevState,
          content: reader.result,
          isLoading: false,
        }));
      };

      reader.onerror = () => {
        setDocumentState((prevState) => ({
          ...prevState,
          error: `There was an error trying to read from the file: ${reader.error}`,
          isLoading: false,
        }));
      };

      const isImage = documentState.file.type.startsWith("image");
      setDocumentState((prevState) => ({ ...prevState, isImage }));

      /* ! Add conditional check for audio */
      if (isImage) {
        reader.readAsDataURL(documentState.file);
      } else {
        reader.readAsText(documentState.file);
      }
    }
  }, [documentState.file]);

  /**
   * @function handleFileChange
   *
   * @description Callback function that handles changes to the file input field and updates
   * the state with the new file.
   *
   * @param {Event} fileChange - The change event triggered by the file input field.
   */
  const handleFileChange = (event) => {
    const newFile = event.target.files[0];

    if (showOptions.option) {
      showOptions.file = newFile;
    }
  };

  return (
    <section
      role="region"
      aria-labelledby="fileUploadSection"
      className={styles.container}
    >
      <h2 className={styles.title}>Upload your file</h2>

      <div className={styles.inputContainer}>
        <input
          id="fileInput"
          type="file"
          onChange={handleFileChange}
          aria-label="File upload input"
          className={styles.fileInput}
        />

        <label htmlFor="fileInput" className={styles.fileInputLabel}>
          Select a file
        </label>
      </div>
      {documentState.isLoading ? (
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>Loading...</p>
        </div>
      ) : documentState.isImage && documentState.content ? (
        <img
          src={documentState.content}
          alt="Preview"
          className={styles.imagePreview}
        />
      ) : (
        <pre className={styles.fileContent}>{documentState.content}</pre>
      )}

      {/* {documentState.isTranscript && (
        <div className={styles.fileChange}>
          <input type="file" onChange={handleFileChange} />

          {documentState.data && (
            <Transcriber
              apiToken={import.meta.env.VITE_AUTHORIZATION_1}
              file={documentState.file}
              currentTime={recordingState.currentTime}
            />
          )}
        </div>
      )} */}

      {documentState.error && (
        <div aria-label="Error message" className={styles.error}>
          Error: {documentState.error}
        </div>
      )}
    </section>
  );
};

export default Uploader;

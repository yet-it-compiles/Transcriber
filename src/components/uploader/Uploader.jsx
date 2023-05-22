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
 * Responsible for rendering the component that handles uploading documents
 * to the application
 *
 * This is accomplished by assigning an event listener that will update the
 * state with the meta data about the file being uploaded.
 *
 * @returns {JSX.Element} Representing an upload button
 */
const Uploader = () => {
  const [documentState, setDocumentState] = useState({
    file: null,
    content: null,
    error: null,
  });

  /**
   * Responsible for reading the contents of a file and updates the state with
   *  the content or an error message.
   *
   * @param {Object} documentState - The state object containing the file,
   * content, and error properties.
   */
  useEffect(() => {
    if (documentState.file) {
      const reader = new FileReader();

      reader.onloadend = (event) => {
        setDocumentState((prevState) => ({
          ...prevState,
          content: event.target.result,
        }));
      };

      reader.onerror = () => {
        setDocumentState((prevState) => ({
          ...prevState,
          error: `There was an error trying to read from the file: ${reader.error}`,
        }));
      };

      reader.readAsText(documentState.file);
    }
  }, [documentState.file]);

  /**
   * Callback function that handles changes to the file input field and updates
   * the state with the new file.
   *
   * @param {Event} fileChange - The change event triggered by the file input field.
   */
  const handleFileChange = (fileChange) => {
    const newFile = fileChange.target.files[0];
    setDocumentState((prevState) => ({
      ...prevState,
      file: newFile,
    }));
  };

  return (
    <>
      <input type="file" onChange={handleFileChange} />
      <div>{documentState.content}</div>
      {documentState.error && <div>Error: {documentState.error}</div>}
    </>
  );
};

export default Uploader;

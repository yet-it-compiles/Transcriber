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

import React, { useState } from "react";
import styles from "./uploader.module.scss";

/**
 * Responsible for rendering the component that handles uploading documents
 * to the application
 *
 * @returns {JSX.Element} An upload button
 */
const Uploader = () => {
  const [documentState, setDocumentState] = useState({
    file: false,
    data: false,
    content: false,
  });

  /**
   * Callback function that handles changing the file
   *
   * @param {File Object} newFile
   */
  const handleFileChange = (newFile) => {
    setDocumentState((prevState) => ({
      ...prevState,
      data: newFile.target.files[0],
    }));

    const fileReader = new FileReader();

    fileReader.onloadend = (newFile) => {
      const updatedContent = newFile.target.result;

      setDocumentState((prevState) => ({
        ...prevState,
        content: updatedContent,
      }));
    };
    fileReader.onerror = (fileError) => {
      console.error(
        "There was an error trying to read from the file:",
        fileError
      );
    };

    if (newFile.target.files[0]) {
      fileReader.readAsText(newFile.target.files[0]);
    }
  };

  return (
    <>
      <input type="file" onChange={handleFileChange} />
      <div>{documentState.content}</div>
    </>
  );
};

export default Uploader;

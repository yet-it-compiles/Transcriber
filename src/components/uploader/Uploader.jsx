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
import { useNavigate } from "react-router-dom";

/**
 * @component Uploader
 *
 * @description responsible for rendering the component that handles uploading documents
 * to the application. This is accomplished by assigning an event listener that will update the
 * state with the meta data about the file being uploaded.
 *
 * @returns {JSX.Element} resembling the upload component
 */
const Uploader = () => {
  /**
   * @typedef {Object} documentState
   *
   * @property {File|null} file - The file being uploaded
   * @property {string|null} content - The content of the uploaded file
   * @property {string|null} error - Error message that occured during handling
   * @property {boolean} isLoading - The loading state of the file upload
   * @property {boolean} isImage - Whether or not the file is an image
   */
  const navigate = useNavigate();
  const [documentState, setDocumentState] = useState({
    file: null,
    content: null,
    error: null,
    isLoading: false,
    isImage: false,
    isAudio: false,
    isTranscript: false,
    fontStyle: "Arial",
    fontColor: "black",
    backgroundColor: "white",
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
      const isAudio = documentState.file.type.startsWith("audio");
      const isTranscript = documentState.file.type === "text/plain";

      setDocumentState((prevState) => ({
        ...prevState,
        isImage,
        isAudio,
        isTranscript,
      }));

      if (isImage || isAudio) {
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
    setDocumentState((prevState) => ({ ...prevState, file: newFile }));
  };

  /**
   * @setStateFunction handleDragDrop
   *
   * @param {File Object} newDocument
   */
  const handleDragDrop = (newDocument) => {
    newDocument.preventDefault();

    const file = newDocument.dataTransfer.files[0];
    setDocumentState((prevState) => ({ ...prevState, file }));
  };

  const handleEscape = () => {
    if(documentState.file == null){
      navigate("/start-recording");
    }

    setDocumentState({
      file: null,
      content: null,
      error: null,
      isLoading: false,
      isImage: false,
      isAudio: false,
      isTranscript: false,
      fontStyle: "Arial",
      fontColor: "black",
      backgroundColor: "white",
    });
  };

  /**
   * @setStateFunction handleFontStyleChange
   *
   * @description State updater function that handles updating the newly selected
   * font style
   */
  const handleFontStyleChange = (event) => {
    const fontStyle = event.target.value;
    setDocumentState((prevState) => ({ ...prevState, fontStyle }));
  };

  /**
   * @setStateFunction handleFontColorChange
   *
   * @description State updater function that handles updating the newly selected
   * font color style
   */
  const handleFontColorChange = (event) => {
    const fontColor = event.target.value;
    setDocumentState((prevState) => ({ ...prevState, fontColor }));
  };

  /**
   * @setStateFunction handleBackgroundColorChange
   *
   * @description State updater function that handles updating the newly selected
   * background color change
   */
  const handleBackgroundColorChange = (event) => {
    const backgroundColor = event.target.value;
    setDocumentState((prevState) => ({ ...prevState, backgroundColor }));
  };

  return (
    <section
      role="region"
      aria-labelledby="fileUploadSection"
      className={styles.container}
      onDrop={handleDragDrop}
      onDragOver={(dragEvent) => dragEvent.preventDefault()}
    >
      <button onClick={handleEscape} className={styles.backButton}>
        🔙 Back
      </button>

      <h2 className={styles.title}>
        🎙️ Get Started: Upload Your Audio File or Transcript To Begin 📜
      </h2>

      <div className={styles.inputContainer}>
        <input
          id="fileInput"
          type="file"
          onChange={handleFileChange}
          aria-label="File upload input"
          className={styles.fileInput}
        />

        <label htmlFor="fileInput" className={styles.fileInputLabel}>
          📁 Choose Your File or Drag and Drop It Here!
        </label>
      </div>

      {documentState.isTranscript && (
        <div className={styles.transcriptOptions}>
          <h3>Customize Transcript:</h3>
          <div>
            <label>Font Style:</label>
            <select
              value={documentState.fontStyle}
              onChange={handleFontStyleChange}
            >
              <option value="Arial">Arial</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Verdana">Verdana</option>
              {/* Add more font options */}
            </select>
          </div>
          <div>
            <label>Font Color:</label>
            <input
              type="color"
              value={documentState.fontColor}
              onChange={handleFontColorChange}
            />
          </div>
          <div>
            <label>Background Color:</label>
            <input
              type="color"
              value={documentState.backgroundColor}
              onChange={handleBackgroundColorChange}
            />
          </div>
        </div>
      )}

      {documentState.isLoading ? (
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>⏳ Just a moment... We're bringing in your file! ⏳</p>
        </div>
      ) : documentState.isImage && documentState.content ? (
        <img
          src={documentState.content}
          alt="Preview"
          className={styles.imagePreview}
        />
      ) : documentState.isAudio && documentState.content ? (
        <audio controls className={styles.audioPreview}>
          <source src={documentState.content} type={documentState.file.type} />
          📢 Hmm, looks like your browser isn't jamming with us. Try another
          one? 📢
        </audio>
      ) : (
        <pre
          className={styles.fileContent}
          style={{
            fontFamily: documentState.fontStyle,
            color: documentState.fontColor,
            backgroundColor: documentState.backgroundColor,
          }}
        >
          {documentState.content}
        </pre>
      )}

      {documentState.error && (
        <div aria-label="Error message" className={styles.error}>
          🚫 Oops! An error occurred: {documentState.error} 🚫
        </div>
      )}
    </section>
  );
};

export default Uploader;

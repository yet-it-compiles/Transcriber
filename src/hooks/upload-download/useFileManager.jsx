/**
 * @file useFileManager.jsx
 *
 * @description This file is responsible for
 *
 * @requires react
 *
 * @example
 * const Uploader = ({ showOptions }) => {
 *  const { documentState, handleFileChange } = useUploader();
 *
 * @exports useFileManager
 */

import React, { useState, useEffect } from "react";

/**
 * @component useUploader
 *
 * @description Responsible for rendering the uploader custom hook
 *
 * @returns {JSX.Element} That represents the custom useUploader hook
 *
 * @throws {Error} represents an error when trying to read from the file
 */
export const useUploader = () => {
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
   * @description useEffect hook that handles reading the contents of a file
   * selected by the user and updates the state of the component.
   *
   * @throws {Error} represents an error when trying to read from the file
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
   * @description responsible for handling when the user tries to change or
   * upload a new file
   *
   * @returns {JSX.Element} That represents a new file object
   */
  const handleFileChange = (event) => {
    const newFile = event.target.files[0];
    setDocumentState((prevState) => ({
      ...prevState,
      file: newFile,
      isImage: newFile.type.startsWith("image"),
      content: null,
      error: null,
      isLoading: false,
      retrieved: null,
    }));
  };

  return {
    documentState,
    handleFileChange,
  };
};

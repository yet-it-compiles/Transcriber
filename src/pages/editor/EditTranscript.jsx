/**
 * @file EditTranscript.jsx
 *
 * @description This component is responsible for constructing the Text Editor
 * page from its related components.
 *
 * @requires react
 * @requires TextEditor
 * @requires LeftNavBar
 * @requires RightNavBar
 * @requires edit-transcript.module.scss
 *
 * @exports EditTranscript
 */

import React from "react";
import styles from "./edit-transcript.module.scss";
import TextEditor from "../../components/text-editor/TextEditor";
import LeftNavBar from "../../components/navigation/left/LeftNavBar";
import RightNavBar from "../../components/navigation/right/RightNavBar";

/**
 * Renders the text editor page and centers it on the screen
 *
 * @returns {JSX.Element} The component that represents the text editor
 */
const EditTranscript = () => {
  return (
    <div className={styles.editorContainer}>
      <LeftNavBar />
      <TextEditor />
      <RightNavBar />
    </div>
  );
};

export default EditTranscript;

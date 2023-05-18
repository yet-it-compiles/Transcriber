/**
 * @file EditTranscript.jsx
 *
 * @description
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
import LeftNavBar from "../../components/navigation/left/LeftNavBar";
import TextEditor from "../../components/text-editor/TextEditor";
import RightNavBar from "../../components/navigation/right/RightNavBar";

/**
 * Responsible for
 *
 * Accomplished by
 *
 * @returns {JSX.Element} -
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

/**
 * @file TedtEditor
 *
 * @description This component is responsible for rendering a nearly completely
 * blank text editor that can be customized from its complete default.
 *
 * @requires react
 * @requires editor2.module.css
 * @requires tinyMCE
 * @requires react-icons
 *
 * @exports TextEditor2
 */

import React from "react";
import styles from "./default.module.css";

/**
 * A simple text editor ready with no plugins or tool bars
 * @returns {JSX.Element} representing a simple text editor
 */
const DefaultEditor = () => {
    return (
        <div className={styles.container}>
            <h2
                className={styles.title}
                contentEditable="true"
                style={{ position: "relative" }}
                spellCheck="true">
                Edit The Following Transcript
            </h2>
            <br />
            <div
                className={styles.body}
                contentEditable="true"
                style={{ position: "relative" }}
                spellCheck="true">
                <br />
            </div>
        </div>
    );
};

export default DefaultEditor;

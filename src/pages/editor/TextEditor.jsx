/**
 * @file TextEditor.jsx
 *
 * @description Responsible for displaying a WYSIWYG text editor that allows
 * users to save the content of the editor along with a title.
 *
 * @requires react
 * @requires react-icons
 * @requires tinymce/tinymce-react
 * @requires text-editor.module.css
 *
 * @exports TextEditor
 */

import React, { useCallback, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import styles from "./editor.module.css";
import { FcCalendar, FcClock } from "react-icons/fc";

const PLUGIN_OPTIONS = [
  "preview",
  "searchreplace",
  "autolink",
  "directionality",
  "visualblocks",
  "visualchars",
  "fullscreen",
  "image",
  "link",
  "media",
  "template",
  "table",
  "charmap",
  "pagebreak",
  "nonbreaking",
  "anchor",
  "insertdatetime",
  "advlist",
  "lists",
  "wordcount",
  "help",
];

const TOOLBAR_OPTIONS =
  "fontselect fontsizeselect | formatselect | bold italic strikethrough | forecolor backcolor | link | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent | removeformat";

/**
 * Provides the ability to render DD|MM|YYYY and time
 *
 * @returns two formatted values for current date, and time
 */
const setCurrentDate = () => {
  const currentDate = new Date();
  const formattedTime = currentDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const formattedDate = currentDate.toLocaleDateString([], {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
  return { formattedTime, formattedDate };
};

/**
 * The file handles the responsibility of designing a new
 *
 * @returns {JSX.Element} An element representing a text editor
 */
const TextEditor = () => {
  const [content, setContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("Transcript Editor");
  const [newTitle, setNewTitle] = useState(title);

  /**
   * Callback function that handles the click-to-edit title
   */
  const handleTitleClick = useCallback(() => {
    setIsEditing(() => true);
  }, []);

  /**
   * Callback function that handles setting the new document title
   *
   * @param {event} param0 - The value the user tries to assign as the title
   */
  const handleNewTitle = useCallback((event) => {
    setNewTitle(() => event.target.value);
  }, []);

  /**
   * Callback function that handles saving the title as the document name on
   * download
   */
  const handleTitleSave = useCallback(() => {
    setTitle(() => newTitle);
    setIsEditing(() => false);
  }, [newTitle]);

  /**
   * Callback function that handles when the title editing is cancelled
   */
  const handleTitleCancel = useCallback(() => {
    setIsEditing(() => false);
    setNewTitle(() => title);
  }, [title]);

  /**
   * Callback function that handles the save document feature
   * When the document is saved, the contents of it is printed to the console
   *
   * ! Replace the console.log with the insertion to the DB logic
   */
  const handleDocumentSave = () => {};

  /**
   * Callback function that handles the ability for the document to be
   * downloaded to the users computer locally.
   *
   * type: "text/plain;charset=utf-8" - Represents the .doc and .txt extensions
   */
  const handleDownloadDocument = () => {
    const filename = `${title}.doc`;
    const fileContent = `${title}\n\n${content}`;
    const blob = new Blob([fileContent], {
      type: "text/jsx;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  const { formattedDate, formattedTime } = setCurrentDate();

  return (
    <div className={styles.editorContainer}>
      <div className={styles.title}>
        <h2>
          {isEditing ? (
            <div>
              <input
                type="text"
                value={newTitle}
                onChange={handleNewTitle}
                className={styles.titleInput}
              />
              <br />
              <button onClick={handleTitleSave} className={styles.button}>
                Change Title
              </button>
              <button onClick={handleTitleCancel} className={styles.button}>
                Cancel change
              </button>
            </div>
          ) : (
            <span onClick={handleTitleClick} className={styles.title}>
              {title}
            </span>
          )}
        </h2>
      </div>
      <div className={styles.timeStamp}>
        <span>
          <FcCalendar /> {formattedDate}
        </span>
        <span>
          <FcClock /> {formattedTime}
        </span>
      </div>
      <Editor
        apiKey={import.meta.env.VITE_EDITOR_AUTHORIZATION_1}
        value={content}
        onEditorChange={(newContent) => {
          setContent(newContent);
        }}
        init={{
          height: 900,
          menubar: true,
          plugins: PLUGIN_OPTIONS,
          toolbar: TOOLBAR_OPTIONS,
        }}
        className={styles.editor}
      />
      <div>
        <button onClick={handleDocumentSave} className={styles.button}>
          Save
        </button>
        <button onClick={handleDownloadDocument} className={styles.button}>
          Download
        </button>
      </div>
    </div>
  );
};

export default TextEditor;

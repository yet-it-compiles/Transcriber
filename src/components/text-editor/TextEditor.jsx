/**
 * @file TextEditor.jsx
 *
 * @description Responsible for displaying a WYSIWYG text editor that allows
 * users to save the content of the editor along with a title.
 *
 * @requires react
 * @requires tinymce/tinymce-react
 * @requires text-editor.module.css
 *
 * @exports TextEditor
 */

import React, { useState } from "react";
import styles from "./text-editor.module.css";
import { Editor } from "@tinymce/tinymce-react";

/**
 * Displays a WYSIWYG text editor and allows users to save the content of
 * the editor along with a title
 *
 * @returns {JSX.Element} The `TextEditor` component
 */
function TextEditor() {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");

	const handleTitleChange = (event) => {
		setTitle(event.target.value);
	};

	const handleSaveDocument = () => {
		const documentTitle = `My Document - ${title}`;

		// Prints the documentTitle and the name of the content to the console
		console.log(`Title: ${documentTitle}\nContent: ${content}`);
	};

	return (
		<div>
			<h2>My Transcript Editor</h2>
			<label htmlFor="title">Document Title:</label>
			<input
				type="text"
				id="title"
				value={title}
				onChange={handleTitleChange}
			/>
			<Editor
				apiKey=""
				value={content}
				onEditorChange={(newContent) => {
					setContent(newContent);
				}}
				init={{
					height: 500,
					menubar: false,
					plugins: [
						"advlist autolink lists link image",
						"charmap print preview anchor help",
						"searchreplace visualblocks code",
						"insertdatetime media table paste wordcount",
					],
					toolbar:
						"undo redo | formatselect | bold italic | \
            alignleft aligncenter alignright | \
            bullist numlist outdent indent | help",
				}}
			/>
			<button onClick={handleSaveDocument}>Save Transcript</button>
		</div>
	);
}

export default TextEditor;

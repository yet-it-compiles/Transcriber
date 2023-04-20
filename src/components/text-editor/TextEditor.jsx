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

import { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import styles from "./text-editor.module.css";

const TextEditor = () => {
	const [title, setTitle] = useState("Transcript Editor");
	const [content, setContent] = useState("");
	const [isEditingTitle, setIsEditingTitle] = useState(false);
	const [newTitle, setNewTitle] = useState(title);

	/**
	 * Event listener that listens to allow the user to edit the title
	 */
	const handleTitleClick = () => {
		setIsEditingTitle(true);
	};

	/**
	 * Provides the user the ability to dynamically change the name of the document
	 *
	 * @param {event} the console output to change the document title
	 */
	const handleNewTitleChange = (event) => {
		setNewTitle((event) => event.target.value);
	};

	/**
	 * Provides the user the ability to save a new document title
	 */
	const handleTitleSave = () => {
		setTitle(() => newTitle);
		setIsEditingTitle(() => false);
	};

	/**
	 * Allows the user to cancel editing the title
	 */
	const handleTitleCancel = () => {
		setIsEditingTitle(() => false);
		setNewTitle(() => title);
	};

	/**
	 *  Provides the user the ability to save and print the document to console
	 *
	 * ! Allows the ability to save the document/transcript to the DB
	 */
	const handleSaveDocument = () => {
		const documentTitle = `${title}`;
		console.log(`Title: ${documentTitle}\nContent: ${content}`);
	};

	/**
	 * @TODO - Finish functionality
	 */
	const handleDownloadDocument = () => {
		const filename = `${title}.txt`;
		const fileContent = `${title}\n\n${content}`;
		const blob = new Blob([fileContent], { type: "text/plain;charset=utf-8" });
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = filename;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	return (
		<div className={styles.container}>
			<h2>
				{isEditingTitle ? (
					<div>
						<input
							type="text"
							value={newTitle}
							onChange={handleNewTitleChange}
							className={styles.titleInput}
						/>
						<button onClick={handleTitleSave} className={styles.button}>
							Save
						</button>
						<button onClick={handleTitleCancel} className={styles.button}>
							Cancel
						</button>
					</div>
				) : (
					<span onClick={handleTitleClick} className={styles.title}>
						{title}
					</span>
				)}
			</h2>
			<Editor
				apiKey=""
				value={content}
				onEditorChange={(newContent) => {
					setContent(newContent);
				}}
				init={{
					height: 500,
					menubar: true,
					plugins: [
						"advlist autolink lists link image",
						"charmap print preview anchor help",
						"searchreplace visualblocks code",
						"insertdatetime media table paste wordcount",
						"hr",
						"code",
						"textpattern",
						"toc",
						"imagetools",
						"colorpicker",
						"fullpage",
						"media",
						"table",
						"codesample",
						"nonbreaking",
						"directionality",
						"emoticons",
						"template",
						"preview",
						"insertdatetime",
						"contextmenu",
						"noneditable",
						"tabfocus",
						"visualchars",
						"wordcount",
						"spellchecker",
						"advcode",
						"autosave",
						"autosave_restore",
						"casechange",
						"charmap",
						"emoticons",
						"mediaembed",
						"pagebreak",
						"print",
						"searchreplace",
						"textcolor",
						"visualblocks",
					],
					toolbar:
						"undo redo | formatselect | bold italic | \
				alignleft aligncenter alignright | \
				bullist numlist outdent indent | help | \
				code | hr | textpattern | toc | imagetools | \
				colorpicker | fullpage | media | table | \
				codesample | nonbreaking | directionality | \
				emoticons | template | preview | insertdatetime | \
				contextmenu | noneditable | tabfocus | \
				visualchars | wordcount | spellchecker | \
				advcode | autosave | autosave_restore | \
				casechange | charmap | emoticons | mediaembed | \
				pagebreak | print | searchreplace | \
				textcolor | visualblocks",
				}}
				className={styles.editor}
			/>
			<div>
				<button onClick={handleSaveDocument} className={styles.button}>
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

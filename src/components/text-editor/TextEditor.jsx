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

import { useCallback, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import styles from "./text-editor.module.css";

const PLUGIN_OPTIONS = [
	"code",
	"media",
	"table",
	"codesample",
	"nonbreaking",
	"directionality",
	"emoticons",
	"preview",
	"insertdatetime",
	"visualchars",
	"wordcount",
	"advcode",
	"autosave",
	"casechange",
	"emoticons",
	"mediaembed",
	"pagebreak",
	"visualblocks",
];

const TOOLBAR_OPTIONS =
	"undo redo | formatselect | bold italic | \
alignleft aligncenter alignright | \
bullist numlist outdent indent | help | \
code | hr | textpattern | toc | imagetools | \
colorpicker | media | table | \
codesample | nonbreaking | directionality | \
emoticons | preview | insertdatetime | \
contextmenu | noneditable | tabfocus | \
visualchars | wordcount | \
advcode | autosave | autosave_restore | \
casechange | charmap | emoticons | mediaembed | \
pagebreak | print | searchreplace | \
visualblocks";

const TextEditor = () => {
	const [title, setTitle] = useState("Transcript Editor");
	const [date, setDate] = useState(new Date());
	const [content, setContent] = useState("");
	const [isEditingTitle, setIsEditingTitle] = useState(false);
	const [newTitle, setNewTitle] = useState(title);

	/**
	 * Callback function that handles the click-to-edit title
	 */
	const handleTitleClick = useCallback(() => {
		setIsEditingTitle(() => true);
	}, []);

	/**
	 * Callback function that handles setting the new document title
	 *
	 * @param {event} param0 - The value the user tries to assign as the title
	 */
	const handleNewTitleChange = useCallback((event) => {
		setNewTitle(() => event.target.value);
	}, []);

	/**
	 * Callback function that handles saving the title as the document name on
	 * download
	 */
	const handleTitleSave = useCallback(() => {
		setTitle(() => newTitle);
		setIsEditingTitle(() => false);
	}, [newTitle]);

	/**
	 * Callback function that handles when the title editing is cancelled
	 */
	const handleTitleCancel = useCallback(() => {
		setIsEditingTitle(() => false);
		setNewTitle(() => title);
	}, [title]);

	/**
	 * Callback function that handles the save document feature
	 * When the document is saved, the contents of it is printed to the console
	 *
	 * @TODO
	 * ! Replace the console.log with the insertion to the DB logic
	 */
	const handleDocumentSave = useCallback(() => {
		const documentTitle = `${title}`;
		console.log(`Title: ${documentTitle}\nContent: ${content}`);
	}, [content, title]);

	/**
	 * Callback function that handles the ability for the document to be downloaded
	 * to the users computer locally.
	 *
	 * type: "text/plain;charset=utf-8" - Represents the .doc and .txt extensions
	 *
	 * @TODO - Finish .docx functionality
	 */
	const handleDownloadDocument = useCallback(() => {
		const filename = `${title}.doc`;
		const fileContent = `${title}\n\n${content}`;
		const blob = new Blob([fileContent], { type: "text/jsx;charset=utf-8" });
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = filename;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}, [content, title]);

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
						<br />
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
			<p>{date.toLocaleDateString()}</p>
			<Editor
				apiKey=""
				value={content}
				onEditorChange={(newContent) => {
					setContent(newContent);
				}}
				init={{
					height: 500,
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

const CurrentDate = () => {
	const [currentDateTime, setCurrentDateTime] = useState(new Date());

	// Updates the date every 60 seconds
	useEffect(() => {
		const timedUpdate = setInterval(() => {
			setCurrentDateTime(() => new Date());
		}, 60000);

		// clears the date during every unmount
		return () => clearInterval(() => timedUpdate);
	}, []);

	return (
		<>
			<p>{currentDateTime.toLocaleDateString()}</p>
			<p>{currentDateTime.toLocaleTimeString()}</p>
		</>
	);
};

export default TextEditor;

import React from "react";
import styles from "./header.module.css";
import importFile from "/src/assets/import-file.svg";
import notes from "/src/assets/notes.svg";
import recording from "/src/assets/recording.svg";

const Header = () => {
	return (
		<header className={styles.headerContainer}>
			<p>Dashboard Overview</p>

			<button type="button" name="import" className={styles.redButton}>
				<img src={importFile} alt="import" className={styles.icons} />
				<span>Import File</span>
			</button>

			<button type="button" name="notes">
				<img src={notes} alt="import" className={styles.icons} />
				<span>Quick Notes</span>
			</button>

			<button type="button" name="import">
				<img src={recording} alt="import" className={styles.icons} />
				<span>Quick Record</span>
			</button>

			<select className={styles.dropDown}>
				<option value="option1">This Months Statistics</option>
				<option value="option2">Todays Statistics</option>
			</select>
		</header>
	);
};

export default Header;

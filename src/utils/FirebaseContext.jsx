/**
 * @file FirebaseContext.jsx
 *
 * @description Initializes the firebase configuration and sends it to the login
 * screen
 *
 * @requires firebase/app
 * @requires getAuth
 *
 * @export getAuth
 */

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

/**
 * Instantiates the configurations for firebase
 */
const firebaseConfig = {
	apiKey: import.meta.env.VITE_API_KEY,
	authDomain: VITE_AUTHDOMAIN,
	projectId: VITE_PROJECT_ID,
	storageBucket: VITE_STORAGE_BUCKET,
	messagingSenderId: VITE_MESSAGING_SENDER_ID,
	appId: VITE_APP_ID,
	measurementId: VITE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

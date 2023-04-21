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
	//   apiKey: process.env.REACT_APP_API_KEY,
	//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	//   projectId: process.env.REACT_APP_PROJECT_ID,
	//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
	//   appId: process.env.REACT_APP_APP_ID,
	//   measurementId: "G-1WGDZNNZWV"
	apiKey: "AIzaSyCWfffZeoOFBLlXxBp-b1uwU6wMuQw9YRE",
	authDomain: "slpscribe.firebaseapp.com",
	projectId: "slpscribe",
	storageBucket: "slpscribe.appspot.com",
	messagingSenderId: "438356590245",
	appId: "1:438356590245:web:d8247f21799add29b3174c",
	measurementId: "G-1WGDZNNZWV",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

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
import React from "react";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

/**
 * Instantiates the configurations for firebase
 */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

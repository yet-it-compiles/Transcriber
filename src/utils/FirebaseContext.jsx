/**
 * @file FirebaseContext.jsx
 *
 * @description Initializes the firebase configuration and sends it to the login
 * screen
 *
 * @requires react
 * @requires firebase/app
 * @requires firebase/auth
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
  apiKey: import.meta.env.VITE_API_KEY_FIREBASE,
  authDomain: import.meta.env.VITE_AUTHDOMAIN_FIREBASE,
  projectId: import.meta.env.VITE_PROJECT_ID_FIREBASE,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET_FIREBASE,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID_FIREBASE,
  appId: import.meta.env.VITE_APP_ID_FIREBASE,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID_FIREBASE,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

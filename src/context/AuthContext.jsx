/**
 * @file AuthContext.jsx
 *
 * @description The context is responsible for sharing authentication information to
 * other components.
 *
 * @requires react
 *
 * @exports useAuth
 * @exports AuthContextProvider
 */

import React, { useState, useEffect, useContext, createContext } from "react";
import { auth } from "../utils/FirebaseContext";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  updatePassword,
  updateEmail,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";

const AuthContext = createContext({
  currentUser: null,
  register: () => Promise,
  login: () => Promise,
  resetPassword: () => Promise,
  googleLogin: () => Promise,
  signout: () => Promise,
  changeEmail: () => Promise,
  changePassword: () => Promise,
  reauthenticateWithCredential: () => Promise,
});

export const useAuth = () => useContext(AuthContext);

export default function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  function register(username, password) {
    return createUserWithEmailAndPassword(auth, username, password);
  }

  function login(username, password) {
    return signInWithEmailAndPassword(auth, username, password);
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  function googleLogin() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }

  function signout() {
    return signOut(auth);
  }

  function reAuthenticate(password) {
    let credential = EmailAuthProvider.credential(
        currentUser.email,
        password
    )

    return reauthenticateWithCredential(currentUser, credential);
  }

  function changeEmail(newEmail) {
    return updateEmail(currentUser, newEmail);
  }

  function changePassword(newPassword) {
    return updatePassword(currentUser, newPassword);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      /* console.log(currentUser); */
      setCurrentUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const value = {
    currentUser,
    register,
    login,
    resetPassword,
    googleLogin,
    signout,
    changeEmail,
    changePassword,
    reAuthenticate,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

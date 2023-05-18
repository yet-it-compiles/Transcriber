import React, { createContext, useContext, useState } from 'react';
import { auth } from '../utils/FirebaseContext';
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider

} from 'firebase/auth';

const AuthContext = createContext({
  currentUser: null,
  register: () => Promise,
  login: () => Promise,
  resetPassword: () => Promise,
  googleLogin: () => Promise,
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

  function googleLogin(){
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth,googleAuthProvider);
  }

  const value = {
    currentUser,
    register,
    login,
    resetPassword,
    googleLogin,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

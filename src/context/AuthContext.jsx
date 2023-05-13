import React, { createContext, useContext, useState } from 'react';
import { auth } from '../utils/FirebaseContext';
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from 'firebase/auth';

const AuthContext = createContext({
  currentUser: null,
  register: () => Promise,
  login: () => Promise,
  resetPassword: () => Promise,
});

export const useAuth = () => useContext(AuthContext);

export default function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  function register(username, password) {
    return createUserWithEmailAndPassword(() => auth, username, password);
  }

  function login(username, password) {
    return signInWithEmailAndPassword(auth, username, password);
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  const value = {
    currentUser,
    register,
    login,
    resetPassword,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

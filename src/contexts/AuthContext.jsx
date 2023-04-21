import {createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../utils/init-firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const AuthContext = createContext({
    currentUser: null,
    register: () => Promise,
    login: () => Promise,
})

export const useAuth = () => useContext(AuthContext);

export default function AuthContextProvider({ children }){
    const [currentUser, setCurrentUser] = useState(null)

    function register(username, password){
        return createUserWithEmailAndPassword( () =>
            auth, username, password
        );
    }

    function login(username, password){
        return signInWithEmailAndPassword(auth, username, password);
    }
    

    const value = {
        currentUser,
        register,
        login,
    }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
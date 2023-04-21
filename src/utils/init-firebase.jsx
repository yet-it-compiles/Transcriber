// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

//Configuration from environment variables
const firebaseConfig = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_APP_ID,
//   measurementId: "G-1WGDZNNZWV"
   apiKey: 'AIzaSyCWfffZeoOFBLlXxBp-b1uwU6wMuQw9YRE',
   authDomain: 'slpscribe.firebaseapp.com',
   projectId: 'slpscribe',
   storageBucket: 'slpscribe.appspot.com',
   messagingSenderId: '438356590245',
   appId: '1:438356590245:web:d8247f21799add29b3174c',
   measurementId: "G-1WGDZNNZWV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
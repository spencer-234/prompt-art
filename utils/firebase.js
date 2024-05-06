// Import the functions for accessing storage
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCWFumH2tuO8YzlRpaKq2_wkdb_LGCfvMY",
    authDomain: "prompt-art-420705.firebaseapp.com",
    projectId: "prompt-art-420705",
    storageBucket: "prompt-art-420705.appspot.com",
    messagingSenderId: "78772705848",
    appId: "1:78772705848:web:1a52b638317f127ec8a4cd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const imageStorage = getStorage(app);
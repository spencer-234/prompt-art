// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
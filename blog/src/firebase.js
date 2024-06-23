// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-d6265.firebaseapp.com",
  projectId: "mern-blog-d6265",
  storageBucket: "mern-blog-d6265.appspot.com",
  messagingSenderId: "13128073303",
  appId: "1:13128073303:web:01c386d83d8ca1c1f7a312"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
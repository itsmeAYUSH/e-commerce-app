// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC2LlVtBkweesgC17TiP1i0si1VYAbpK3Q",
    authDomain: "furniflex-6a310.firebaseapp.com",
    projectId: "furniflex-6a310",
    storageBucket: "furniflex-6a310.firebasestorage.app",
    messagingSenderId: "1013788657240",
    appId: "1:1013788657240:web:28b55df96f87e76b7f2c2d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Configure Google provider
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export default app;
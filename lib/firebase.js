// Import the functions you need from the SDKs you need
import { initializeApp, getApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Add SDKs for any other Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDo3Tf_ZJ_f5UqEeUObfqXB3YEvBWyfu4c",
  authDomain: "jailbreak-game.firebaseapp.com",
  projectId: "jailbreak-game",
  storageBucket: "jailbreak-game.appspot.com",
  messagingSenderId: "61590577330",
  appId: "1:61590577330:web:a9b4342aed525bc0b769ab",
  measurementId: "G-LVK4P1YFVL"
};

// Initialize Firebase
function createFirebaseApp(config) {
    // Checking if it has already been initalized first because Next.js will sometimes try to do it multiple times.
    try {
        return getApp();
    } catch {
        const app = initializeApp(config);
        const analytics = getAnalytics(app);
        return app;
    }
}

const firebaseApp = createFirebaseApp(firebaseConfig);


// Auth exports
export const auth = getAuth(firebaseApp);
export const googleAuthProvider = new GoogleAuthProvider();

// Firestore exports
export const firestore = getFirestore(firebaseApp);


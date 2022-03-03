// Import the functions you need from the SDKs you need
import { initializeApp, getApp } from 'firebase/app';
//import { getAnalytics, Analytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { isRunningOnServer } from './utlities';

// Add SDKs for any other Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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


// Closure approach because Next.js will sometimes try to initialize stuff multiple times.
const firebaseInitializer = (() => {    

    let initializedFirebase; // Outer func is a closure, so this will stick around

    function init(config) {
        // Checking if it has already been initalized first because Next.js will sometimes try to do it multiple times.
        if (initializedFirebase) {
            return initializedFirebase;
        } else {
            const app = initializeApp(config);
            //Analytics.isSupported().then(isSupported => isSupported ? getAnalytics(app) : null);
            const auth = getAuth(app);
            const googleAuthProvider = new GoogleAuthProvider();
            const firestore = initializeFirestore(app);
            initializedFirebase = { auth, googleAuthProvider, firestore };
            return initializedFirebase;
        }      
    }
    return init;
})();

export const { auth, googleAuthProvider, firestore } = firebaseInitializer(firebaseConfig);


// --- Initialize Firestore ---
function initializeFirestore(firebaseApp) {   
    // The Firebase hosting emulator uses the production code build.  But we want our code
    //  to connect to the Firestore emulator when we're running this locally.  This variable
    //  gives us a way to force the code to connect to the Firestore emulator even when the
    //  NODE_ENV is set to production.
    const forceUseFirestoreEmulator = process.env.NEXT_PUBLIC_USE_FIRESTORE_EMULATOR;

    // ************** TODO: **************
    //          Think through this approach more... make sure I've covered the different cases 
    //          (e.g., dev build locally, production build locally, prod build on server, etc.)
    if (!isRunningOnServer() && forceUseFirestoreEmulator) {
        // --- Connect to emulated Firestore ---
        const emulatedDB = getFirestore();
        connectFirestoreEmulator(emulatedDB, 'localhost', 8080);
        return emulatedDB;
    }
    else {
        return getFirestore(firebaseApp);
    }
}


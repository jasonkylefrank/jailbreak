import { initializeApp, getApp } from 'firebase/app';
//import { getAnalytics, Analytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, connectAuthEmulator } from 'firebase/auth';
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
            
            //const auth = getAuth(app);
            const googleAuthProvider = new GoogleAuthProvider();            
            //const firestore = initializeFirestore(app);
            
            const { auth, firestore, emulatedFirebaseServices } = initFirebaseServices(app);

            initializedFirebase = { auth, googleAuthProvider, firestore, emulatedFirebaseServices };
            return initializedFirebase;
        }      
    }
    return init;
})();

export const { auth, googleAuthProvider, firestore, emulatedFirebaseServices } = firebaseInitializer(firebaseConfig);


// --- Initialize Firebase services (besides the main app) ---
function initFirebaseServices(firebaseApp) {    
    // Note about passing-in firebaseApp to each Firebase service: I've seen people either 
    //  pass-in the initialized app reference or leave it out entirely.  After researching it,
    //  I think it is optional if you only have one Firebase app that you're working with in 
    //  your code (it seems to find your initialized app if you've already called intializeApp(config)).  
    //  See answers to my question on StackOverflow for more:  https://stackoverflow.com/questions/71356236/firebase-emulator-setup-getfirestore-or-getfirestorefirebaseapp/71356723#71356723        
    const auth = getAuth(firebaseApp);
    const firestore = getFirestore(firebaseApp);
    let emulatedFirebaseServices = null;

    function initAuthEmulator() {
        connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
        emulatedFirebaseServices.auth = true;
    }
    function initFirebaseEmulator() {
        connectFirestoreEmulator(firestore, 'localhost', 8080);
        emulatedFirebaseServices.firestore = true;
    }

    // Sometimes we want to connect a front-end production code build to Firebase emulators.
    // In that case the NODE_ENV is "production".  So this variable gives us a way to
    // force the code to connect to the Firebase emulators even if NODE_ENV is "production".
    const forceUseFirebaseEmulators = process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATORS;

    // Need to verify this is not running on the server because Next.js will try to run it there, causing problems.
    if (!isRunningOnServer() && forceUseFirebaseEmulators) {
        // --- Connect to emulators ---                
        emulatedFirebaseServices = {};
        initAuthEmulator();
        initFirebaseEmulator();
    }

    return {
        auth,
        firestore,
        emulatedFirebaseServices
    };
}


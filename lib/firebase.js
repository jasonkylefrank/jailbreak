import { initializeApp, getApp } from 'firebase/app';
//import { getAnalytics, Analytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { isRunningOnServer, doesStringEqualTrue } from './utlities';


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
            
            const googleAuthProvider = new GoogleAuthProvider();            
            
            const { auth, firestore, emulatedFirebaseServices } = initFirebaseServices(app);

            initializedFirebase = { auth, googleAuthProvider, firestore, emulatedFirebaseServices };
            return initializedFirebase;
        }      
    }
    return init;
})();

// Get config from auto-generated file
const firebaseConfig = require('../firebase-config.json').result.sdkConfig;

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
    // In that case the NODE_ENV is "production".  So NEXT_PUBLIC_USE_FIREBASE_EMULATORS gives us a
    // way to force the code to connect to the Firebase emulators even if NODE_ENV is "production".    
    const useEmulators = doesStringEqualTrue(process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATORS);
    // Need to verify this is not running on the server because Next.js will try to run it there, causing problems.
    if (!isRunningOnServer() && useEmulators) {
        console.log('about to init emulators')
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


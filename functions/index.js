const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});


exports.respondToNewUser = functions.firestore.document('users/{uid}').onCreate(
  (snap, context) => {
    console.log('New user created... ');
    console.log(snap.data());
    return null;
  });

  exports.respondToUpdatedUser = functions.firestore.document('users/{uid}').onUpdate(
    (snap, context) => {
      console.log('Existing user updated... ');
      console.log('Before the new write: ')
      console.log(snap.before.data());
      console.log('After the new write: ')
      console.log(snap.after.data());
      return null;
    });
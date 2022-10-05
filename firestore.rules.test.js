import { assert, it, describe } from 'vitest';
// import ftest from '@firebase/rules-unit-testing';
import firebase from '@firebase/rules-unit-testing';

const PROJECT_ID = process.env.NEXT_PUBLIC__FIREBASE_CONFIG__PROJECT_ID;

// TEMP
// describe("Testing simple Vitest tests", () => {
//   it("Understands basic addition", () => {
//     assert.equal(2+2, 4);
//   })
//   it("Understands subtraction", () => {
//     assert.equal(3-1, 2);
//   });
// });

describe("Users collection", async () => {
  it("Can read items if user is logged in.", () => {
    //const db = await ftest.initializeTestEnvironment()
    const db = firebase.initializeTestApp({ projectId: PROJECT_ID });
    // const db = firebase.initializeTestApp({ projectId: PROJECT_ID }).firestore();
    
    // TODO...
  });
})
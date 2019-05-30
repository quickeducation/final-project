import * as functions from 'firebase-functions';
import 'firebase/database'

const config = {
    apiKey: "AIzaSyAH7XCKlraO6k5zeoW9jCpqPgQwXBSydhw",
    authDomain: "tester-7bc61.firebaseapp.com",
    databaseURL: "https://tester-7bc61.firebaseio.com",
    projectId: "tester-7bc61",
    storageBucket: "tester-7bc61.appspot.com",
    messagingSenderId: "244317548908",
    appId: "1:244317548908:web:3bde08538be9dda7"
};

firebase.initialize

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

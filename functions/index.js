// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
var serviceAccount = require("../../key.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://tester-7bc61.firebaseio.com"
});

// // Take the text parameter passed to this HTTP endpoint and insert it into the
// // Realtime Database under the path /messages/:pushId/original
// exports.addMessage = functions.https.onRequest(async (req, res) => {
//     // Grab the text parameter.
//     const original = req.query.text;
//     // Push the new message into the Realtime Database using the Firebase Admin SDK.
//     const snapshot = await admin.database().ref('/messages').push({original: original});
//     // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
//     res.redirect(303, snapshot.ref.toString());
//   });

  // Listens for new messages added to 
exports.addSetToUserSets = functions.database.ref('/sets/{setKey}/')
.onCreate((snapshot, context) => {
  // Grab the current value of what was written to the Realtime Database.
  const original = snapshot.val();
  console.log('context param, then snapshot value', context.params.setKey, original);
  const uid = original.uid;
  const setKey = context.params.setKey;
  const numberOfQuestions = original.length;
  const newValue = { userScore:0, possibleScore:numberOfQuestions, completed:false};
  // You must return a Promise when performing asynchronous tasks inside a Functions such as
  // writing to the Firebase Realtime Database.
  

  return snapshot.ref.parent.parent.child('/user-sets/' + uid + "/" + setKey + "/").set(newValue);
});

// On account creating add their score and email to users in the database.
exports.addUserToDB = functions.auth.user().onCreate((user) => {
  return admin.database().ref('/users/' + user.uid).set({
    email: user.email,
    score:0
  });
});

// Validate user answers with https functions.
exports.validateAnswers = functions.https.onRequest(async(req, res) => {
  let uid; 
  let answers;
  let setID; 
  try {
    uid = req.body.uid;
    answers = req.body.answers;
    setID = req.body.setID;
  } catch(error) {
    res.status(400).send("Invalid request parameters.");
  }
  let actualAnswers;
  try {
    snap = await admin.database().ref(`/sets/${setID}/body/answers/`).once('value');
    actualAnswers = snap.val();
  } catch(error) {
    res.status(400).send("Invalid setID.");
  }

  if (actualAnswers.length !== answers.length) {
    res.status(400).send("Invalid setID.");
  }
  
  let correctAnswers = [];
  for (let index = 0; index < actualAnswers.length; index++) {
    if (actualAnswers[index] !== answers[index]) {
      correctAnswers.push(false);
    } else {
      correctAnswers.push(true);
    }
  }

  // Update Database...

  let result = {"correctAnswers": correctAnswers}
  
  res.status(200).send(result);
})
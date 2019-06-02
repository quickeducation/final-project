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
admin.initializeApp();

// CORS Express middleware to enable CORS Requests.
const cors = require('cors')({
  origin: true,
});

// var serviceAccount = require("../../key.json");
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://tester-7bc61.firebaseio.com"
// });


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
  cors(req, res, () => {});
  let uid; 
  let answers;
  let setID; 
  try {
    uid = req.body.uid;
    answers = req.body.answers;
    setID = req.body.setID;
  } catch(error) {
    res.status(400).send({error:"Invalid request parameters."});
    return;
  }
  let actualAnswers;
  try {
    snaps = await Promise.all([
      admin.database().ref(`/sets/${setID}/body/answers/`).once('value'),
      admin.database().ref(`/user-sets/${uid}/${setID}/userScore/`).once('value')
    ]);
    actualAnswers = snaps[0].val();
    actualAnswers.length;
  } catch(error) {
    res.status(400).send({error:"Invalid request parameters."});
    return;
  }

  if (actualAnswers.length !== answers.length) {
    res.status(400).send({error:"Invalid setID."});
    return;
  }
  
  let correctAnswers = [];
  let completed = true;
  for (let index = 0; index < actualAnswers.length; index++) {
    if (actualAnswers[index] !== answers[index]) {
      correctAnswers.push(false);
      completed = false;
    } else {
      correctAnswers.push(true);
    }
  }
  let numberOfCorrectAnswers = correctAnswers.filter(Boolean).length;

  // Update Database...
  let hasAlreadyAttempted = snaps[1].val() !== null;
  if (hasAlreadyAttempted && snaps[1].val() < numberOfCorrectAnswers) {
    if (numberOfCorrectAnswers === correctAnswers.length) {
      let update = Promise.all([
        admin.database().ref(`/users/${uid}/`).transaction((score)=> {
          if (score) {
            score++;
            return score;
          } 
          return score;
        }),
        admin.database().ref(`/user-sets/${uid}/${setID}/`).update(
          {
            completed: true,
            userScore: numberOfCorrectAnswers
          }
        )
      ]);
    } else {
      let update = await admin.database().ref(`/user-sets/${uid}/${setID}/`).update(
        {
          userScore: numberOfCorrectAnswers
        }
      );
    }
  } else if (!hasAlreadyAttempted && numberOfCorrectAnswers === correctAnswers.length) {
    let update = Promise.all([
      admin.database().ref(`/users/${uid}/`).transaction((score)=> {
        if (score) {
          score++;
          return score;
        } 
        return score;
      }),
      admin.database().ref(`/user-sets/${uid}/${setID}/`).set(
        {
          completed: true,
          userScore: numberOfCorrectAnswers,
          possibleScore: numberOfCorrectAnswers
        }
      )
    ]);
  } else if (!hasAlreadyAttempted) {
    let update = await admin.database().ref(`/user-sets/${uid}/${setID}/`).set(
      {
        completed: false,
        userScore: numberOfCorrectAnswers,
        possibleScore: correctAnswers.length
      }
    );
  }
  
  let result = {"correctAnswers": correctAnswers}  
  res.status(200).send(result);
});
// you can test functions locally with 
// firebase serve --only functions
// then if it's an https function you can use cUrl to reach the function
// and pass arguments...
// ex)  
// curl -X  -H "Content-Type:application/json" http://localhost:5001/tester-7bc61/us-central1/validateAnswers -d '{"uid":"foiniWygiRYFsdoVxCZcvvE3sBx2", "setID":"-LfvJf4q97PwKQNSd-fQ", "answers":["a cool color","6"]}'


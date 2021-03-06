// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

// CORS Express middleware to enable CORS Requests.
const cors = require('cors')({
  origin: true,
});

const crypto = require('crypto');
function hashedString(string) {
  return crypto.createHash('md5').update(string).digest('hex');
}


// var serviceAccount = require("../../key.json");
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://quickeducation442.firebaseio.com"
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
  const uid = original.uid;
  const setKey = context.params.setKey;
  const numberOfQuestions = original.length;
  const newValue = { userScore:0, possibleScore:numberOfQuestions, completed:false};
  // You must return a Promise when performing asynchronous tasks inside a Functions such as
  // writing to the Firebase Realtime Database.
  return snapshot.ref.parent.parent.child('/user-sets/' + uid + "/" + setKey + "/").set(newValue);
});



// On account creating add their score and email to users in the database.
exports.addUserToDB = functions.auth.user().onCreate(async(user) => {
  let initialDisplayName = user.email.split('@')[0];

  let snap = await admin.database().ref('users/').once('value');
  let usersInDB = snap.val()
  // I wrote this as a set of promises because this function could
  // potentially be asynchronous?
  let promises = Object.keys(usersInDB).map((userUID) => {
    let userInDB = usersInDB[userUID];
    return new Promise((resolve, reject) => {
      if (userInDB.displayName === initialDisplayName) {
        initialDisplayName = hashedString(user.uid);
      }
      resolve();
    });
  });

  let test = await Promise.all(promises);

  return admin.database().ref('/users/' + user.uid).set({
    email: user.email,
    score: 0,
    displayName: initialDisplayName
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
      console.log("has already attempted but reached highest for first time.")
      let update = Promise.all([
        admin.database().ref(`/users/${uid}`).child("score").transaction((score)=> {
          return score + 1;
        }),
        admin.database().ref(`/user-sets/${uid}/${setID}/`).update(
          {
            completed: true,
            userScore: numberOfCorrectAnswers
          }
        )
      ]);
    } else {
      console.log("didn't get max score");
      let update = await admin.database().ref(`/user-sets/${uid}/${setID}/`).update(
        {
          userScore: numberOfCorrectAnswers
        }
      );
    }
  } else if (!hasAlreadyAttempted && numberOfCorrectAnswers === correctAnswers.length) {
    console.log("New attempt and max score")
    let update = Promise.all([
      admin.database().ref(`/users/${uid}/score/`).transaction((score)=> {
        return score + 1;
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
    console.log("first attempt but not max");
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
// curl -H "Content-Type:application/json" http://localhost:5000/tester-7bc61/us-central1/validateAnswers -d '{"uid":"foiniWygiRYFsdoVxCZcvvE3sBx2", "setID":"-LgFGpxvBbZnjCAk_l8X", "answers":["2","100","58"]}'

exports.displayNameExists = functions.https.onRequest(async(req, res) => {
  cors(req, res, () => {});
  let displayName;
  let uid;
  uid = req.query.uid;
  displayName = req.query.displayName;
  if (!displayName || !uid) {
    res.sendStatus(400);
  }
  let snap = await admin.database().ref('users/').once('value');
  let users = snap.val()
  // I wrote this as a set of promises because this function could
  // potentially be asynchronous?
  let promises = Object.keys(users).map((userUID) => {
    let user = users[userUID];
    return new Promise((resolve, reject) => {
      if (user.displayName === displayName) {
        res.status(200).send(true);
        return;
      }
      resolve();
    });
  });

  let test = await Promise.all(promises);
  if (test.length === 0 && promises.length !== 0) {
    res.status(200).send(true);
  } else {


    admin.database().ref(`/users/${uid}`).child('displayName').set(displayName)
    .then(res.status(200).send(false))
    .catch(error => res.sendStatus(400))
  }
});

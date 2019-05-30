"use strict";
// Module pattern for encapsulation
(function() {
  const firebaseConfig = {
    apiKey: "AIzaSyAH7XCKlraO6k5zeoW9jCpqPgQwXBSydhw",
    authDomain: "tester-7bc61.firebaseapp.com",
    databaseURL: "https://tester-7bc61.firebaseio.com",
    projectId: "tester-7bc61",
    storageBucket: "tester-7bc61.appspot.com",
    messagingSenderId: "244317548908",
    appId: "1:244317548908:web:3bde08538be9dda7"
  };

  function $(id) {
    return document.getElementById(id);
  }

  /**
   * The ID of the currently signed-in User. We keep track of this to detect Auth state change events that are just
   * programmatic token refresh but not a User status change.
   */
  var currentUID;

  /**
   * Triggers every time there is a change in the Firebase auth state (i.e. user signed-in or user signed out).
   */
  function onAuthStateChanged(user) {
    // We ignore token refresh events.
    if (user && currentUID === user.uid) {
      return;
    }
    if (user) {
      // User is signed in.
      currentUID = user.uid;
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      $("quickstart-sign-in-status").textContent = "Signed in";
    } else {
      // User is signed out.
      attemptRedirect();
    }
  }

  // Replace confirm with alert then directly replace window location.
  // Will also need to change window location to whatever url of the sign in page is.
  function attemptRedirect() {
    let confirmAnswer = confirm(
      "You're signed out, you'll be redirected to the sign in page."
    );
    if (confirmAnswer) {
      window.location.href = "/index.html";
    } else {
      alert(
        "We probably should just redirect them, but that's annoying for testing."
      );
    }
  }

  // Not sure we need to or can validate UTF-8 string but checks length on client side.
  function isValidInput(str) {
    return str.length <= 60 && str.length > 0;
  }

  function createSetJSON(title, questions, answers) {
    let currentUser = firebase.auth().currentUser;
    let author = currentUser.email;
    if (!author) {
      author = "Anonymous";
    }
    let uid = currentUser.uid;
    let json = { author: author,body:[], title: title, uid: uid };
    for (let i = 0; i < questions.length; i++) {
        const question = questions[i].value;
        const answer = answers[i].value;
        json.body.push({question:question, answer:answer});
    }
    return json;
  }

  function writeNewSet(json) {

    // Get a key for a new set.
    var newSetKey = firebase.database().ref().child('sets').push().key;

    // Write the new sets's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/sets/' + newSetKey] = json;
    updates['/user-sets/' + json.uid + '/' + newSetKey] = json;

    return firebase.database().ref().update(updates);
  }

  window.onload = function() {
    // Listen for auth state changes
    //firebase.auth().onAuthStateChanged(onAuthStateChanged);

    $("set-form").onsubmit = function(e) {
      e.preventDefault();
      const title = $("title").value;
      if (!isValidInput(title)) {
        alert("Title length is invalid.");
        return;
      }

      const questions = document.querySelectorAll(
        'input[placeholder="Question"]'
      );
      for (let i = 0; i < questions.length; i++) {
        const questionText = questions[i].value;
        if (!isValidInput(questionText)) {
          alert("Question " + (i + 1) + "'s length  is invalid.");
          return;
        }
      }

      const answers = document.querySelectorAll('input[placeholder="Answer"]');
      for (let i = 0; i < answers.length; i++) {
        const answerText = answers[i].value;
        if (!isValidInput(answerText)) {
          alert("Answer " + (i + 1) + "'s length  is invalid.");
          return;
        }
      }

      if (questions.length !== answers.length) {
        alert("Uneven number of questions and answers");
      } else {
        const setJSON = createSetJSON(title, questions, answers);
        writeNewSet(setJSON).then((response) => {
            if (!response) {
                //alert(""); failed to add set
            }
            // set added, redirect and remove log statement.
            console.log("set added");
        });
      }
    };

    $("add-question").onclick = function() {
      let formRows = document.querySelectorAll(".form-row.form-group");
      let questionRow = formRows[formRows.length - 1].cloneNode(true);
      let numberLabel = questionRow.querySelector("label");
      numberLabel.innerHTML = parseInt(numberLabel.innerHTML) + 1 + ".)";
      let inputs = questionRow.querySelectorAll("input");
      inputs.forEach(input => {
        input.value = "";
      });
      let form = $("set-form");
      form.insertBefore(questionRow, formRows[formRows.length - 1].nextSibling);
    };
  };
})();

// New rules for database.
// {
//   "rules": {

//     "sets": {
//       ".write": "auth != null",
//       "$set_id": {
//         "author": {
//           ".read": "auth != null"
//         },
//         "body": {
//           "$question_number":{
//             "answer": {
//               ".read": "false"
//             },
//             "question": {
//               ".read": "auth != null",
//             }
//           }
//         },
//         "title": {
//           ".read": "auth != null"
//         },
//         "uid": {
//           ".read": "auth != null"
//         }
//       }
//     }
//   }
// }
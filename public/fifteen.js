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

  function $(id){
      return document.getElementById(id);
  }
  function toggleSignIn() {
    if (firebase.auth().currentUser) {
      // [START signout]
      firebase.auth().signOut();
      // [END signout]
    } else {
      var email = document.getElementById('email').value;
      var password = document.getElementById('password').value;
      if (email.length < 4) {
        alert('Please enter an email address.');
        return;
      }
      if (password.length < 4) {
        alert('Please enter a password.');
        return;
      }
      firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
        document.getElementById('quickstart-sign-in').disabled = false;
      });
    }
    //document.getElementById('quickstart-sign-in').disabled = true;
  }

  function handleSignUp() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    if (email.length < 1) {
      alert('Please enter an email address.');
      return;
    }
    if (password.length < 1) {
      alert('Please enter a password.');
      return;
    }
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == 'auth/weak-password') {
        alert('The password is too weak.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
    firebase.database().ref('users/' + firebase.auth().currentUser).set({
      email: email,
      score : 0
    });
  }

  function writeUserData(userId, email) {
    firebase.database().ref('users/' + userId).set({
      email: email,
      score : 0
    });
  }

  function writeNewSet(uid, email, title) {
    var setData = {
      author: email,
      uid: uid,
      body: '',
      title: title, 
      length: 0
    };

    // Get a key for a new set.
    var newSetKey = firebase.database().ref().child('sets').push().key;

    // Write the new sets's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/sets/' + newSetKey] = setData;
    updates['/user-sets/' + uid + '/' + newSetKey] = setData;

    return firebase.database().ref().update(updates);
  }

  function newSetForCurrentUser(title) {
    var userId = firebase.auth().currentUser.uid;
    return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
      var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
      return writeNewSet(firebase.auth().currentUser.uid, firebase.auth().currentUser.email,
        title);
    });
  }

  function newQuestionAnswer(setTitle, question, answer) {
    var userId = firebase.auth().currentUser.uid;
    return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
      var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
      return writeQA(firebase.auth().currentUser.uid, setTitle,
        question, answer);
    });
  }

  function writeQA(uid, setTitle, question, answer) {
    // Get all sets.
    var ref = firebase.database().ref().child('sets');

    // This gets every value in every set
    ref.once("value").then(function(questionsSnapshot) {
      return questionsSnapshot.forEach(function(questionSnapshot) {
        if (questionSnapshot.val().title == setTitle && questionSnapshot.val().uid == uid) {
          var updates = {};
          updates['/sets/' + String(questionSnapshot.key) + '/length'] = questionSnapshot.val().length + 1;
          updates['/user-sets/' + uid + '/' + String(questionSnapshot.key) + '/length'] = questionSnapshot.val().length + 1

          updates['/sets/' + String(questionSnapshot.key) + '/body/questions/' + questionSnapshot.val().length] = question;
          updates['/user-sets/' + uid + '/' + String(questionSnapshot.key) + '/body/questions/' + questionSnapshot.val().length] = question;

          updates['/sets/' + String(questionSnapshot.key) + '/body/answers/' + questionSnapshot.val().length] = answer;
          updates['/user-sets/' + uid + '/' + String(questionSnapshot.key) + '/body/answers/' + questionSnapshot.val().length] = answer;

          return firebase.database().ref().update(updates);
        }
       })
    });
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
        $('quickstart-sign-in-status').textContent = 'Signed in';
        $('quickstart-sign-in').textContent = 'Sign out';
        writeUserData(user.uid, user.email);
      } else {
        // User is signed out.
        currentUID = null;
        $('quickstart-sign-in-status').textContent = 'Signed out';
        $('quickstart-sign-in').textContent = 'Sign in';
      }
    $('quickstart-sign-in').disabled = false;
  }
  window.onload = function() {
    $('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
    $('quickstart-sign-up').addEventListener('click', handleSignUp, false);

    // Listen for auth state changes
    firebase.auth().onAuthStateChanged(onAuthStateChanged);

    $('set-form').onsubmit = function(e) {
      e.preventDefault();
      var title = $('new-post-title').value;
      if (title) {
        newSetForCurrentUser(title).then(function() {
        });
        //$('new-post-question').value = '';
        //$('new-post-title').value = '';
      }
    };

    $('qa-form').onsubmit = function(e) {
      e.preventDefault();
      var question = $('new-question').value;
      var answer = $('new-answer').value;
      var title = $('new-post-title').value;
      if (question && answer && title) {
        newQuestionAnswer(title, question, answer).then(function() {
        });
        $('new-question').value;
        $('new-answer').value;
      }
    };

    $('del-form').onsubmit = function(e) {
      e.preventDefault();
      var user = firebase.auth().currentUser;
      // Make the user sign in again, maybe via prompt?
      var email = document.getElementById('email').value;
      var password = document.getElementById('password').value;
      var credential = firebase.auth.EmailAuthProvider.credential(
          email,
          password
      );
      //

      user.reauthenticateWithCredential(credential).then(function() {
        var user = firebase.auth().currentUser;
        user.delete().then(function() {
          alert('Deleted user');
        }).catch(function(error) {
          alert('Could not delete the user');
        });
      }).catch(function(error) {
        alert('There was an error signing in.');
      });
    };
  };
})();
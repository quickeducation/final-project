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
  /**
   * Handles the sign in button press.
   */
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
      // Sign in with email and pass.
      // [START authwithemail]
      firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
        document.getElementById('quickstart-sign-in').disabled = false;
        // [END_EXCLUDE]
      });
      // [END authwithemail]
    }
    //document.getElementById('quickstart-sign-in').disabled = true;
  }
  /**
   * Handles the sign up button press.
   */
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
    // Sign in with email and pass.
    // [START createwithemail]
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode == 'auth/weak-password') {
        alert('The password is too weak.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
      // [END_EXCLUDE]
    });
    firebase.database().ref('users/' + firebase.auth().currentUser).set({
      email: email,
      score : 0
    });
    // [END createwithemail]
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
        // [START_EXCLUDE]
        $('quickstart-sign-in-status').textContent = 'Signed in';
        $('quickstart-sign-in').textContent = 'Sign out';
        $('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
        //writeUserData(user.uid, user.displayName, user.email, user.photoURL);
        //startDatabaseQueries();
        // [END_EXCLUDE]
      } else {
        // User is signed out.
        // [START_EXCLUDE]
        currentUID = null;
        $('quickstart-sign-in-status').textContent = 'Signed out';
        $('quickstart-sign-in').textContent = 'Sign in';
        $('quickstart-account-details').textContent = 'null';
        // [END_EXCLUDE]
      }
    // [START_EXCLUDE silent]
    $('quickstart-sign-in').disabled = false;
    // [END_EXCLUDE]
  }
  window.onload = function() {
    $('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
    $('quickstart-sign-up').addEventListener('click', handleSignUp, false);

    // Listen for auth state changes
    firebase.auth().onAuthStateChanged(onAuthStateChanged);
  };
})();
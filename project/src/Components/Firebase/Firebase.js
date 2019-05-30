import  app  from 'firebase/app';
import 'firebase/auth';
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

class Firebase {
    constructor() {
        app.initializeApp(config);
        this.auth = app.auth();
        this.db = app.database()
    }

    doCreateUserWithEmailAndPassword = (email, password) => {
        this.auth.createUserWithEmailAndPassword(email, password).catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
          } else {
            alert(errorMessage);
          }
          console.log(error);
        });
        this.db.ref('users/' + firebase.auth().currentUser).set({
          email: email,
          score : 0
        });
    }

    doSignInWithEmailAndPassword = (email, password) => {     
      this.auth.signInWithEmailAndPassword(email, password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
    }

    doSignOut = () => {
        this.auth.signOut();
    }

    isSignedIn = () => {
        return this.auth.currentUser !== null;
    }

    addProblemSet = (setJson) => {
        // Get a key for a new set.
        var newSetKey = this.db.ref().child('sets').push().key;
    
        // Write the new sets's data simultaneously in the posts list and the user's post list.
        var updates = {};
        updates['/sets/' + newSetKey] = setJson;
        updates['/user-sets/' + setJson.uid + '/' + newSetKey] = setJson;
    
        this.db.ref().update(updates);
        return newSetKey;
    }

    deleteUser = () => {
        var user = this.auth.currentUser;
        if (user) {
            user.delete().then(function() {
              let ref = this.db.ref('users/' + user.uid)
              ref.remove()
                  .then(function() {
                    console.log("Remove succeeded.")
                  })
                  .catch(function(error) {
                    console.log("Remove failed: " + error.message)
                  });
            }).catch(function(error) {
              alert('Could not delete the user');
            });
        }
    }

}

export default Firebase
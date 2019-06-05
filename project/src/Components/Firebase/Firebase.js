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
        this.db = app.database();
    }

    doCreateUserWithEmailAndPassword = (email, password) => {
        return new Promise((resolve, reject) => {
          this.auth.createUserWithEmailAndPassword(email, password).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
              alert('The password is too weak.');
              reject("The password is too weak.")
            } else {
              alert(errorMessage);
              reject(errorMessage);
            }
            console.log(error);
          });
          resolve(true);
        });
    }

    doSignInWithEmailAndPassword = (email, password) => {  
      let errorMsg = "";   
      return new Promise((resolve, reject) => {
        this.auth.signInWithEmailAndPassword(email, password).catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
            errorMsg = "Wrong password";
          } else {
            alert(errorMessage);
            errorMsg = errorMessage;
          }
          reject(errorMsg);
          console.log(error);
        });
        resolve(true)
      });
    }

    doSignOut = () => {
        return new Promise((resolve, reject) => {
          this.auth.signOut();
          resolve(true);
        });
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

        // Need to change how this is structured.
        // Only really need to add a score
        // Which should be done by the server, a firebase function
        // 
       // updates['/user-sets/' + setJson.uid + '/' + newSetKey] = setJson;
    
        this.db.ref().update(updates);
        return newSetKey;
    }

    getSetTitle = (setID) => {
        return this.db.ref('sets/' + setID + '/title').once('value')
        .then(snapshot => snapshot.val());
    }

    getSetQuestions = (setID) => {
        return this.db.ref('sets/' + setID + '/body/questions').once('value')
        .then(snapshot => snapshot.val());
    }

    getTitleAndQuestions = (setID) => {
        return [this.getSetTitle(setID), this.getSetQuestions(setID)];
    }

    validateAnswers = (answers, setID) => {
        const url = "https://us-central1-tester-7bc61.cloudfunctions.net/validateAnswers";
        let data = {uid: this.auth.currentUser.uid, setID:setID, answers:answers};
        return fetch(url, {
            method: 'Post',
            mode: 'cors',
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("Invalid Set ID.");
            }
        })
    }

    deleteUser = () => {
        var user = this.auth.currentUser;
        if (user) {
            user.delete().then(function() {
              let ref = this.db.ref('users/' + user.uid)
              ref.remove()
                  .then(function() {
                    alert("Remove succeeded.")
                  })
                  .catch(function(error) {
                    alert("Remove failed: " + error.message)
                  });
            }).catch(function(error) {
              alert('Could not delete the user');
            });
        }
    }

    returnAllUsers = () => {
        return this.db.ref('users/').once('value');
    }

    returnTopTenUsers = () => {
        return this.db.ref('users/').orderByChild('points/').limitToFirst(10).once('value');
    }

    returnAllUserSets = () => {
        return this.db.ref('user-sets/').once('value');
    }

    editUsername = (newUsername) => {
        var user = this.auth.currentUser;

        var updates = {};
        updates['/users/' + user.uid + '/email'] = newUsername;

        return this.db.ref().update(updates);
    }

}

export default Firebase;
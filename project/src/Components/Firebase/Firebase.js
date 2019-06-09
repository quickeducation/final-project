import  app  from 'firebase/app';
import 'firebase/auth';
import 'firebase/database'

const config = {
  apiKey: "AIzaSyCdpm0Ucz5-t98ChULDyBt5LpNCS8MuSGw",
  authDomain: "quickeducation442.firebaseapp.com",
  databaseURL: "https://quickeducation442.firebaseio.com",
  projectId: "quickeducation442",
  storageBucket: "",
  messagingSenderId: "78346961429",
  appId: "1:78346961429:web:844f953c58c9d556"
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
            if (errorCode === 'auth/weak-password') {
              alert('The password is too weak.');
              reject("The password is too weak.")
            } else {
              alert(errorMessage);
              reject(errorMessage);
            }
            console.log(error);
          }).then(() => {
            resolve(true)
          });
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
        }).then(() => {
          resolve(true)
        });
      });
    }

    doSignOut = () => {
        return this.auth.signOut();
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
        const url = "https://us-central1-quickeducation442.cloudfunctions.net/validateAnswers";
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
        return this.db.ref('users/').orderByChild('score/').limitToLast(10).once('value');
    }

    returnAllUserSets = () => {
        return this.db.ref('user-sets/').once('value');
    }

    editDisplayName = (newDisplayName, uid) => {
      const url = "https://us-central1-quickeducation442.cloudfunctions.net/" + 
        `displayNameExists?displayName=${newDisplayName}&uid=${uid}`;
      
      return fetch(url, {
        method: 'Post',
        mode: 'cors',
        headers:{
            'Content-Type': 'text/plain'
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

    getUserScoreNameAndEmail = (uid) => {
      return this.db.ref(`users/${uid}`).once('value');
    }



}

export default Firebase;
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

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    isSignedIn = () => {return this.auth.currentUser !== undefined;}

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
        //return [this.getSetTitle(setID), this.getSetQuestions(setID)];
        return ["title",["question1", "question2"]]
    }

}

export default Firebase
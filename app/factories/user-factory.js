'use strict';

pinterestApp.factory("UserFactory", function($q, $http, FirebaseUrl, FBCreds) {

    var config = {
        apiKey: FBCreds.key,
        authDomain: FBCreds.authDomain
    };


    firebase.initializeApp(config);

    let currentUser = null;

    let isAuthenticated = function() {
        return new Promise( (resolve, reject) => {
            firebase.auth().onAuthStateChanged( (user) => {
                if(user) {
                    currentUser = user.uid;
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
        });
    };


    let getUser = () => {
        return currentUser;
    };

    let createUser = (userObj) => {
        return firebase.auth().createUserWithEmailAndPassword(userObj.email, userObj.password)
        .catch( (err) => {
            console.log("sorry bro", err.message);
        });
    };

    let loginUser = (userObj) => {
    return $q( (resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(userObj.email, userObj.password)
      .then( (user) => {
        currentUser = user.uid;
        resolve(user);
      })
      .catch( (err) => {
        console.log("error loggin in", err.message);
      });
    });
  };

    let logoutUser = (userObj) => {
        return firebase.auth().signOut()
        .catch( (err) => {
            console.log("you can't escape sucka", err.message);
        });
    };

    console.log("firebase", firebase);

    return {isAuthenticated, getUser, createUser, loginUser, logoutUser};
});
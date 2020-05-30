import * as firebase from 'firebase/app';
import 'firebase/auth';

firebase.initializeApp({
  projectId: 'personal-projects-22d4e',
  appId: '1:179021044647:web:17a928598f7ddbaa8ef482',
  databaseURL: process.env.VUE_APP_FIREBASE_DB_URL,
  storageBucket: 'personal-projects-22d4e.appspot.com',
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: 'personal-projects-22d4e.firebaseapp.com',
  messagingSenderId: '179021044647',
  measurementId: 'G-26E1MQ632E'
});

export default {
  auth: firebase.auth(),
  login() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        console.log(result);
      })
      .catch(function(error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = error.credential;
        console.log(errorCode, errorMessage, email, credential);
      });
  },
  logout() {
    firebase
      .auth()
      .signOut()
      .then(function() {})
      .catch(function(error) {
        console.log(error);
      });
  }
};

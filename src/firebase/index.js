import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import store from '../store';

var firebaseConfig = {
  projectId: 'personal-projects-22d4e',
  appId: '1:179021044647:web:17a928598f7ddbaa8ef482',
  databaseURL: process.env.VUE_APP_FIREBASE_DB_URL,
  storageBucket: 'personal-projects-22d4e.appspot.com',
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: 'personal-projects-22d4e.firebaseapp.com',
  messagingSenderId: '179021044647',
  measurementId: 'G-26E1MQ632E'
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(user => {
  store.dispatch('persist_user', user);

  if (!user) return;

  const db = firebase.firestore();

  // Register a profile"
  db.collection('users')
    .doc(user.uid)
    .set({
      name: user.displayName,
      email: user.email,
      avator: user.photoURL
    })
    .then(function() {
      console.log('Profile successfully written!');
    })
    .catch(function(error) {
      console.error('Error writing profile document: ', error);
    });
});

export default firebase;

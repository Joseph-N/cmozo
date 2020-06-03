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
});

export default firebase;

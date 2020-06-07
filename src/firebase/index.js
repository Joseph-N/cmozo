import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/analytics';
import store from '../store';

var firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: `${process.env.VUE_APP_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  databaseURL: process.env.VUE_APP_FIREBASE_DB_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: `${process.env.VUE_APP_FIREBASE_PROJECT_ID}.appspot.com`,
  messagingSenderId: process.env.VUE_APP_FIREBASE_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
  measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

firebase.auth().onAuthStateChanged(user => {
  if (!user) return;

  store.dispatch('set_user', user);

  const user_id = user.uid;
  const lists = ['watched_by', 'liked_by', 'watchlisted_by'];

  lists.forEach(list => {
    store
      .dispatch('read_collection', { user_id, list })
      .then(() => {})
      .catch(error => console.log(error));
  });
});

export default firebase;

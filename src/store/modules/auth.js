import firebase from '../../firebase';

const state = {
  user: {
    uid: null,
    email: null,
    name: '',
    avator: ''
  }
};

const getters = {
  userLoggedIn: state => !!state.user.uid && !!state.user.email,
  currentUser: state => state.user
};

const actions = {
  async login_with_google({ commit }) {
    const provider = new firebase.auth.GoogleAuthProvider();
    const response = await firebase.auth().signInWithPopup(provider);
    commit('AUTH_SUCCESS', response.user);
  },
  async set_user({ commit }, user) {
    const uid = user.uid;
    const email = user.email;
    const name = user.displayName;
    const avator = user.photoURL;

    const profile = { uid, email, name, avator };

    // Register a user"
    const db = firebase.firestore();
    await db
      .collection('users')
      .doc(uid)
      .set(profile, { merge: true });

    commit('AUTH_SUCCESS', profile);
  },
  async logout_user({ commit }) {
    await firebase.auth().signOut();
    commit('LOGOUT');
  }
};

const mutations = {
  AUTH_SUCCESS: (state, user) => {
    state.user = user;
  },
  LOGOUT: state => {
    state.user = {
      uid: null,
      email: null,
      name: '',
      avator: ''
    };
  }
};

export default {
  state: state,
  getters: getters,
  actions: actions,
  mutations: mutations
};

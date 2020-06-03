import firebase from '../../firebase';

const state = {
  user: {
    uid: null,
    email: null,
    name: '',
    photoURL: ''
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
  async persist_user({ commit }, user) {
    if (!user) return;
    await commit('AUTH_SUCCESS', user);
  },
  async logout_user({ commit }) {
    await firebase.auth().signOut();
    commit('LOGOUT');
  }
};

const mutations = {
  AUTH_SUCCESS: (state, { displayName, email, uid, photoURL }) => {
    state.user.uid = uid;
    state.user.email = email;
    state.user.name = displayName;
    state.user.photoURL = photoURL;
  },
  LOGOUT: state => {
    state.user = {
      uid: null,
      email: null,
      name: '',
      photoURL: ''
    };
  }
};

export default {
  state: state,
  getters: getters,
  actions: actions,
  mutations: mutations
};

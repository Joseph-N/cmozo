import firebase from '../../firebase';
import { dateHelpers } from '../../js/lib';

const state = {
  movies: [],
  shows: [],
  profile: {}
};

const getters = {
  userMovies: state => state.movies,
  userShows: state => state.shows,
  userProfile: state => state.profile
};

const actions = {
  async get_profile({ commit }, user_id) {
    const db = firebase.firestore();

    const doc = await db
      .collection('users')
      .doc(user_id)
      .get();
    if (doc.exists) {
      const profile = doc.data();
      commit('SET_PROFILE', profile);
    }
  },
  async add_to_collection({ commit }, { collection, details }) {
    const user_id = this.state.Auth.user.uid;
    const genres = details.genres.map(g => g.id);
    const year = dateHelpers.toTimestamp(details.first_air_date || details.release_date);
    const poster_path = details.poster_path;
    const id = details.id;
    const name = details.name || details.title;

    // Atomically add a new user_id to the "user_ids" array field.
    const user_ids = firebase.firestore.FieldValue.arrayUnion(user_id);
    const payload = { id, name, poster_path, year, genres, user_ids };

    const db = firebase.firestore();
    const collectionRef = db.collection(collection).doc(`${id}`);

    await collectionRef.set(payload, { merge: true });

    // remove users_ids key
    delete payload.user_ids;

    commit('ADD_TO_COLLECTION', { collection, payload });
  },
  async remove_from_collection({ commit, state }, { collection, details }) {
    let movies = state.movies;
    let shows = state.shows;

    const user_id = this.state.Auth.user.uid;

    const db = firebase.firestore();
    const collectionRef = db.collection(collection).doc(`${details.id}`);

    // Atomically remove the user_id from the "user_ids" array field.
    await collectionRef.update({
      user_ids: firebase.firestore.FieldValue.arrayRemove(user_id)
    });

    if (collection == 'movies') {
      movies = movies.filter(movie => movie.id !== details.id);
    }
    if (collection == 'shows') {
      shows = shows.filter(show => show.id !== details.id);
    }

    commit('UPDATE_COLLECTION', { movies, shows });
  },
  async read_collection({ commit }, user_id) {
    let movies = [];
    let shows = [];

    const db = firebase.firestore();

    let moviesQuery = db.collection('movies').where('user_ids', 'array-contains', user_id);
    await moviesQuery
      .orderBy('year', 'desc')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          movies.push(doc.data());
        });
      });

    let showsQuery = db.collection('shows').where('user_ids', 'array-contains', user_id);
    await showsQuery
      .orderBy('year', 'desc')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          shows.push(doc.data());
        });
      });

    commit('UPDATE_COLLECTION', { movies, shows });
  },
  async reset_collection({ commit }) {
    await commit('RESET_COLLECTION');
  }
};

const mutations = {
  ADD_TO_COLLECTION: (state, { collection, payload }) => {
    state[collection].push(payload);
  },
  UPDATE_COLLECTION: (state, { movies, shows }) => {
    state.movies = movies;
    state.shows = shows;
  },
  RESET_COLLECTION: state => {
    state.movies = [];
    state.shows = [];
    state.profile = {};
  },
  SET_PROFILE: (state, profile) => {
    state.profile = profile;
  }
};

export default {
  state: state,
  getters: getters,
  actions: actions,
  mutations: mutations
};

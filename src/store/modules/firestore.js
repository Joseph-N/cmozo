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
  userProfile: state => state.profile,
  hasMovie: state => id => state.movies.map(movie => movie.id).includes(id),
  hasShow: state => id => state.shows.map(show => show.id).includes(id)
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
    // const timestamp = dateHelpers.currTimestamp();

    // Atomically add a new user_id to the "watched_by_ids" array field.
    const watched_by_ids = firebase.firestore.FieldValue.arrayUnion(user_id);
    const payload = {
      id,
      name,
      poster_path,
      year,
      genres,
      watched_by_ids
    };

    const db = firebase.firestore();
    const collectionRef = db.collection(collection).doc(`${id}`);

    await collectionRef.set(payload, { merge: true });

    const userRef = db.collection('users').doc(user_id);
    const increment = firebase.firestore.FieldValue.increment(1);
    const incrementPayload = {
      [collection]: increment
    };
    // Update  count
    await userRef.update(incrementPayload);

    // remove users_ids key
    delete payload.watched_by_ids;

    commit('ADD_TO_COLLECTION', { collection, payload });
  },
  async remove_from_collection({ commit, state }, { collection, details }) {
    let movies = state.movies;
    let shows = state.shows;

    const user_id = this.state.Auth.user.uid;

    const db = firebase.firestore();
    const collectionRef = db.collection(collection).doc(`${details.id}`);

    // Atomically remove the user_id from the "watched_by_ids" array field.
    await collectionRef.update({
      watched_by_ids: firebase.firestore.FieldValue.arrayRemove(user_id)
    });

    const userRef = db.collection('users').doc(user_id);
    const decrement = firebase.firestore.FieldValue.increment(-1);
    const decrementPayload = {
      [collection]: decrement
    };
    // Update count
    await userRef.update(decrementPayload);

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

    let moviesQuery = db.collection('movies').where('watched_by_ids', 'array-contains', user_id);
    await moviesQuery
      .orderBy('year', 'desc')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          movies.push(doc.data());
        });
      });

    let showsQuery = db.collection('shows').where('watched_by_ids', 'array-contains', user_id);
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

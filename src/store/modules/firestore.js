import firebase from '../../firebase';
import { dateHelpers, arraysHelpers } from '../../helpers';

const state = {
  movies: [],
  shows: [],
  profile: {},
  lists: ['watched_by', 'liked_by', 'watchlisted_by']
};

const getters = {
  userMovies: state => state.movies.sort(arraysHelpers.byYear),
  userShows: state => state.shows.sort(arraysHelpers.byYear),
  userProfile: state => state.profile,
  watchedMovies: (state, getters) => getters.userMovies.filter(movie => movie.watched),
  likedMovies: (state, getters) => getters.userMovies.filter(movie => movie.liked),
  watchListedMovies: (state, getters) => getters.userMovies.filter(movie => movie.watchlisted),
  watchedShows: (state, getters) => getters.userShows.filter(show => show.watched),
  likedShows: (state, getters) => getters.userShows.filter(show => show.liked),
  watchListedShows: (state, getters) => getters.userShows.filter(show => show.watchlisted)
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
  async add_to_collection({ commit, state }, { collection, details, list }) {
    const user_id = this.state.Auth.user.uid;
    const year = details.year ? details.year : dateHelpers.toTimestamp(details.first_air_date || details.release_date);
    const poster_path = details.poster_path;
    const id = details.id;
    const name = details.name || details.title;
    const key = list.match(/(.*)_by/)[1];
    let genres = [];

    if (details.genres) {
      genres = typeof details.genres[0] == 'number' ? details.genres : details.genres.map(g => g.id);
    } else {
      genres = [...details.genre_ids];
    }

    let payload = { id, name, poster_path, year, genres };

    // if user has watched the movie remove it from watchlist
    if (list == 'watched_by') {
      payload.watchlisted_by = firebase.firestore.FieldValue.arrayRemove(user_id);
    }

    // Atomically add a new user_id to the provided list
    payload[list] = firebase.firestore.FieldValue.arrayUnion(user_id);

    const db = firebase.firestore();
    const collectionRef = db.collection(collection).doc(`${id}`);

    await collectionRef.set(payload, { merge: true });

    const userRef = db.collection('users').doc(user_id);
    const incrementPayload = {
      [`${key}_${collection}_count`]: firebase.firestore.FieldValue.increment(1)
    };
    // Update  count
    await userRef.update(incrementPayload);

    // remove key
    delete payload[list];

    payload[key] = true;

    const items = state[collection];
    const itemIndex = items.findIndex(item => item.id == id);

    // item not found. Add it to our array

    if (itemIndex === -1) {
      // if user marks item as watched, remove it from watchlist
      if (list == 'watched_by') {
        delete payload.watchlisted_by;
        payload.watchlisted = false;
      }
      commit('ADD_TO_COLLECTION', { collection, payload });
    } else {
      // update object in array
      payload = { ...items[itemIndex], [key]: true };

      // if user marks item as watched, remove it from watchlist
      if (list == 'watched_by') {
        delete payload.watchlisted_by;
        payload.watchlisted = false;
      }

      commit('UPDATE_COLLECTION', { collection, id, payload });
    }
  },
  async remove_from_collection({ commit, state }, { collection, details, list }) {
    const id = details.id;
    const user_id = this.state.Auth.user.uid;
    const key = list.match(/(.*)_by/)[1];

    const db = firebase.firestore();
    const collectionRef = db.collection(collection).doc(`${details.id}`);

    // Atomically remove the user_id from the given list array field.
    await collectionRef.update({
      [list]: firebase.firestore.FieldValue.arrayRemove(user_id)
    });

    const userRef = db.collection('users').doc(user_id);
    const decrementPayload = {
      [`${key}_${collection}_count`]: firebase.firestore.FieldValue.increment(-1)
    };
    await userRef.update(decrementPayload);

    const items = state[collection];
    // find item index in arry
    const itemIndex = items.findIndex(item => item.id == id);

    // update object in array
    const payload = { ...items[itemIndex], [key]: false };

    commit('UPDATE_COLLECTION', { collection, id, payload });
  },
  async read_collection({ commit, state }, { user_id, list }) {
    let movies = state.movies;
    let shows = state.shows;

    const db = firebase.firestore();

    const moviesRef = db.collection('movies');
    let moviesQuery = moviesRef.where(list, 'array-contains', user_id);
    await moviesQuery
      .orderBy('year', 'desc')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          // tag movie
          const key = list.match(/(.*)_by/)[1];
          const movie = doc.data();

          // remove _by keys. cleanup object
          state.lists.forEach(list => {
            delete movie[list];
          });

          // find movie in our collection
          const movieIndex = movies.findIndex(currMovie => currMovie.id == movie.id);
          if (movieIndex === -1) {
            // movie not found. Add it to our array
            movie[key] = true;
            movies.push(movie);
          } else {
            // movie found. Update object
            movies[movieIndex] = { ...movies[movieIndex], [key]: true };
          }
        });
      });

    let showsQuery = db.collection('shows').where(list, 'array-contains', user_id);
    await showsQuery
      .orderBy('year', 'desc')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          // tag show
          const key = list.match(/(.*)_by/)[1];
          const show = doc.data();

          // remove _by keys. cleanup object
          state.lists.forEach(list => {
            delete show[list];
          });

          // find show in our collection
          // https://medium.com/javascript-in-plain-english/react-updating-a-value-in-state-array-7bae7c7eaef9
          const showIndex = shows.findIndex(currShow => currShow.id == show.id);
          if (showIndex === -1) {
            // show not found. Add it to our array
            show[key] = true;
            shows.push(show);
          } else {
            // show found. Update object
            shows[showIndex] = { ...shows[showIndex], [key]: true };
          }
        });
      });

    commit('SET_COLLECTION', { movies, shows });
  },
  async reset_collection({ commit }) {
    await commit('RESET_COLLECTION');
  }
};

const mutations = {
  ADD_TO_COLLECTION: (state, { collection, payload }) => {
    state[collection].push(payload);
  },
  UPDATE_COLLECTION: (state, { collection, id, payload }) => {
    // make the update reactive
    // https://vuex.vuejs.org/guide/mutations.html#mutations-follow-vue-s-reactivity-rules
    state[collection] = [...state[collection].filter(item => item.id !== id), payload];
  },
  SET_COLLECTION: (state, { movies, shows }) => {
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

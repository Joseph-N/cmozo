<template>
  <div class="row">
    <div class="col-md-12">
      <h4 class="mb-3 text-gray-900">
        My Movies
        <small style="font-size: 13px;">
          <router-link :to="{ name: 'UserMovies', params: { id: currentUser.uid } }">
            View All
          </router-link>
        </small>
      </h4>
      <Previews :collection="movies" type="Movie" layout="single" v-if="movies.length" />
      <p v-else>It's lonely here...sign in to add movies to your collection</p>
    </div>

    <div class="col-md-12 mt-4">
      <h4 class="mb-3 text-gray-900">
        My Shows
        <small style="font-size: 13px;">
          <router-link :to="{ name: 'UserShows', params: { id: currentUser.uid } }">
            View All
          </router-link>
        </small>
      </h4>
      <Previews :collection="shows" type="TV" layout="single" v-if="shows.length" />
      <p v-else>It's lonely here...sign in to add shows to your collection</p>
    </div>
  </div>
</template>

<script>
import Previews from '@/components/Previews';
import firebase from '../firebase';
import { mapGetters } from 'vuex';

export default {
  name: 'Home',
  components: {
    Previews
  },
  data() {
    return {
      movies: [],
      shows: []
    };
  },
  methods: {
    readFromFirestore() {
      if (!this.userLoggedIn) return;
      const vm = this;
      const db = firebase.firestore();
      const userID = this.currentUser.uid;

      let moviesQuery = db.collection('movies').where('user_id', '==', userID);

      moviesQuery
        .orderBy('timestamp', 'desc')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            vm.movies.push(doc.data());
          });
        });

      let showsQuery = db.collection('shows').where('user_id', '==', userID);

      showsQuery
        .orderBy('timestamp', 'desc')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            vm.shows.push(doc.data());
          });
        });
    }
  },
  created() {
    this.readFromFirestore();
  },
  computed: {
    ...mapGetters(['userLoggedIn', 'currentUser'])
  },
  watch: {
    userLoggedIn: function(val) {
      if (val) {
        this.readFromFirestore();
      } else {
        this.movies = [];
        this.shows = [];
      }
    }
  }
};
</script>

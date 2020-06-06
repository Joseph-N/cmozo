<template>
  <div class="row">
    <div class="col-md-12">
      <h4 class="mb-3 text-gray-900">{{ userProfile.name }} Watchlist</h4>
      <Previews :collection="watchListedMovies" type="Movie" layout="multi" />
    </div>
    <div class="col-md-12">
      <h4 class="mb-3 text-gray-900">{{ userProfile.name }} Liked</h4>
      <Previews :collection="likedMovies" type="Movie" layout="multi" />
    </div>
    <div class="col-md-12">
      <h4 class="mb-3 text-gray-900">{{ userProfile.name }} Watched</h4>
      <Previews :collection="watchedMovies" type="Movie" layout="multi" />
    </div>
  </div>
</template>
<script>
import Previews from '../../components/Previews';
import { mapGetters } from 'vuex';

export default {
  name: 'UserMovies',
  components: {
    Previews
  },
  methods: {
    getProfile() {
      const user_id = this.$route.params.user_id;

      this.$store
        .dispatch('get_profile', user_id)
        .then(() => {})
        .catch(error => console.log(error));
    }
  },
  created() {
    this.getProfile();
  },
  computed: {
    ...mapGetters(['currentUser', 'userProfile', 'watchListedMovies', 'likedMovies', 'watchedMovies'])
  }
};
</script>

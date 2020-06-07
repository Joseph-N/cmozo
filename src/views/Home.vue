<template>
  <div class="row">
    <div class="col-md-12">
      <h4 class="mb-3 text-gray-900">
        My Movies
        <small style="font-size: 13px;" v-if="userLoggedIn">
          <router-link :to="{ name: 'user-movies', params: { user_id: currentUser.uid } }">View All</router-link>
        </small>
      </h4>
      <Previews
        :collection="userMovies.slice(0,10)"
        type="movie"
        layout="single"
        v-if="userMovies.length"
      />
      <p v-else>It's lonely here...sign in to add movies to your collection</p>
    </div>

    <div class="col-md-12 mt-4">
      <h4 class="mb-3 text-gray-900">
        My Shows
        <small style="font-size: 13px;" v-if="userLoggedIn">
          <router-link :to="{ name: 'user-shows', params: { user_id: currentUser.uid } }">View All</router-link>
        </small>
      </h4>
      <Previews
        :collection="userShows.slice(0,10)"
        type="show"
        layout="single"
        hasMore
        v-if="userShows.length"
      />
      <p v-else>It's lonely here...sign in to add shows to your collection</p>
    </div>
  </div>
</template>

<script>
import Previews from '@/components/Previews';
import { mapGetters } from 'vuex';

export default {
  name: 'Home',
  components: {
    Previews
  },
  methods: {},
  computed: {
    ...mapGetters(['userLoggedIn', 'currentUser', 'userShows', 'userMovies'])
  }
};
</script>

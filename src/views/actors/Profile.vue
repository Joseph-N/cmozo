<template>
  <div class="row">
    <div class="col-md-3">
      <img :src="imagePath('w500', profile.profile_path)" class="img-fluid rounded" />
    </div>
    <div class="col-md-9">
      <h1 class="mb-4">{{ profile.name }}</h1>
      <h4>Biography</h4>
      <p>{{ profile.biography }}</p>
    </div>
    <div class="col-12">
      <h4 class="mt-3 mb-4">Movies</h4>
      <Previews :collection="actorMovies" type="movie" layout="single" />
    </div>

    <div class="col-12">
      <h4 class="mt-3 mb-4">Tv</h4>
      <Previews :collection="actorTv" type="show" layout="single" />
    </div>
  </div>
</template>

<script>
import { tmdbPeople } from '@/tmdb';
import { urlHelpers, arraysHelpers } from '@/helpers';
import Previews from '@/components/Previews';

export default {
  name: 'Profile',
  components: {
    Previews
  },
  data() {
    return {
      profile: {
        combined_credits: {
          cast: []
        }
      }
    };
  },
  methods: {
    getProfile(id) {
      tmdbPeople.profile(id).then(response => (this.profile = response));
    },
    imagePath(size, path) {
      if (!path) return 'https://via.placeholder.com/500x750';
      return urlHelpers.tmdbUrl(size, path);
    }
  },
  computed: {
    actorMovies() {
      const movies = this.profile.combined_credits.cast.filter(result => result.media_type === 'movie');
      const uniqMovies = arraysHelpers.uniq(movies);
      return uniqMovies
        .sort(arraysHelpers.byPopularity)
        .slice(0, 15)
        .sort(arraysHelpers.byYear); // top 6
    },
    actorTv() {
      const shows = this.profile.combined_credits.cast.filter(
        result => result.media_type === 'tv' && result.character != '' && result.poster_path != null
      );
      const uniqShows = arraysHelpers.uniq(shows);

      return uniqShows
        .sort(arraysHelpers.byPopularity)
        .slice(0, 15)
        .sort(arraysHelpers.byYear); // top 6
    }
  },
  created() {
    this.getProfile(this.$route.params.id);
  },
  beforeRouteUpdate(to, from, next) {
    tmdbPeople.profile(to.params.id).then(response => {
      this.profile = response;
      next();
    });
  }
};
</script>
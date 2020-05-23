<template>
  <div>
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    >
      <h1 class="h2">Profile</h1>
      <div class="btn-toolbar mb-2 mb-md-0">
        <div class="btn-group mr-2">
          <button type="button" class="btn btn-sm btn-outline-secondary">Share</button>
          <button type="button" class="btn btn-sm btn-outline-secondary">Export</button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-3">
        <img :src="imagePath('w500', profile.profile_path)" class="img-fluid rounded" />
      </div>
      <div class="col-9">
        <h1 class="mb-4">{{ profile.name }}</h1>
        <h4>Biography</h4>
        <p>{{ profile.biography }}</p>
      </div>
      <div class="col-12">
        <h4 class="mt-3 mb-4">Movies</h4>
        <Previews :collection="actorMovies" type="Movie" />
        <h4 class="mt-3 mb-4">Tv</h4>
        <Previews :collection="actorTv" type="TV" />
      </div>
    </div>
  </div>
</template>

<script>
import { tmdbPeople } from '../../tmdb';
import { urlHelpers, arraysHelpers } from '../../js/lib';
import Previews from '../../components/Previews';

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
    },
    byYear: (a, b) => {
      const key = a.media_type === 'movie' ? 'release_date' : 'first_air_date';
      const year1 = a[key];
      const year2 = b[key];

      let comparison = 0;
      if (year1 > year2) {
        comparison = -1; // descending order
      } else if (year1 < year2) {
        comparison = 1;
      }
      return comparison;
    },
    byPopularity: (a, b) => {
      const score1 = a.popularity;
      const score2 = b.popularity;

      let comparison = 0;
      if (score1 > score2) {
        comparison = -1; // descending order
      } else if (score1 < score2) {
        comparison = 1;
      }
      return comparison;
    }
  },
  computed: {
    actorMovies() {
      const movies = this.profile.combined_credits.cast.filter(result => result.media_type === 'movie');
      const uniqMovies = arraysHelpers.uniq(movies);
      return uniqMovies
        .sort(this.byPopularity)
        .slice(0, 7)
        .sort(this.byYear); // top 6
    },
    actorTv() {
      const shows = this.profile.combined_credits.cast.filter(
        result => result.media_type === 'tv' && result.character != '' && result.poster_path != null
      );
      const uniqShows = arraysHelpers.uniq(shows);

      return uniqShows
        .sort(this.byPopularity)
        .slice(0, 7)
        .sort(this.byYear); // top 6
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
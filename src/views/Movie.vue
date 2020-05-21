<template>
  <div>
    <Hero :details="movie" :type="'movie'" v-if="!isEmpty(movie)" />
    <div class="row mt-4">
      <div class="col-md-9">
        <h4 class="mb-3">Casts</h4>
        <Casts :casts="movie.credits.cast" v-if="movie.credits" />
      </div>
      <div class="col-md-3">
        <external-links :ids="movie.external_ids" :homepage="movie.homepage" />
        <Details :facts="facts" />
      </div>
    </div>
  </div>
</template>
<script>
import { tmdbMovies } from '../tmdb';
import Casts from '../components/Casts';
import ExternalLinks from '../components/ExternalLinks';
import Details from '../components/Details';
import Hero from '../components/Hero';

export default {
  name: 'Movie',
  components: {
    Casts,
    ExternalLinks,
    Details,
    Hero
  },
  data() {
    return {
      movie: {},
      colors: []
    };
  },
  created() {
    this.movieDetails(this.$route.params.id);
  },
  beforeRouteUpdate(to, from, next) {
    tmdbMovies.get(to.params.id).then(response => {
      this.movie = response;
      next();
    });
  },
  methods: {
    movieDetails(id) {
      tmdbMovies.get(id).then(response => {
        this.movie = response;
      });
    },
    isEmpty(obj) {
      return Object.keys(obj).length === 0;
    }
  },
  computed: {
    facts() {
      // https://stackoverflow.com/questions/17781472/how-to-get-a-subset-of-a-javascript-objects-properties
      let unwrap = function({ status, original_language, budget, revenue }) {
        return { status, original_language, budget, revenue };
      };
      return unwrap(this.movie);
    }
  }
};
</script>


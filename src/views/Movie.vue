<template>
  <div>
    <Hero :details="movie" :type="'movie'" v-if="!isEmpty(movie)" />
    <div class="row mt-5">
      <div class="col-md-9">
        <h2 class="mb-3 text-gray-900 h3">Casts</h2>
        <Casts :casts="movie.credits.cast" v-if="movie.credits" />
      </div>
      <div class="col-md-3">
        <external-links :ids="movie.external_ids" :homepage="movie.homepage" />
        <Details :facts="facts" />
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-md-12">
        <h2 class="mb-3 text-gray-900 h3">Similar Movies</h2>
        <Previews :collection="similarMovies" type="Movie" layout="single" />
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
import Previews from '../components/Previews';

export default {
  name: 'Movie',
  components: {
    Casts,
    ExternalLinks,
    Details,
    Hero,
    Previews
  },
  data() {
    return {
      movie: {
        similar: {
          results: []
        }
      },
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
    },
    byYear: (a, b) => {
      const year1 = a.release_date;
      const year2 = b.release_date;

      let comparison = 0;
      if (year1 > year2) {
        comparison = -1; // descending order
      } else if (year1 < year2) {
        comparison = 1;
      }
      return comparison;
    }
  },
  computed: {
    facts() {
      // https://stackoverflow.com/questions/17781472/how-to-get-a-subset-of-a-javascript-objects-properties
      let unwrap = function({ status, original_language, budget, revenue }) {
        return { status, original_language, budget, revenue };
      };
      return unwrap(this.movie);
    },
    similarMovies() {
      return this.movie.similar.results
        .slice()
        .sort(this.byYear)
        .slice(0, 10);
    }
  }
};
</script>


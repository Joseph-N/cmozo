<template>
  <div>
    <Hero :details="movie" :type="'movie'" v-if="!isEmpty(movie)" />
    <div class="row mt-5">
      <div class="col-md-9">
        <h2 class="mb-3 text-gray-900 h3">Casts</h2>
        <Casts :casts="movie.credits.cast" v-if="movie.credits" />
      </div>
      <div class="col-md-3 text-gray-900">
        <external-links :ids="movie.external_ids" :homepage="movie.homepage" />
        <Details :facts="facts" />
      </div>
    </div>
    <div class="row mt-4" v-if="similarMovies.length > 0">
      <div class="col-md-12">
        <h4 class="mb-3 text-gray-900">Similar Movies</h4>
        <Previews
          :collection="similarMovies.slice(0,15)"
          type="movie"
          layout="single"
          :extras="extras"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { tmdbMovies } from '@/tmdb';
import Casts from '@/components/Casts';
import ExternalLinks from '@/components/ExternalLinks';
import Details from '@/components/Details';
import Hero from '@/components/Hero';
import Previews from '@/components/Previews';
import { textHelpers, arraysHelpers } from '../../helpers';

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
        title: '',
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
      return this.movie.similar.results.slice().sort(arraysHelpers.byYear);
    },
    extras() {
      const movie_id = this.$route.params.id;
      const slug = textHelpers.toSlug(this.movie.title);
      let obj = {
        hasMore: this.similarMovies.length > 15,
        link: { name: 'similar-movies', params: { id: movie_id, slug: slug } }
      };
      return obj;
    }
  }
};
</script>

<template>
  <div>
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    >
      <h1 class="h2">Movies &#x3e; {{ genre }}</h1>
      <div class="btn-toolbar mb-2 mb-md-0">
        <div class="btn-group mr-2">
          <button type="button" class="btn btn-sm btn-outline-secondary">Share</button>
          <button type="button" class="btn btn-sm btn-outline-secondary">Export</button>
        </div>
      </div>
    </div>
    <Previews :collection="cleanedResults" :type="collection_type" />
  </div>
</template>
<script>
import { tmdbMovies } from '../tmdb';
import Previews from '../components/Previews';

export default {
  name: 'Genre',
  components: {
    Previews
  },
  data() {
    return {
      genre: null,
      results: [],
      collection_type: 'Movie'
    };
  },
  methods: {
    getMovies() {
      tmdbMovies.byGenre(this.$route.params.id).then(response => (this.results = response.results));
    }
  },
  computed: {
    cleanedResults: function() {
      return this.results.filter(result => !!result.poster_path);
    }
  },
  created() {
    this.genre = this.$route.params.name.split('-').join(' ');
    this.getMovies();
  }
};
</script>

<template>
  <div>
    <h1 class="h3 mb-4 text-gray-800">Discover</h1>
    <Previews :collection="cleanedResults" :type="collection_type" />
  </div>
</template>

<script>
import { tmdbMovies } from '../tmdb';
import Previews from '@/components/Previews';

export default {
  name: 'Discover',
  components: {
    Previews
  },
  data() {
    return {
      results: [],
      collection_type: 'Movie'
    };
  },
  created() {
    tmdbMovies.discover().then(response => (this.results = response.results));
  },
  computed: {
    cleanedResults: function() {
      return this.results.filter(result => !!result.poster_path);
    }
  }
};
</script>

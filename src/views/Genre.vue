<template>
  <div>
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    >
      <h1 class="h2">{{ collectionType }}s &#x3e; {{ genreName }}</h1>
      <div class="btn-toolbar mb-2 mb-md-0">
        <div class="btn-group mr-2">
          <button type="button" class="btn btn-sm btn-outline-secondary">Share</button>
          <button type="button" class="btn btn-sm btn-outline-secondary">Export</button>
        </div>
      </div>
    </div>
    <Previews :collection="cleanedResults" :type="collection_type" layout="multi" />
  </div>
</template>
<script>
import { tmdbMovies, tmdbTV } from '@/tmdb';
import { textHelpers } from '../helpers';
import Previews from '@/components/Previews';

export default {
  name: 'Genre',
  components: {
    Previews
  },
  data() {
    return {
      genre_name: '',
      genre_id: '',
      results: [],
      collection_type: ''
    };
  },
  methods: {
    getMovies() {
      tmdbMovies.byGenre(this.genre_id).then(response => (this.results = response.results));
    },
    getShows() {
      tmdbTV.withGenre(this.genre_id).then(response => (this.results = response.results));
    }
  },
  computed: {
    cleanedResults: function() {
      return this.results.filter(result => !!result.poster_path);
    },
    genreName() {
      return textHelpers.capitalize(this.genre_name);
    },
    collectionType() {
      return textHelpers.capitalize(this.collection_type);
    }
  },
  created() {
    this.collection_type = this.$route.params.type;
    this.genre_name = this.$route.params.slug;
    this.genre_id = this.$route.params.id;
    this.collection_type == 'movie' ? this.getMovies() : this.getShows();
  }
};
</script>

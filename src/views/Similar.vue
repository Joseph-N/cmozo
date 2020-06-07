<template>
  <div>
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    >
      <h1 class="h2">{{ title }}</h1>
      <div class="btn-toolbar mb-2 mb-md-0">
        <div class="btn-group mr-2">
          <button type="button" class="btn btn-sm btn-outline-secondary">Share</button>
          <button type="button" class="btn btn-sm btn-outline-secondary">Export</button>
        </div>
      </div>
    </div>
    <Previews :collection="cleanedResults" :type="type" layout="multi" />
  </div>
</template>

<script>
import { tmdbMovies, tmdbTV } from '@/tmdb';
import { arraysHelpers, textHelpers } from '../helpers';
import Previews from '@/components/Previews';

export default {
  name: 'Similar',
  components: {
    Previews
  },
  props: {
    type: String
  },
  data() {
    return {
      results: []
    };
  },
  methods: {
    similarMovies(movie_id) {
      tmdbMovies.similar(movie_id).then(response => {
        this.results = response.results;
      });
    },
    similarShows(show_id) {
      tmdbTV.similar(show_id).then(response => {
        this.results = response.results;
      });
    }
  },
  created() {
    const id = this.$route.params.id;
    this.type == 'movie' ? this.similarMovies(id) : this.similarShows(id);
  },
  computed: {
    cleanedResults: function() {
      return this.results.concat().sort(arraysHelpers.byYear);
      //.filter(result => !!result.poster_path);
    },
    title() {
      let title = textHelpers.capitalize(this.$route.params.slug);
      title = this.type == 'movie' ? `Movies similar to: ${title}` : `Shows similar to: ${title}`;
      return title;
    }
  }
};
</script>

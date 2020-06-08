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
    <pagination :page="current_page" :pages="total_pages" v-on:page-change="pageChanged" v-show="false"></pagination>
    <div class="text-center p-5 mb-3" v-show="loading">
      <img src="@/assets/images/loading.gif" alt="" />
    </div>
  </div>
</template>

<script>
import { tmdbMovies, tmdbTV } from '@/tmdb';
import { arraysHelpers, textHelpers } from '../helpers';
import Previews from '@/components/Previews';
import Pagination from '@/components/Pagination';
import { scrollMixin } from '@/mixins';

export default {
  name: 'Similar',
  components: {
    Previews,
    Pagination
  },
  props: {
    type: String
  },
  mixins: [scrollMixin],
  methods: {
    getSimilar(page = 1) {
      this.loading = true;
      const id = this.$route.params.id;
      this.type == 'movie' ? this.similarMovies(id, page) : this.similarShows(id, page);
    },
    similarMovies(movie_id, page) {
      tmdbMovies.similar(movie_id, page).then(response => {
        this.current_page = response.page;
        this.total_pages = response.total_pages;
        this.results = [...this.results, ...response.results];
        this.loading = false;
      });
    },
    similarShows(show_id, page) {
      tmdbTV.similar(show_id, page).then(response => {
        this.current_page = response.page;
        this.total_pages = response.total_pages;
        this.results = [...this.results, ...response.results];
        this.loading = false;
      });
    },
    pageChanged(page) {
      this.getSimilar(page);
    }
  },
  created() {
    this.getSimilar();
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

<template>
  <div>
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    >
      <h1 class="h2">Trending</h1>
      <div class="btn-toolbar mb-2 mb-md-0">
        <div class="btn-group mr-2">
          <button type="button" class="btn btn-sm btn-outline-secondary">Share</button>
          <button type="button" class="btn btn-sm btn-outline-secondary">Export</button>
        </div>
      </div>
    </div>
    <Previews :collection="cleanedResults" :type="collection_type" layout="multi" />
    <pagination :page="current_page" :pages="total_pages" v-on:page-change="pageChanged"></pagination>
  </div>
</template>

<script>
import { tmdbTV } from '@/tmdb';
import Previews from '@/components/Previews';
import Pagination from '@/components/Pagination';
import { scrollMixin } from '@/mixins';

export default {
  name: 'Trending',
  components: {
    Previews,
    Pagination
  },
  mixins: [scrollMixin],
  data() {
    return {
      collection_type: 'show'
    };
  },
  methods: {
    trendingShows(page = 1) {
      this.loading = true;
      tmdbTV.trending(page).then(response => {
        this.current_page = response.page;
        this.total_pages = response.total_pages;
        this.results = [...this.results, ...response.results];
        this.loading = false;
      });
    },
    pageChanged(page) {
      this.trendingShows(page);
    }
  },
  created() {
    this.trendingShows();
  },
  computed: {
    cleanedResults: function() {
      return this.results.filter(result => !!result.poster_path);
    }
  }
};
</script>

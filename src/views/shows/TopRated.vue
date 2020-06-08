<template>
  <div>
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    >
      <h1 class="h2">Top Rated</h1>
      <div class="btn-toolbar mb-2 mb-md-0">
        <div class="btn-group mr-2">
          <button type="button" class="btn btn-sm btn-outline-secondary">Share</button>
          <button type="button" class="btn btn-sm btn-outline-secondary">Export</button>
        </div>
      </div>
    </div>
    <Previews :collection="cleanedResults" :type="collection_type" layout="multi" />
    <pagination :page="current_page" :pages="total_pages" v-on:page-change="pageChanged" v-show="false"></pagination>
    <div class="text-center p-5 mb-3" v-show="loading">
      <img src="@/assets/images/loading.gif" alt="" />
    </div>
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
    getTopRated(page) {
      this.loading = true;
      tmdbTV.topRated(page).then(response => {
        this.current_page = response.page;
        this.total_pages = response.total_pages;
        this.results = [...this.results, ...response.results];
        this.loading = false;
      });
    },
    pageChanged(page) {
      this.getTopRated(page);
    }
  },
  created() {
    this.getTopRated();
  },
  computed: {
    cleanedResults: function() {
      return this.results.filter(result => !!result.poster_path);
    }
  }
};
</script>

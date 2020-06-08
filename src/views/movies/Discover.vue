<template>
  <div>
    <h1 class="h3 mb-4 text-gray-800">Discover</h1>
    <Previews :collection="cleanedResults" :type="collection_type" layout="multi" />
    <pagination :page="current_page" :pages="total_pages" v-on:page-change="pageChanged"></pagination>
  </div>
</template>

<script>
import { tmdbMovies } from '@/tmdb';
import Previews from '@/components/Previews';
import Pagination from '@/components/Pagination';
import { scrollMixin } from '@/mixins';

export default {
  name: 'Discover',
  components: {
    Previews,
    Pagination
  },
  mixins: [scrollMixin],
  data() {
    return {
      collection_type: 'movie'
    };
  },
  methods: {
    discoverMovies(page = 1) {
      this.loading = true;
      tmdbMovies.discover(page).then(response => {
        this.current_page = response.page;
        this.total_pages = response.total_pages;
        this.results = [...this.results, ...response.results];

        this.loading = false;
      });
    },
    pageChanged(page) {
      this.discoverMovies(page);
    }
  },
  created() {
    this.discoverMovies();
  },
  computed: {
    cleanedResults: function() {
      return this.results.filter(result => !!result.poster_path);
    }
  }
};
</script>

<template>
  <v-pagination
    v-model="currentPage"
    :page-count="totalPages"
    :classes="bootstrap"
    v-on:input="pageChange"
  ></v-pagination>
</template>
<script>
import vPagination from 'vue-plain-pagination';

export default {
  name: 'Pagination',
  props: {
    page: {
      type: Number,
      required: true
    },
    pages: {
      type: Number,
      required: true
    }
  },
  methods: {
    setPaginationValues() {
      this.currentPage = this.page;
      this.totalPages = this.pages;
    },
    pageChange(val) {
      this.$emit('page-change', val);
    }
  },
  components: {
    vPagination
  },
  data() {
    return {
      currentPage: 0,
      totalPages: 0,
      bottom_reached: false,
      bootstrap: {
        ul: 'pagination',
        li: 'page-item',
        liActive: 'active',
        liDisable: 'disabled',
        button: 'page-link'
      }
    };
  },
  watch: {
    page: function() {
      this.setPaginationValues();
    }
  }
};
</script>

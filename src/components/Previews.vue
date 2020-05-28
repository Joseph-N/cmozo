<template>
  <div class="row" :class="classObject">
    <div class="card" v-for="item in collection" :key="item.id">
      <router-link :to="{ name: type, params: { id: item.id } }">
        <img
          :src="imagePath('w342', item.poster_path)"
          class="card-img-top"
          :title="item.name || item.title"
        />
      </router-link>
    </div>
  </div>
</template>

<script>
import { urlHelpers } from '../js/lib';

export default {
  name: 'Previews',
  props: ['collection', 'type', 'layout'],
  methods: {
    imagePath(size, path) {
      if (!path) return 'https://via.placeholder.com/500x750';
      return urlHelpers.tmdbUrl(size, path);
    }
  },
  computed: {
    classObject: function() {
      return {
        single: this.layout === 'single',
        multi: this.layout === 'multi'
      };
    }
  }
};
</script>
<style scoped>
/* https://www.fourkitchens.com/blog/article/responsive-multi-column-lists-flexbox/ */
.row {
  display: flex;
  margin-left: -10px;
  margin-top: -10px;
}
.row.single {
  flex-wrap: nowrap;
  overflow-x: auto;
}
.row.multi {
  flex-wrap: wrap;
}
.row .card {
  flex: 1 0 200px;
  box-sizing: border-box;
  margin-left: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
}
@media (min-width: 410px) {
  .row .card {
    max-width: calc(50% - 10px);
  }
}
@media (min-width: 620px) {
  .row .card {
    max-width: calc(33.33333% - 10px);
  }
}
@media (min-width: 830px) {
  .row .card {
    max-width: calc(25% - 10px);
  }
}
@media (min-width: 1040px) {
  .row .card {
    max-width: calc(20% - 10px);
  }
}
@media (min-width: 1250px) {
  .row .card {
    max-width: calc(16.66667% - 10px);
  }
}
@media (min-width: 1460px) {
  .row .card {
    max-width: calc(14.28571% - 10px);
  }
}
@media (min-width: 1670px) {
  .row .card {
    min-width: calc(12.5% - 10px);
  }
}
</style>

<template>
  <div class="casts" v-if="casts">
    <div class="card" v-for="cast in sortedCast" :key="cast.id">
      <div class="poster">
        <router-link :to="{ name: 'profile', params: { id: cast.id } }">
          <img :src="imagePath('w185', cast.profile_path)" class="card-img-top" />
        </router-link>
      </div>
      <div class="card-body">
        <h5 class="card-title">{{ cast.name }}</h5>
        <h6 class="card-subtitle mb-2 text-muted">{{ cast.character }}</h6>
      </div>
    </div>
  </div>
</template>

<script>
import { urlHelpers } from '../js/lib';
export default {
  name: 'Casts',
  props: ['casts'],
  methods: {
    imagePath(size, path) {
      if (!path) return 'https://via.placeholder.com/185x278';
      return urlHelpers.tmdbUrl(size, path);
    }
  },
  computed: {
    sortedCast() {
      // concat so we don't modify the original array
      return this.casts.concat().sort((a, b) => {
        if (a.profile_path === b.profile_path) return 0;
        if (a.profile_path === null) return 1;
        if (b.profile_path === null) return -1;
      });
    }
  }
};
</script>
<style scoped>
.casts {
  display: flex;
  flex-wrap: nowrap;
  margin: -10px;
  overflow-x: auto;
}
.casts > * {
  margin: 10px;
  flex: 0 0 150px;
}
.card-title {
  font-size: 0.95rem;
}
.card-subtitle {
  font-size: 0.75rem;
}
.card-body {
  padding: 0.55rem;
}
</style>

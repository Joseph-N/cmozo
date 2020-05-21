<template>
  <div class="row">
    <div class="card" v-for="item in collection" :key="item.id">
      <router-link :to="{ name: type, params: { id: item.id } }">
        <img :src="posterPath(item.poster_path)" class="card-img-top" />
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Previews',
  props: ['collection', 'type'],
  methods: {
    posterPath(path) {
      return `https://image.tmdb.org/t/p/w342${path}`;
    }
  }
};
</script>
<style scoped>
.row {
  display: flex;
  flex-wrap: wrap;
  margin: -10px;
}
.row > * {
  width: 120px;
  flex: 1 1 120px;
  margin: 10px;
  flex: 0 0 12.5%;
}
</style>

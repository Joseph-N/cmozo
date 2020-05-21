<template>
  <div>
    <p>
      <strong>Status</strong>
      <br />
      {{ facts.status }}
    </p>

    <p v-if="facts.number_of_seasons">
      <strong>Seasons</strong>
      <br />
      {{ facts.number_of_seasons }}
    </p>

    <p v-if="facts.networks">
      <strong>Network</strong>
      <br />
      <span v-for="network in facts.networks" :key="network.id" class="mr-3">
        <img :src="posterPath('w92', network.logo_path)" width="50px" />
      </span>
    </p>

    <p v-if="facts.first_air_date">
      <strong>First Aired</strong>
      <br />
      {{ facts.first_air_date }}
    </p>
    <p v-if="facts.last_air_date">
      <strong>Last Aired</strong>
      <br />
      {{ facts.last_air_date }}
    </p>

    <p v-if="facts.original_language">
      <strong>Original Language</strong>
      <br />
      {{ facts.original_language }}
    </p>
    <p v-if="facts.languages">
      <strong>Languages</strong>
      <br />
      {{ facts.languages.join(', ') }}
    </p>
    <p v-if="facts.budget">
      <strong>Budget</strong>
      <br />
      {{ facts.budget | formatCurrency }}
    </p>
    <p v-if="facts.revenue">
      <strong>Revenue</strong>
      <br />
      {{ facts.revenue | formatCurrency }}
    </p>
    <p v-if="facts.type">
      <strong>Type</strong>
      <br />
      {{ facts.type }}
    </p>
  </div>
</template>
<script>
export default {
  name: 'Details',
  props: ['facts'],
  methods: {
    posterPath(size, path) {
      if (!path) return 'https://via.placeholder.com/185x278';
      return `https://image.tmdb.org/t/p/${size}${path}`;
    }
  },
  filters: {
    formatCurrency: num => {
      if (!num) return '-';
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
      });
      return formatter.format(num);
    }
  }
};
</script>
<style scoped>
</style>

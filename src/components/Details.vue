<template>
  <div class="card mb-4 py-3">
    <div class="card-body">
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
          <img :src="imagePath('w92', network.logo_path)" width="50px" />
        </span>
      </p>

      <p v-if="facts.first_air_date">
        <strong>First Aired</strong>
        <br />
        {{ facts.first_air_date | formatDate }}
      </p>
      <p v-if="facts.last_air_date">
        <strong>Last Aired</strong>
        <br />
        {{ facts.last_air_date | formatDate }}
      </p>

      <p v-if="facts.original_language">
        <strong>Original Language</strong>
        <br />
        {{ facts.original_language | language }}
      </p>
      <p v-if="facts.languages">
        <strong>Languages</strong>
        <br />
        <span class="languages" v-for="lang in facts.languages" :key="lang">{{ lang | language }}</span>
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
  </div>
</template>
<script>
import { urlHelpers, numberHelpers, dateHelpers, textHelpers } from '../helpers';

export default {
  name: 'Details',
  props: ['facts'],
  methods: {
    imagePath(size, path) {
      if (!path) return 'https://via.placeholder.com/185x278';
      return urlHelpers.tmdbUrl(size, path);
    }
  },
  filters: {
    formatCurrency: num => {
      return numberHelpers.numberToCurrency(num);
    },
    formatDate: str => {
      return dateHelpers.strToDate(str);
    },
    language: code => {
      return textHelpers.lang(code);
    }
  }
};
</script>
<style scoped>
.languages::after {
  content: ', ';
}
.languages:last-child::after {
  content: '';
}
</style>

<template>
  <div>
    <Hero :details="show" :type="'tvshow'" v-if="!isEmpty(show)" />
    <div class="row mt-4">
      <div class="col-md-9">
        <h2 class="mb-3 text-gray-900 h3">Series Casts</h2>
        <Casts :casts="show.credits.cast" v-if="show.credits" />
      </div>
      <div class="col-md-3">
        <external-links :ids="show.external_ids" :homepage="show.homepage" />
        <Details :facts="facts" />
      </div>
    </div>
  </div>
</template>
<script>
import { tmdbTV } from '../../tmdb';
import Casts from '../../components/Casts';
import ExternalLinks from '../../components/ExternalLinks';
import Details from '../../components/Details';
import Hero from '../../components/Hero';

export default {
  name: 'TvShow',
  components: {
    Casts,
    ExternalLinks,
    Details,
    Hero
  },
  data() {
    return {
      show: {}
    };
  },
  created() {
    this.showDetails(this.$route.params.id);
  },
  beforeRouteUpdate(to, from, next) {
    tmdbTV.get(to.params.id).then(response => {
      this.show = response;
      next();
    });
  },
  methods: {
    showDetails(id) {
      tmdbTV.get(id).then(response => {
        this.show = response;
      });
    },
    isEmpty(obj) {
      return Object.keys(obj).length === 0;
    }
  },
  computed: {
    facts() {
      // https://stackoverflow.com/questions/17781472/how-to-get-a-subset-of-a-javascript-objects-properties
      let unwrap = function({ status, languages, type, number_of_seasons, networks, first_air_date, last_air_date }) {
        return { status, languages, type, number_of_seasons, networks, first_air_date, last_air_date };
      };
      return unwrap(this.show);
    }
  }
};
</script>


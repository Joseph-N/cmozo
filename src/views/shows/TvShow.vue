<template>
  <div>
    <Hero :details="show" :type="'show'" v-if="!isEmpty(show)" />
    <div class="row mt-4">
      <div class="col-md-9">
        <div class="row">
          <div class="col-md-12">
            <h2 class="mb-3 text-gray-900 h3">Series Casts</h2>
            <Casts :casts="show.credits.cast" v-if="show.credits" />
          </div>
          <div class="col-md-12">
            <h2 class="mb-3 mt-4 text-gray-900 h3">Seasons</h2>
            <Previews :collection="seasons" type="season" layout="single" :tvid="show.id" />
          </div>
        </div>
      </div>
      <div class="col-md-3 text-gray-900">
        <external-links :ids="show.external_ids" :homepage="show.homepage" />
        <Details :facts="facts" />
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-md-12">
        <h2 class="mb-3 text-gray-900 h3">Similar Shows</h2>
        <Previews :collection="similarShows" type="show" layout="single" />
      </div>
    </div>
  </div>
</template>
<script>
import { tmdbTV } from '@/tmdb';
import Casts from '@/components/Casts';
import ExternalLinks from '@/components/ExternalLinks';
import Details from '@/components/Details';
import Hero from '@/components/Hero';
import Previews from '@/components/Previews';

export default {
  name: 'TvShow',
  components: {
    Casts,
    ExternalLinks,
    Details,
    Hero,
    Previews
  },
  data() {
    return {
      show: {
        seasons: [],
        similar: {
          results: []
        }
      }
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
    },
    byYear: (a, b) => {
      const year1 = a.first_air_date;
      const year2 = b.first_air_date;

      let comparison = 0;
      if (year1 > year2) {
        comparison = -1; // descending order
      } else if (year1 < year2) {
        comparison = 1;
      }
      return comparison;
    }
  },
  computed: {
    facts() {
      // https://stackoverflow.com/questions/17781472/how-to-get-a-subset-of-a-javascript-objects-properties
      let unwrap = function({ status, languages, type, number_of_seasons, networks, first_air_date, last_air_date }) {
        return { status, languages, type, number_of_seasons, networks, first_air_date, last_air_date };
      };
      return unwrap(this.show);
    },
    similarShows() {
      return this.show.similar.results
        .slice()
        .sort(this.byYear)
        .slice(0, 20);
    },
    seasons() {
      return this.show.seasons.filter(season => season.season_number != 0);
    }
  }
};
</script>

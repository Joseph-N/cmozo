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
    <div class="row mt-4" v-if="similarShows.length > 0">
      <div class="col-md-12">
        <h2 class="mb-3 text-gray-900 h3">Similar Shows</h2>
        <Previews
          :collection="similarShows.slice(0,15)"
          type="show"
          layout="single"
          :extras="extras"
        />
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
import { textHelpers } from '@/helpers';
import { arraysHelpers } from '../../helpers';

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
        name: '',
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
      return this.show.similar.results.slice().sort(arraysHelpers.byYear);
    },
    seasons() {
      return this.show.seasons.filter(season => season.season_number != 0);
    },
    extras() {
      const show_id = this.$route.params.id;
      const slug = textHelpers.toSlug(this.show.name);
      let obj = {
        hasMore: this.similarShows.length > 15,
        link: { name: 'similar-shows', params: { id: show_id, slug: slug } }
      };
      return obj;
    }
  }
};
</script>

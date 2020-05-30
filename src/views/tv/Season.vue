<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card mb-2 border-bottom-success">
        <div class="card-body">
          <div class="row">
            <div class="col-md-3">
              <img :src="imagePath('w500', season.poster_path)" class="img-fluid rounded" />
            </div>
            <div class="col-md-9 text-gray-800">
              <h1 class="mb-2">{{ season.name }}</h1>
              <div class="facts">
                <span> Season {{ season.season_number }}</span>
                <span class="spacer align-text-bottom">.</span>
                <span> Premiered: {{ season.air_date | formatDate }} </span>
                <span class="spacer align-text-bottom">.</span>
                <span> Episodes: {{ episodeCount }} </span>
              </div>
              <h4 class="font-weight-bold mt-4">Overview</h4>
              <p>{{ season.overview }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-12 mt-5 text-gray-800">
      <h2 class="mb-3 text-gray-900">Episodes ({{ episodeCount }})</h2>
      <div class="card mb-4" v-for="episode in season.episodes" :key="episode.id">
        <div class="row no-gutters">
          <div class="col-md-3">
            <img :src="imagePath('w300', episode.still_path)" class="card-img" />
          </div>
          <div class="col-md-9">
            <div class="card-body">
              <h5 class="card-title font-weight-bold">{{ episode.name }}</h5>
              <p class="card-text">
                {{ episode.overview }}
              </p>
              <p class="card-text">
                <small class="text-muted">Episode No: {{ episode.episode_number }}</small>
                <small class="text-muted border-left">Aired: {{ episode.air_date | formatDate }}</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { tmdbTV } from '../../tmdb/tv';
import { urlHelpers, dateHelpers } from '../../js/lib';
export default {
  name: 'Season',
  data() {
    return {
      season: {
        episodes: []
      }
    };
  },
  methods: {
    seasonDetails(show_id, season_num) {
      tmdbTV.season(show_id, season_num).then(response => {
        this.season = response;
      });
    },
    imagePath(size, path) {
      if (!path) return 'https://via.placeholder.com/300x169';
      return urlHelpers.tmdbUrl(size, path);
    }
  },
  created() {
    this.seasonDetails(this.$route.params.tvid, this.$route.params.id);
  },
  filters: {
    formatDate: str => {
      return dateHelpers.strToDate(str);
    }
  },
  computed: {
    episodeCount() {
      return this.season.episodes.length;
    }
  }
};
</script>
<style scoped>
/* .card-img {
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
} */
.spacer {
  font-weight: bolder;
  margin-right: 5px;
  margin-left: 5px;
}
.card-text small {
  padding-right: 5px;
  padding-left: 5px;
}
.card-text small:first-child {
  padding-left: 0px;
}
</style>

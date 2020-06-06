<template>
  <div :class="classObject" :id="type" class="posters">
    <scroll-controls :parent="type" v-if="layout == 'single'"></scroll-controls>
    <div class="card mb-4" v-for="item in collection" :key="item.id">
      <div class="poster">
        <router-link :to="itemParams(item)">
          <img :src="imagePath('w342', item.poster_path)" class="card-img-top" :title="name(item)" />
        </router-link>
      </div>
      <div class="card-body text-gray-800">
        <h5 class="card-title text-center" v-if="type == 'Season'">Season {{ item.season_number }}</h5>
        <h5
          class="card-title text-truncate"
          :title="name(item)"
          v-if="type == 'Movie' || type == 'TV'"
        >{{ name(item) }}</h5>
        <h6 class="card-subtitle mb-2 text-muted" v-if="type != 'Season'">{{ year(item)}}</h6>
        <quick-actions :type="type" :details="item" v-if="type != 'Season'"></quick-actions>
      </div>
    </div>
  </div>
</template>

<script>
import { urlHelpers, dateHelpers } from '../js/lib';
import ScrollControls from '../components/ScrollControls';
import QuickActions from '../components/QuickActions';

export default {
  name: 'Previews',
  props: ['collection', 'type', 'layout', 'tvid'],
  components: {
    ScrollControls,
    QuickActions
  },
  methods: {
    imagePath(size, path) {
      if (!path) return 'https://via.placeholder.com/500x750';
      return urlHelpers.tmdbUrl(size, path);
    },
    itemParams: function(item) {
      if (this.type === 'Season') {
        return { name: this.type, params: { tvid: this.tvid, id: item.season_number } };
      } else {
        return { name: this.type, params: { id: item.id } };
      }
    },
    name(item) {
      const name = item.title || item.name;
      return name;
    },
    year(item) {
      let timestamp;
      if (item.year) {
        timestamp = item.year;
      } else {
        timestamp = dateHelpers.toTimestamp(item.release_date || item.first_air_date);
      }
      return new Date(timestamp).getFullYear();
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
.card-title {
  font-size: 0.95rem;
}

.card-subtitle {
  font-size: 0.8rem;
}

#Season .card-body {
  padding: 0.5rem;
}

#Movie .card-body,
#TV .card-body {
  padding: 0.8rem;
}
/* https://www.fourkitchens.com/blog/article/responsive-multi-column-lists-flexbox/ */
.posters {
  display: flex;
  margin-left: -10px;
  margin-top: -10px;
  scroll-behavior: smooth;
}
.posters.single {
  flex-wrap: nowrap;
  overflow-x: auto;
}
.posters.multi {
  flex-wrap: wrap;
}
.posters .card {
  flex: 1 0 200px;
  box-sizing: border-box;
  margin-left: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
}
@media (min-width: 410px) {
  .posters .card {
    max-width: calc(50% - 10px);
  }
}
@media (min-width: 620px) {
  .posters .card {
    max-width: calc(33.33333% - 10px);
  }
}
@media (min-width: 830px) {
  .posters .card {
    max-width: calc(25% - 10px);
  }
}
@media (min-width: 1040px) {
  .posters .card {
    max-width: calc(20% - 10px);
  }
}
@media (min-width: 1250px) {
  .posters .card {
    max-width: calc(16.66667% - 10px);
  }
}
@media (min-width: 1460px) {
  .posters .card {
    max-width: calc(14.28571% - 10px);
  }
}
@media (min-width: 1670px) {
  .posters .card {
    min-width: calc(12.5% - 10px);
  }
}
</style>

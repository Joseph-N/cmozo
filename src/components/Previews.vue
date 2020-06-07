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
        <h5 class="card-title text-center" v-if="type == 'season'">Season {{ item.season_number }}</h5>
        <h5
          class="card-title text-truncate"
          :title="name(item)"
          v-if="type == 'movie' || type == 'show'"
        >{{ name(item) }}</h5>
        <h6 class="card-subtitle mb-2 text-muted" v-if="type != 'season'">{{ year(item)}}</h6>
        <quick-actions :type="type" :details="item" v-if="type != 'season'"></quick-actions>
      </div>
    </div>
    <div class="view-more card mb-4 align-items-center justify-content-center" v-if="extras">
      <p class="font-weight-bold">
        <router-link :to="extras.link" class="text-gray-800 text-decoration-none">
          View More
          <i class="fa fa-arrow-right"></i>
        </router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { urlHelpers, dateHelpers, textHelpers } from '../helpers';
import ScrollControls from '../components/ScrollControls';
import QuickActions from '../components/QuickActions';

export default {
  name: 'Previews',
  props: ['collection', 'type', 'layout', 'tvid', 'extras'],
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
      const slug = textHelpers.toSlug(item.title || item.name);
      if (this.type === 'season') {
        return { name: this.type, params: { tvid: this.tvid, id: item.season_number, slug: slug } };
      } else {
        return { name: this.type, params: { id: item.id, slug: slug } };
      }
    },
    name(item) {
      return item.title || item.name;
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
.view-more {
  font-size: 1rem;
  border: 0;
  background: transparent;
}
.card-title {
  font-size: 0.95rem;
}

.card-subtitle {
  font-size: 0.8rem;
}

#season .card-body {
  padding: 0.5rem;
}

#movie .card-body,
#show .card-body {
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

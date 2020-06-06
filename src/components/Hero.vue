<template>
  <div class="hero-image d-flex rounded" :style="styleObject">
    <div class="poster d-none d-sm-block">
      <img :src="imagePath('w342', details.poster_path)" class="rounded img-fluid" />
    </div>
    <div class="details flex-grow-1 align-self-center">
      <h1 v-if="type == 'show'">
        {{ details.name }}
        <span
          v-for="network in details.networks.slice(0, 3)"
          :key="network.id"
          class="float-right network"
        >
          <img :src="imagePath('h50_filter(negate,000,666)/', network.logo_path)" width="90px" />
        </span>
      </h1>
      <h1 v-else>{{ details.title }}</h1>
      <div class="facts">
        <span class="certification" v-if="type == 'show' && certification">
          <strong>{{ certification.rating }}</strong>
        </span>
        <span>
          <strong>{{ year }}</strong>
        </span>
        <span class="spacer align-text-bottom">.</span>
        <span>
          <strong>{{ runtime }}</strong>
        </span>
        <span class="spacer align-text-bottom">.</span>
        <ul class="genres font-weight-light">
          <li v-for="genre in details.genres" :key="genre.id">
            <router-link
              :to="{ name: 'Genre', params: { type: type, id: genre.id, slug: slug(genre.name) } }"
            >
              {{
              genre.name
              }}
            </router-link>
          </li>
        </ul>
      </div>

      <actions :details="details" :type="type"></actions>

      <p class="font-italic tagline mt-1" v-if="details.tagline">{{ details.tagline }}</p>

      <h4 class="font-weight-bold">Overview</h4>
      <p>{{ details.overview }}</p>
      <p v-if="type == 'show'">Created By: {{ creators.join(',') }}</p>
      <p v-else>Director: {{ directors[0] }}</p>
    </div>
  </div>
</template>

<script>
import * as Vibrant from 'node-vibrant';
import { urlHelpers, textHelpers } from '../helpers';
import { mapGetters } from 'vuex';
import Actions from '../components/Actions';

export default {
  name: 'Hero',
  props: ['details', 'type'],
  components: {
    Actions
  },
  data() {
    return {
      colors: [],
      styleObject: {
        'background-image': 'linear-gradient(to bottom right, rgb(0, 0, 0,1), rgb(0, 0, 0,0.5))'
      }
    };
  },
  created() {
    this.getPalette();
  },
  watch: {
    // whenever details changes, this function will run
    details: function() {
      this.getPalette();
    }
  },
  computed: {
    year() {
      const key = this.type == 'show' ? 'first_air_date' : 'release_date';
      const date = this.details[key];
      if (this.type == 'show') return date ? date.split('-')[0] : '-';
      return date ? date.split('-')[0] : '-';
    },
    creators() {
      if (this.type != 'show') return '';
      return this.details.created_by.map(creator => creator.name);
    },
    runtime() {
      if (this.type == 'show') return `${this.details.episode_run_time[0]}m`;
      let num = this.details.runtime;
      let hours = Math.floor(num / 60);
      var minutes = num % 60;
      return `${hours}h ${minutes}m`;
    },
    certification() {
      const content_ratings = this.details.content_ratings;
      if (!content_ratings) return '';
      const results = this.details.content_ratings.results;
      if (!results.length) return '';
      const certification = results.filter(result => {
        if (result.iso_3166_1 == 'US') return result.rating;
      });
      return certification[0];
    },
    directors() {
      if (this.type == 'show') return '';
      var directors = [];
      this.details.credits.crew.forEach(function(entry) {
        if (entry.job === 'Director') {
          directors.push(entry.name);
        }
      });
      return directors;
    },
    ...mapGetters(['userLoggedIn'])
  },
  methods: {
    slug(str) {
      return textHelpers.toSlug(str);
    },
    imagePath(size, path) {
      if (!path) return 'https://via.placeholder.com/342x514';
      return urlHelpers.tmdbUrl(size, path);
    },
    backgroundImg() {
      const path = this.details.backdrop_path;
      const url = urlHelpers.tmdbUrl('original', path);
      const color = this.colors[2];
      const rgb = `${color[0]},${color[1]},${color[2]}`;

      if (path) {
        return {
          'background-image': `linear-gradient(to bottom right, rgba(${rgb}, 1), rgba(${rgb}, 0.5)), url("${url}")`
        };
      } else {
        return {
          'background-image': `linear-gradient(to bottom right, rgba(${rgb}, 1), rgba(${rgb}, 0.5))`
        };
      }
    },
    getPalette() {
      const imagePATH = this.details.poster_path;
      if (!imagePATH) return;
      Vibrant.from(urlHelpers.tmdbUrl('w342', imagePATH))
        .maxColorCount(200)
        .getPalette()
        .then(palette => {
          const imageColors = [];
          for (let color in palette) {
            imageColors.push(palette[color].getRgb());
          }
          this.colors = imageColors;
          this.styleObject = this.backgroundImg();
        });
    }
  }
};
</script>
<style scoped>
.hero-image {
  min-height: 490px; /* You must set a specified height */
  background-position: top center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover; /* Resize the background image to cover the entire container */
  color: #fff;
  /* margin-left: -24px;
  margin-right: -24px;
  margin-top: -24px; */
  padding: 30px;
}
.hero-text {
  color: white;
}
.details {
  padding-left: 30px;
  padding-right: 15px;
  width: 60%;
}
.poster {
  width: 290px;
  height: 430px;
  overflow-y: hidden;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
}
.other {
  width: 20%;
}
.tagline {
  font-size: 13px;
  opacity: 0.8;
}
.spacer {
  font-weight: bolder;
  margin-right: 5px;
  margin-left: 5px;
}
.genres {
  display: inline;
  list-style: none;
  padding: 0px;
  font-size: 1rem;
}
.genres a {
  color: #fff;
}
.genres li {
  display: inline;
}
.genres li::after {
  content: ', ';
}
.genres li:last-child::after {
  content: '';
}

.certification {
  border: 1px solid rgba(100%, 100%, 100%, 0.6);
  color: rgba(100%, 100%, 100%, 0.6);
  margin-right: 10px;
  padding: 2px 10px 2px 10px;
}
.network {
  padding-left: 10px;
}
</style>

<template>
  <div class="hero-image d-flex rounded" :style="styleObject">
    <div class="poster d-none d-sm-block">
      <img :src="imagePath('w342', details.poster_path)" class="rounded img-fluid" />
    </div>
    <div class="details flex-grow-1 align-self-center">
      <h1 v-if="type == 'tvshow'">
        {{ details.name }}
        <span v-for="network in details.networks.slice(0, 3)" :key="network.id" class="float-right network">
          <img :src="imagePath('h50_filter(negate,000,666)/', network.logo_path)" width="90px" />
        </span>
      </h1>
      <h1 v-else>{{ details.title }}</h1>
      <div class="facts">
        <span class="certification" v-if="type == 'tvshow' && certification">
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
            <router-link :to="{ name: 'Genre', params: { id: genre.id, name: parameterize(genre.name) } }">{{
              genre.name
            }}</router-link>
          </li>
        </ul>
      </div>

      <div class="actions mt-4 mb-4" v-if="userLoggedIn">
        <a
          href="#"
          title="I've watched this"
          class="btn btn-circle"
          :class="{ 'btn-danger': isWatched, 'btn-secondary': !isWatched }"
          @click.prevent="toggleWatched"
        >
          <i class="fas fa-eye"></i>
        </a>
        <a href="#" class="btn btn-secondary btn-circle" title="I like this">
          <i class="fas fa-thumbs-up"></i>
        </a>
        <a href="#" class="btn btn-secondary btn-circle" title="Add to watchlist">
          <i class="fas fa-history"></i>
        </a>
        <a href="#" class="btn btn-secondary btn-circle" title="Add to list">
          <i class="fas fa-list-alt"></i>
        </a>
        <a
          href="#"
          class="btn btn-light btn-icon-split"
          @click.prevent="openModal"
          v-if="details.videos.results.length"
        >
          <span class="icon text-white-50">
            <i class="fas fa-play"></i>
          </span>
          <span class="text">Play Trailer</span>
        </a>
      </div>

      <div class="actions mt-4 mb-4" v-else>
        <a href="#" class="btn btn-secondary btn-circle" @click.prevent="promptLogin">
          <i class="fas fa-eye"></i>
        </a>
        <a href="#" class="btn btn-secondary btn-circle" title="I like this" @click.prevent="promptLogin">
          <i class="fas fa-thumbs-up"></i>
        </a>
        <a href="#" class="btn btn-secondary btn-circle" title="Add to watchlist" @click.prevent="promptLogin">
          <i class="fas fa-history"></i>
        </a>
        <a href="#" class="btn btn-secondary btn-circle" title="Add to list" @click.prevent="promptLogin">
          <i class="fas fa-list-alt"></i>
        </a>
        <a
          href="#"
          class="btn btn-light btn-icon-split"
          @click.prevent="openModal"
          v-if="details.videos.results.length"
        >
          <span class="icon text-white-50">
            <i class="fas fa-play"></i>
          </span>
          <span class="text">Play Trailer</span>
        </a>
      </div>
      <p class="font-italic tagline mt-1" v-if="details.tagline">{{ details.tagline }}</p>

      <h4 class="font-weight-bold">Overview</h4>
      <p>{{ details.overview }}</p>
      <p v-if="type == 'tvshow'">Created By: {{ creators.join(',') }}</p>
      <p v-else>Director: {{ directors[0] }}</p>
    </div>
  </div>
</template>

<script>
import * as Vibrant from 'node-vibrant';
import { urlHelpers } from '../js/lib';
import { mapGetters } from 'vuex';

export default {
  name: 'Hero',
  props: ['details', 'type'],
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
    this.readFromFirestore();
  },
  watch: {
    // whenever details changes, this function will run
    details: function() {
      this.getPalette();
    }
  },
  computed: {
    year() {
      const key = this.type == 'tvshow' ? 'first_air_date' : 'release_date';
      const date = this.details[key];
      if (this.type == 'tvshow') return date ? date.split('-')[0] : '-';
      return date ? date.split('-')[0] : '-';
    },
    creators() {
      if (this.type != 'tvshow') return '';
      return this.details.created_by.map(creator => creator.name);
    },
    runtime() {
      if (this.type == 'tvshow') return `${this.details.episode_run_time[0]}m`;
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
      if (this.type == 'tvshow') return '';
      var directors = [];
      this.details.credits.crew.forEach(function(entry) {
        if (entry.job === 'Director') {
          directors.push(entry.name);
        }
      });
      return directors;
    },
    isWatched() {
      const id = this.details.id;
      return this.type == 'tvshow' ? this.hasShow(id) : this.hasMovie(id);
    },
    ...mapGetters(['userLoggedIn', 'currentUser', 'userMovies', 'userShows', 'hasMovie', 'hasShow'])
  },
  methods: {
    openModal() {
      this.$root.$emit('open-modal', this.details.videos.results[0].key);
    },
    parameterize(str) {
      return str.split(' ').join('-');
    },
    promptLogin() {
      alert('Login to add to list');
    },
    toggleWatched() {
      this.isWatched ? this.removeFromWatched() : this.addToWatched();
    },
    addToWatched() {
      const details = this.details;
      const collection = this.type == 'tvshow' ? 'shows' : 'movies';

      const payload = { collection, details };

      this.$store
        .dispatch('add_to_collection', payload)
        .then(() => {})
        .catch(error => console.log(error));
    },
    removeFromWatched() {
      const details = this.details;
      const collection = this.type == 'tvshow' ? 'shows' : 'movies';

      const payload = { collection, details };

      this.$store
        .dispatch('remove_from_collection', payload)
        .then(() => {})
        .catch(error => console.log(error));
    },
    readFromFirestore() {
      if (!this.userLoggedIn) return;
      const user_id = this.currentUser.uid;

      this.$store
        .dispatch('read_collection', user_id)
        .then(() => {})
        .catch(error => console.log(error));
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
.actions a {
  margin-right: 15px;
}
.actions a:last-child {
  margin-left: 30px;
}
/* i.fas.fa-play {
  margin-right: 15px;
  color: #fff;
} */
/* .actions a {
  color: #fff;
  width: 50px;
  height: 50px;
}
.action {
  color: #fff;
  padding: 10px;
  background-color: #343a40b0;
  margin-right: 15px;
  text-align: center;
  border-radius: 25px;
}
.actions a:last-child {
  font-size: 1.2rem;
  margin-left: 30px;
} */

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

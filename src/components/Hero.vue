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

      <div class="actions mt-4 mb-4">
        <a href="#" class="btn btn-secondary btn-circle" @click.prevent="promptLogin" v-if="!userLoggedIn">
          <i class="fas fa-plus"></i>
        </a>
        <a
          href="#"
          class="btn btn-danger btn-circle"
          @click.prevent="removeFromFirestore"
          v-show="isAdded"
          v-if="userLoggedIn"
        >
          <i class="fas fa-check"></i>
        </a>
        <a
          href="#"
          class="btn btn-secondary btn-circle"
          @click.prevent="addToFirestore"
          v-show="!isAdded"
          v-if="userLoggedIn"
        >
          <i class="fas fa-plus"></i>
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
import { urlHelpers, dateHelpers } from '../js/lib';
import firebase from '../firebase';
import { mapGetters } from 'vuex';

export default {
  name: 'Hero',
  props: ['details', 'type'],
  data() {
    return {
      colors: [],
      styleObject: {
        'background-image': 'linear-gradient(to bottom right, rgb(0, 0, 0,1), rgb(0, 0, 0,0.5))'
      },
      mycollection: []
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
    },
    userLoggedIn: function() {
      this.readFromFirestore();
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
    isAdded() {
      return this.mycollection.includes(this.details.id);
    },
    ...mapGetters(['userLoggedIn', 'currentUser'])
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
    removeFromFirestore() {
      const vm = this;
      const db = firebase.firestore();
      const userID = this.currentUser.uid;
      const collection = this.type == 'tvshow' ? 'shows' : 'movies';

      let query = db.collection(collection).where('user_id', '==', userID);
      query = query.where('id', '==', this.details.id);

      query.get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          doc.ref.delete();
          vm.mycollection = vm.mycollection.filter(id => id !== this.details.id);
        });
      });
    },
    addToFirestore() {
      const vm = this;
      const db = firebase.firestore();
      const userID = this.currentUser.uid;
      const currentTime = dateHelpers.currTimestamp();
      const genre_ids = this.details.genres.map(g => g.id);
      const year = dateHelpers.toTimestamp(vm.details.first_air_date || vm.details.release_date);
      const collection = this.type == 'tvshow' ? 'shows' : 'movies';

      db.collection(collection)
        .add({
          id: vm.details.id,
          poster_path: vm.details.poster_path,
          name: vm.details.name || vm.details.title,
          genres: genre_ids,
          year: year,
          timestamp: currentTime,
          user_id: userID
        })
        .then(function() {
          console.log('Document successfully written!');
          vm.mycollection.push(vm.details.id);
        })
        .catch(function(error) {
          console.error('Error writing document: ', error);
        });
    },
    readFromFirestore() {
      if (!this.userLoggedIn) return;
      const db = firebase.firestore();
      const userID = this.currentUser.uid;
      const collection = this.type == 'tvshow' ? 'shows' : 'movies';

      let query = db.collection(collection).where('user_id', '==', userID);
      query.get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.mycollection.push(doc.data().id);
        });
      });
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
  padding: 2px 5px 2px 8px;
}
.network {
  padding-left: 10px;
}
</style>

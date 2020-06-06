<template>
  <div class="actions mt-4 mb-4" v-if="userLoggedIn">
    <a
      href="#"
      title="I've watched this"
      class="btn btn-circle"
      :class="{ 'btn-success': isWatched, 'btn-secondary': !isWatched }"
      @click.prevent="toggleWatched"
    >
      <i class="fas fa-eye"></i>
    </a>
    <a
      href="#"
      class="btn btn-circle"
      title="I like this"
      :class="{ 'btn-danger': isLiked, 'btn-secondary': !isLiked }"
      @click.prevent="toggleLiked"
    >
      <i class="fas fa-thumbs-up"></i>
    </a>
    <a
      href="#"
      class="btn btn-circle"
      title="Add to watchlist"
      :class="{ 'btn-primary': isWatchListed, 'btn-secondary': !isWatchListed }"
      @click.prevent="toggleWatchListed"
    >
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
    <a
      href="#"
      class="btn btn-secondary btn-circle"
      title="I like this"
      @click.prevent="promptLogin"
    >
      <i class="fas fa-thumbs-up"></i>
    </a>
    <a
      href="#"
      class="btn btn-secondary btn-circle"
      title="Add to watchlist"
      @click.prevent="promptLogin"
    >
      <i class="fas fa-history"></i>
    </a>
    <a
      href="#"
      class="btn btn-secondary btn-circle"
      title="Add to list"
      @click.prevent="promptLogin"
    >
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
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Actions',
  props: ['type', 'details'],
  methods: {
    promptLogin() {
      alert('Login to add to list');
    },
    openModal() {
      this.$root.$emit('open-modal', this.details.videos.results[0].key);
    },
    toggleWatched() {
      this.isWatched ? this.removeFromList('watched_by') : this.addToList('watched_by');
    },
    toggleWatchListed() {
      this.isWatchListed ? this.removeFromList('watchlisted_by') : this.addToList('watchlisted_by');
    },
    toggleLiked() {
      this.isLiked ? this.removeFromList('liked_by') : this.addToList('liked_by');
    },
    addToList(list) {
      const details = this.details;
      const collection = this.type == 'tvshow' ? 'shows' : 'movies';
      const payload = { collection, details, list };

      this.$store
        .dispatch('add_to_collection', payload)
        .then(() => {})
        .catch(error => console.log(error));
    },
    removeFromList(list) {
      const details = this.details;
      const collection = this.type == 'tvshow' ? 'shows' : 'movies';

      const payload = { collection, details, list };

      this.$store
        .dispatch('remove_from_collection', payload)
        .then(() => {})
        .catch(error => console.log(error));
    }
  },
  computed: {
    isWatched() {
      const id = this.details.id;
      if (this.type == 'tvshow') {
        return this.watchedShows.map(show => show.id).includes(id);
      } else if (this.type == 'movie') {
        return this.watchedMovies.map(movie => movie.id).includes(id);
      } else {
        return false;
      }
    },
    isWatchListed() {
      const id = this.details.id;
      if (this.type == 'tvshow') {
        return this.watchListedShows.map(show => show.id).includes(id);
      } else if (this.type == 'movie') {
        return this.watchListedMovies.map(movie => movie.id).includes(id);
      } else {
        return false;
      }
    },
    isLiked() {
      const id = this.details.id;
      if (this.type == 'tvshow') {
        return this.likedShows.map(show => show.id).includes(id);
      } else if (this.type == 'movie') {
        return this.likedMovies.map(movie => movie.id).includes(id);
      } else {
        return false;
      }
    },
    ...mapGetters([
      'userLoggedIn',
      'currentUser',
      'watchedMovies',
      'watchedShows',
      'watchListedMovies',
      'watchListedShows',
      'likedMovies',
      'likedShows'
    ])
  }
};
</script>
<style scoped>
.actions a {
  margin-right: 15px;
}
.actions a:last-child {
  margin-left: 30px;
}
</style>

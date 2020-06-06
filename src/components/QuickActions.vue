<template>
  <!-- possible classes align-items-end justify-content-end -->
  <div class="actions d-flex">
    <a href="#" class="btn btn-circle btn-light" @click.prevent="toggleWatched">
      <i class="fas fa-eye" :class="{ 'text-success': isWatched, 'text-secondary': !isWatched }"></i>
    </a>
    <a href="#" class="btn btn-circle btn-light" @click.prevent="toggleLiked">
      <i class="fas fa-thumbs-up" :class="{ 'text-danger': isLiked, 'text-secondary': !isLiked }"></i>
    </a>
    <a href="#" class="btn btn-circle btn-light" @click.prevent="toggleWatchListed">
      <i
        class="fas fa-history"
        :class="{ 'text-primary': isWatchListed, 'text-secondary': !isWatchListed }"
      ></i>
    </a>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'QuickActions',
  props: ['type', 'details'],
  methods: {
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
      const collection = this.type == 'show' ? 'shows' : 'movies';
      const payload = { collection, details, list };

      this.$store
        .dispatch('add_to_collection', payload)
        .then(() => {})
        .catch(error => console.log(error));
    },
    removeFromList(list) {
      const details = this.details;
      const collection = this.type == 'show' ? 'shows' : 'movies';

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
      if (this.type == 'show') {
        return this.watchedShows.map(show => show.id).includes(id);
      } else if (this.type == 'movie') {
        return this.watchedMovies.map(movie => movie.id).includes(id);
      } else {
        return false;
      }
    },
    isWatchListed() {
      const id = this.details.id;
      if (this.type == 'show') {
        return this.watchListedShows.map(show => show.id).includes(id);
      } else if (this.type == 'movie') {
        return this.watchListedMovies.map(movie => movie.id).includes(id);
      } else {
        return false;
      }
    },
    isLiked() {
      const id = this.details.id;
      if (this.type == 'show') {
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
.btn-light {
  background-color: rgba(230, 230, 230, 0.5);
  border-color: rgb(230, 230, 230);
  border-bottom-width: 0px;
  border-right-width: 0px;
}
.actions {
  position: absolute;
  right: 0;
  bottom: 0;
  /* margin-bottom: calc(-1.8rem * 1); */
}
.actions .btn:last-child {
  border-bottom-right-radius: 0.35rem;
}
.actions .btn:first-child {
  border-top-left-radius: 0.35rem;
}
.actions .btn {
  height: 1.8rem;
  width: 1.8rem;
  font-size: 0.7rem;
  border-radius: 0;
}
</style>
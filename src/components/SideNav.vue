<template>
  <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
    <div class="sidebar-sticky pt-3">
      <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
        <span>Movies</span>
        <a class="d-flex align-items-center text-muted" href="#" aria-label="Add a new report">
          <span data-feather="plus-circle"></span>
        </a>
      </h6>
      <ul class="nav flex-column">
        <li class="nav-item">
          <router-link to="/discover" class="nav-link" v-bind:class="{ active: currentPage('Discover') }">
            <i class="fas fa-magic"></i>Discover
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/trending" class="nav-link" v-bind:class="{ active: currentPage('Trending') }">
            <i class="fas fa-chart-line"></i>Trending
          </router-link>
        </li>

        <li class="nav-item">
          <router-link to="/upcoming" class="nav-link" v-bind:class="{ active: currentPage('Upcoming') }">
            <i class="fas fa-broadcast-tower"></i>Upcoming
          </router-link>
        </li>

        <li class="nav-item">
          <router-link to="/now-playing" class="nav-link" v-bind:class="{ active: currentPage('NowPlaying') }">
            <i class="fas fa-glasses"></i>Now Playing
          </router-link>
        </li>
      </ul>

      <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
        <span>TV Shows</span>
        <a class="d-flex align-items-center text-muted" href="#" aria-label="Add a new report">
          <span data-feather="plus-circle"></span>
        </a>
      </h6>
      <ul class="nav flex-column mb-2">
        <li class="nav-item">
          <router-link to="/tv/top-rated" class="nav-link" v-bind:class="{ active: currentPage('TopRatedTV') }">
            <i class="fas fa-crown"></i>Top Rated
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/tv/popular" class="nav-link" v-bind:class="{ active: currentPage('Popular') }">
            <i class="fas fa-thumbs-up"></i> Popular
          </router-link>
        </li>

        <li class="nav-item">
          <router-link to="/tv/airing-today" class="nav-link" v-bind:class="{ active: currentPage('AiringToday') }">
            <i class="fas fa-satellite-dish"></i> Airing Today
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/tv/on-the-air" class="nav-link" v-bind:class="{ active: currentPage('OnAir') }">
            <i class="fas fa-desktop"></i> On Tv
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'SideNav',
  methods: {
    currentPage(name) {
      return this.$route.name === name;
    }
  }
};
</script>
<style scoped>
/*
 * Sidebar
 */

.sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100; /* Behind the navbar */
  padding: 48px 0 0; /* Height of navbar */
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.1);
}

@media (max-width: 767.98px) {
  .sidebar {
    top: 5rem;
  }
}

.sidebar-sticky {
  position: relative;
  top: 0;
  height: calc(100vh - 48px);
  padding-top: 0.5rem;
  overflow-x: hidden;
  overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
}

@supports ((position: -webkit-sticky) or (position: sticky)) {
  .sidebar-sticky {
    position: -webkit-sticky;
    position: sticky;
  }
}

.sidebar .nav-link {
  font-weight: 500;
  color: #333;
}

.sidebar .nav-link .feather {
  margin-right: 4px;
  color: #999;
}

.sidebar .nav-link.active {
  color: #007bff;
}

.sidebar .nav-link:hover .feather,
.sidebar .nav-link.active .feather {
  color: inherit;
}

.sidebar-heading {
  font-size: 0.75rem;
  text-transform: uppercase;
}
i.fas {
  margin-right: 12px;
  width: 16px;
}
</style>

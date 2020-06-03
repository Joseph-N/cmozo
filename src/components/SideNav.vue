<template>
  <!-- Sidebar -->
  <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
    <!-- Sidebar - Brand -->
    <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
      <div class="sidebar-brand-icon rotate-n-15">
        <i class="fas fa-laugh-wink"></i>
      </div>
      <div class="sidebar-brand-text mx-3">
        cmozo
        <sup>JL</sup>
      </div>
    </a>

    <!-- Divider -->
    <hr class="sidebar-divider my-0" />

    <!-- Nav Item - Dashboard -->
    <li class="nav-item">
      <router-link to="/" class="nav-link" v-bind:class="{ active: currentPage('home') }">
        <i class="fas fa-fw fa-tachometer-alt"></i>Home
      </router-link>
    </li>

    <!-- Divider -->
    <hr class="sidebar-divider" />

    <!-- Heading -->
    <div class="sidebar-heading">Movies</div>

    <!-- Nav Item - Tables -->
    <li class="nav-item">
      <router-link to="/discover" class="nav-link" v-bind:class="{ active: currentPage('discover') }">
        <i class="fas fa-fw fa-magic"></i>Discover
      </router-link>
    </li>

    <li class="nav-item">
      <router-link to="/trending" class="nav-link" v-bind:class="{ active: currentPage('trending') }">
        <i class="fas fa-fw fa-chart-line"></i>Trending
      </router-link>
    </li>

    <li class="nav-item">
      <router-link to="/upcoming" class="nav-link" v-bind:class="{ active: currentPage('upcoming') }">
        <i class="fas fa-fw fa-broadcast-tower"></i>Upcoming
      </router-link>
    </li>

    <li class="nav-item">
      <router-link to="/now-playing" class="nav-link" v-bind:class="{ active: currentPage('NowPlaying') }">
        <i class="fas fa-fw fa-glasses"></i>Now Playing
      </router-link>
    </li>

    <!-- Divider -->
    <hr class="sidebar-divider" />

    <!-- Heading -->
    <div class="sidebar-heading">TV</div>
    <li class="nav-item">
      <router-link to="/tv/top-rated" class="nav-link" v-bind:class="{ active: currentPage('top-rated') }">
        <i class="fas fa-fw fa-crown"></i>Top Rated
      </router-link>
    </li>
    <li class="nav-item">
      <router-link to="/tv/popular" class="nav-link" v-bind:class="{ active: currentPage('Popular') }">
        <i class="fas fa-fw fa-thumbs-up"></i> Popular
      </router-link>
    </li>

    <li class="nav-item">
      <router-link to="/tv/airing-today" class="nav-link" v-bind:class="{ active: currentPage('AiringToday') }">
        <i class="fas fa-fw fa-satellite-dish"></i> Airing Today
      </router-link>
    </li>
    <li class="nav-item">
      <router-link to="/tv/onair" class="nav-link" v-bind:class="{ active: currentPage('OnAir') }">
        <i class="fas fa-fw fa-desktop"></i> On Tv
      </router-link>
    </li>

    <!-- Divider -->
    <hr class="sidebar-divider d-none d-md-block" />

    <!-- Sidebar Toggler (Sidebar) -->
    <div class="text-center d-none d-md-inline">
      <button class="rounded-circle border-0" id="sidebarToggle"></button>
    </div>
  </ul>
  <!-- End of Sidebar -->
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

<template>
  <!-- Topbar -->
  <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
    <!-- Sidebar Toggle (Topbar) -->
    <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
      <i class="fa fa-bars"></i>
    </button>

    <!-- Topbar Search -->
    <search-form></search-form>

    <!-- Topbar Navbar -->
    <ul class="navbar-nav ml-auto">
      <!-- Nav Item - Search Dropdown (Visible Only XS) -->
      <li class="nav-item dropdown no-arrow d-sm-none">
        <a
          class="nav-link dropdown-toggle"
          href="#"
          id="searchDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <i class="fas fa-search fa-fw"></i>
        </a>
        <!-- Dropdown - Messages -->
        <div
          class="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
          aria-labelledby="searchDropdown"
        >
          <form class="form-inline mr-auto w-100 navbar-search">
            <div class="input-group">
              <input
                type="text"
                class="form-control bg-light border-0 small"
                placeholder="Search for..."
                aria-label="Search"
                aria-describedby="basic-addon2"
              />
              <div class="input-group-append">
                <button class="btn btn-primary" type="button">
                  <i class="fas fa-search fa-sm"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
      </li>

      <div class="topbar-divider d-none d-sm-block"></div>

      <!-- Nav Item - User Information -->
      <li class="nav-item dropdown no-arrow" v-show="authenticated">
        <a
          class="nav-link dropdown-toggle"
          href="#"
          id="userDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <span class="mr-2 d-none d-lg-inline text-gray-600 small">{{ user.name }}</span>
          <img class="img-profile rounded-circle" :src="user.avator" />
        </a>
        <!-- Dropdown - User Information -->
        <div
          class="dropdown-menu dropdown-menu-right shadow animated--grow-in"
          aria-labelledby="userDropdown"
        >
          <router-link
            :to="{ name: 'user-movies', params: { user_id: user.uid } }"
            class="dropdown-item"
          >
            <i class="fas fa-ticket-alt fa-sm fa-fw mr-2 text-gray-400"></i>
            My Movies
          </router-link>
          <router-link
            :to="{ name: 'user-shows', params: { user_id: user.uid } }"
            class="dropdown-item"
          >
            <i class="fas fa-tv fa-sm fa-fw mr-2 text-gray-400"></i>
            My Shows
          </router-link>

          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#" @click.prevent="logout">
            <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
            Logout
          </a>
        </div>
      </li>
      <li class="nav-item" v-show="!authenticated">
        <a class="nav-link text-gray-600" href="#" @click.prevent="login">Login</a>
      </li>
    </ul>
  </nav>
  <!-- End of Topbar -->
</template>

<script>
import SearchForm from '../components/SearchForm';
import { mapGetters } from 'vuex';

export default {
  name: 'TopNav',
  components: {
    SearchForm
  },
  methods: {
    login() {
      this.$store
        .dispatch('login_with_google')
        .then(() => {})
        .catch(error => console.log(error));
    },
    logout() {
      this.$store.dispatch('logout_user').then(() => {
        this.$store.dispatch('reset_collection');
      });
    }
  },
  computed: {
    ...mapGetters({
      authenticated: 'userLoggedIn',
      user: 'currentUser'
    })
  }
};
</script>

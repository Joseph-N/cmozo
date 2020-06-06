import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/discover',
    name: 'discover',
    component: () => import('../views/Discover.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/Search.vue')
  },
  {
    path: '/trending',
    name: 'trending',
    component: () => import('../views/Trending.vue')
  },
  {
    path: '/upcoming',
    name: 'upcoming',
    component: () => import('../views/Upcoming.vue')
  },
  {
    path: '/now-playing',
    name: 'now-playing',
    component: () => import('../views/NowPlaying.vue')
  },
  {
    path: '/movies/:id',
    name: 'Movie',
    component: () => import('../views/Movie.vue')
  },
  {
    path: '/users/:user_id/movies',
    name: 'UserMovies',
    component: () => import('../views/movies/UserMovies.vue')
  },
  {
    path: '/genres/:id-:name',
    name: 'Genre',
    component: () => import('../views/Genre.vue')
  },
  {
    path: '/tv/top-rated',
    name: 'top-rated',
    component: () => import('../views/tv/TopRated.vue')
  },
  {
    path: '/tv/popular',
    name: 'popular',
    component: () => import('../views/tv/Popular.vue')
  },
  {
    path: '/tv/airing-today',
    name: 'airing-today',
    component: () => import('../views/tv/AiringToday.vue')
  },
  {
    path: '/tv/onair',
    name: 'onair',
    component: () => import('../views/tv/OnAir.vue')
  },
  {
    path: '/tv/:id',
    name: 'TV',
    component: () => import('../views/tv/TvShow.vue')
  },
  {
    path: '/tv/:tvid/seasons/:id',
    name: 'Season',
    component: () => import('../views/tv/Season.vue')
  },
  {
    path: '/users/:user_id/shows',
    name: 'UserShows',
    component: () => import('../views/tv/UserShows.vue')
  },
  {
    path: '/people/:id',
    name: 'profile',
    component: () => import('../views/people/Profile.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  /* https://router.vuejs.org/guide/advanced/scroll-behavior.html#async-scrolling */
  scrollBehavior(/*to, from, savedPosition*/) {
    return { x: 0, y: 0 };
  }
});

export default router;

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
    path: '/movies/discover',
    name: 'discover',
    component: () => import('../views/movies/Discover.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/Search.vue')
  },
  {
    path: '/movies/trending',
    name: 'trending',
    component: () => import('../views/movies/Trending.vue')
  },
  {
    path: '/movies/upcoming',
    name: 'upcoming',
    component: () => import('../views/movies/Upcoming.vue')
  },
  {
    path: '/movies/now-playing',
    name: 'now-playing',
    component: () => import('../views/movies/NowPlaying.vue')
  },
  {
    path: '/movies/:id/:slug',
    name: 'movie',
    component: () => import('../views/movies/Movie.vue')
  },
  {
    path: '/movies/:id/:slug/similar',
    name: 'similar-movies',
    props: { type: 'movie' },
    component: () => import('../views/Similar.vue')
  },
  {
    path: '/users/:user_id/movies',
    name: 'user-movies',
    component: () => import('../views/movies/UserMovies.vue')
  },
  {
    path: '/:type/genres/:id/:slug',
    name: 'Genre',
    component: () => import('../views/Genre.vue')
  },
  {
    path: '/shows/top-rated',
    name: 'top-rated',
    component: () => import('../views/shows/TopRated.vue')
  },
  {
    path: '/shows/popular',
    name: 'popular',
    component: () => import('../views/shows/Popular.vue')
  },
  {
    path: '/shows/trending',
    name: 'trending-tv',
    component: () => import('../views/shows/Trending.vue')
  },
  {
    path: '/shows/airing-today',
    name: 'airing-today',
    component: () => import('../views/shows/AiringToday.vue')
  },
  {
    path: '/shows/onair',
    name: 'onair',
    component: () => import('../views/shows/OnAir.vue')
  },
  {
    path: '/shows/:id/:slug',
    name: 'show',
    component: () => import('../views/shows/TvShow.vue')
  },
  {
    path: '/shows/:id/:slug/similar',
    name: 'similar-shows',
    props: { type: 'show' },
    component: () => import('../views/Similar.vue')
  },
  {
    path: '/shows/:tvid/seasons/:id',
    name: 'season',
    component: () => import('../views/shows/Season.vue')
  },
  {
    path: '/users/:user_id/shows',
    name: 'user-shows',
    component: () => import('../views/shows/UserShows.vue')
  },
  {
    path: '/actors/:id/:slug',
    name: 'profile',
    component: () => import('../views/actors/Profile.vue')
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

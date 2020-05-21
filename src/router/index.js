import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Discover.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Discover',
    alias: ['/discover'],
    component: Home
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/Search.vue')
  },
  {
    path: '/trending',
    name: 'Trending',
    component: () => import('../views/Trending.vue')
  },
  {
    path: '/upcoming',
    name: 'Upcoming',
    component: () => import('../views/Upcoming.vue')
  },
  {
    path: '/now-playing',
    name: 'NowPlaying',
    component: () => import('../views/NowPlaying.vue')
  },
  {
    path: '/movies/:id',
    name: 'Movie',
    component: () => import('../views/Movie.vue')
  },
  {
    path: '/genres/:id-:name',
    name: 'Genre',
    component: () => import('../views/Genre.vue')
  },
  {
    path: '/tv/top-rated',
    name: 'TopRatedTV',
    component: () => import('../views/tv/TopRated.vue')
  },
  {
    path: '/tv/popular',
    name: 'Popular',
    component: () => import('../views/tv/Popular.vue')
  },
  {
    path: '/tv/airing-today',
    name: 'AiringToday',
    component: () => import('../views/tv/AiringToday.vue')
  },
  {
    path: '/tv/on-the-air',
    name: 'OnAir',
    component: () => import('../views/tv/OnAir.vue')
  },
  {
    path: '/tv/:id',
    name: 'TV',
    component: () => import('../views/tv/TvShow.vue')
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

import Vue from 'vue';
import Vuex from 'vuex';
import Auth from './modules/auth';
import Firestore from './modules/firestore';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    Auth,
    Firestore
  }
});

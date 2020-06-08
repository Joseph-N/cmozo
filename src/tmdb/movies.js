import axios from '../axios';

const tmdbMovies = {
  async getConfig() {
    const response = await axios.get('configuration');
    return response.data;
  },
  async genres() {
    const response = await axios.get('genre/movie/list');
    return response.data;
  },
  async search(query) {
    const response = await axios.get(`search/movie?query=${query}`);
    return response.data;
  },
  async get(id) {
    const response = await axios.get(`movie/${id}?append_to_response=credits,videos,external_ids,similar`);
    return response.data;
  },
  async credits(movie_id) {
    const response = await axios.get(`movie/${movie_id}/credits`);
    return response.data;
  },
  async videos(movie_id) {
    const response = await axios.get(`movie/${movie_id}/videos`);
    return response.data;
  },
  async trending(page) {
    const response = await axios.get(`trending/movie/week?page=${page}`);
    return response.data;
  },
  async similar(movie_id, page) {
    const response = await axios.get(`movie/${movie_id}/similar?page=${page}`);
    return response.data;
  },
  async upcoming(page) {
    const response = await axios.get(`movie/upcoming?page=${page}`);
    return response.data;
  },
  async nowPlaying(page) {
    const response = await axios.get(`movie/now_playing?page=${page}`);
    return response.data;
  },
  async discover(page) {
    const response = await axios.get(`discover/movie?page=${page}&sort_by=popularity.desc`);
    return response.data;
  },
  async byGenre(genreID) {
    const response = await axios.get(`genre/${genreID}/movies`);
    return response.data;
  }
};

export { tmdbMovies };

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
    const response = await axios.get(`movie/${id}?append_to_response=credits,videos,external_ids`);
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
  async trending() {
    const response = await axios.get('trending/movie/week');
    return response.data;
  },
  async upcoming() {
    const response = await axios.get('movie/upcoming');
    return response.data;
  },
  async nowPlaying() {
    const response = await axios.get('movie/now_playing');
    return response.data;
  },
  async discover() {
    const response = await axios.get('discover/movie?sort_by=popularity.desc');
    return response.data;
  },
  async byGenre(genreID) {
    const response = await axios.get(`genre/${genreID}/movies`);
    return response.data;
  }
};

export { tmdbMovies };

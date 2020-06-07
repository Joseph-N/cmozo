import axios from '../axios';

const tmdbTV = {
  async topRated() {
    const response = await axios.get('/tv/top_rated');
    return response.data;
  },
  async get(id) {
    const response = await axios.get(`tv/${id}?append_to_response=credits,videos,external_ids,content_ratings,similar`);
    return response.data;
  },
  async season(show_id, season_num) {
    const response = await axios.get(`/tv/${show_id}/season/${season_num}`);
    return response.data;
  },
  async popular() {
    const response = await axios.get('/tv/popular');
    return response.data;
  },
  async similar(show_id) {
    const response = await axios.get(`/tv/${show_id}/similar`);
    return response.data;
  },
  async latest() {
    const response = await axios.get('/tv/airing_today');
    return response.data;
  },
  async onair() {
    const response = await axios.get('/tv/on_the_air');
    return response.data;
  },
  async withGenre(genre_id) {
    const response = await axios.get(`/discover/tv?with_genres=${genre_id}&sort_by=popularity.desc`);
    return response.data;
  },
  async withNetwork(network_id) {
    const response = await axios.get(`/discover/tv?with_networks=${network_id}&sort_by=popularity.desc`);
    return response.data;
  }
};

export { tmdbTV };

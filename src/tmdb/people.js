import axios from '../axios';

const tmdbPeople = {
  async popular() {
    const response = await axios.get('/person/popular');
    return response.data;
  },
  async profile(person_id) {
    const response = await axios.get(`/person/${person_id}?append_to_response=combined_credits`);
    return response.data;
  }
};

export { tmdbPeople };

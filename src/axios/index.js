import axios from 'axios';

const defaultOptions = {
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.VUE_APP_ACCESS_TOKEN}`
  }
};

export default axios.create(defaultOptions);

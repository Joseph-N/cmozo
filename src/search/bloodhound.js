import Bloodhound from 'typeahead.js/dist/bloodhound';
import { urlHelpers } from '../helpers';

const filterMovies = response => {
  return response.results.map(movie => {
    return {
      id: movie.id,
      title: movie.title,
      type: 'movie',
      overview: movie.overview,
      year: movie.release_date ? movie.release_date.split('-')[0] : '-',
      poster: movie.poster_path ? urlHelpers.tmdbUrl('w92', movie.poster_path) : 'https://placehold.it/92x138'
    };
  });
};

const filterShows = response => {
  return response.results.map(show => {
    return {
      id: show.id,
      title: show.name,
      type: 'show',
      overview: show.overview,
      year: show.first_air_date ? show.first_air_date.split('-')[0] : '-',
      poster: show.poster_path ? urlHelpers.tmdbUrl('w92', show.poster_path) : 'https://placehold.it/92x138'
    };
  });
};

const filterPeople = response => {
  return response.results.map(profile => {
    return {
      id: profile.id,
      title: profile.name,
      type: 'profile',
      overview: `Known for: ${profile.known_for.map(r => r.title).join(', ')}`,
      year: `Popularity: ${profile.popularity}`,
      poster: profile.profile_path ? urlHelpers.tmdbUrl('w92', profile.profile_path) : 'https://placehold.it/92x138'
    };
  });
};

const moviesEngine = new Bloodhound({
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('title'),
  dupDetector: (a, b) => {
    return a.id === b.id;
  },
  identify: o => {
    return o.id;
  },
  remote: {
    url: `https://api.themoviedb.org/3/search/movie?api_key=${process.env.VUE_APP_API_KEY}&language=en-US&query=%QUERY`,
    wildcard: '%QUERY',
    filter: filterMovies
  }
});

const tvShowsEngine = new Bloodhound({
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('title'),
  dupDetector: (a, b) => {
    return a.id === b.id;
  },
  identify: o => {
    return o.id;
  },
  remote: {
    url: `https://api.themoviedb.org/3/search/tv?api_key=${process.env.VUE_APP_API_KEY}&language=en-US&query=%QUERY`,
    wildcard: '%QUERY',
    filter: filterShows
  }
});

const peoplesEngine = new Bloodhound({
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('title'),
  dupDetector: (a, b) => {
    return a.id === b.id;
  },
  identify: o => {
    return o.id;
  },
  remote: {
    url: `https://api.themoviedb.org/3/search/person?api_key=${process.env.VUE_APP_API_KEY}&language=en-US&query=%QUERY`,
    wildcard: '%QUERY',
    filter: filterPeople
  }
});

export { moviesEngine, tvShowsEngine, peoplesEngine };

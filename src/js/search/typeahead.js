import $ from 'jquery';
import { moviesEngine, tvShowsEngine } from './bloodhound';
import 'typeahead.js/dist/typeahead.jquery';

const typeAhead = {
  init: inputEl => {
    inputEl.typeahead(
      {
        minLength: 3,
        highlight: true,
        hint: true
      },
      {
        source: moviesEngine,
        limit: 5,
        displayKey: 'title',
        templates: {
          header: '<legend>Movies</legend>',
          suggestion: typeAhead.suggestionTemplate
        }
      },
      {
        source: tvShowsEngine,
        limit: 5,
        displayKey: 'title',
        templates: {
          header: '<legend>TV Shows</legend>',
          suggestion: typeAhead.suggestionTemplate
        }
      }
    );
  },
  suggestionTemplate: data => {
    return `<div class="media">
                <img src="${data.poster}" class="mr-3">
                <div class="media-body text-truncate">
                    <h5 class="mt-0">${data.title}</h5>
                    <p>${data.year}</p>
                    <p class="">${data.overview}</p>
                </div>
            </div>`;
  }
};

export { typeAhead, $ };

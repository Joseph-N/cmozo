const arraysHelpers = {
  uniq: arr => {
    let uniq = {};
    return arr.filter(obj => !uniq[obj.id] && (uniq[obj.id] = true));
  },
  byYear: (a, b) => {
    // https://eslint.org/docs/rules/no-prototype-builtins
    const key = Object.prototype.hasOwnProperty.call(a, 'year')
      ? 'year'
      : Object.prototype.hasOwnProperty.call(a, 'release_date')
      ? 'release_date'
      : Object.prototype.hasOwnProperty.call(a, 'first_air_date')
      ? 'first_air_date'
      : console.error(`Object missing property required for sorting`);

    let year1 = a[key];
    let year2 = b[key];

    // if year is a string e.g 2017-09-12 convert to date timestamp
    if ((typeof year1 || typeof year2) == 'string') {
      year1 = dateHelpers.toTimestamp(year1);
      year2 = dateHelpers.toTimestamp(year2);
    }

    let comparison = 0;
    if (year1 > year2) {
      comparison = -1; // descending order
    } else if (year1 < year2) {
      comparison = 1;
    }
    return comparison;
  },
  byPopularity: (a, b) => {
    const score1 = a.popularity;
    const score2 = b.popularity;

    let comparison = 0;
    if (score1 > score2) {
      comparison = -1; // descending order
    } else if (score1 < score2) {
      comparison = 1;
    }
    return comparison;
  }
};

const textHelpers = {
  lang: code => {
    const mappings = {
      en: 'English',
      de: 'German',
      es: 'Spanish',
      fr: 'French',
      hi: 'Hindi',
      it: 'Italian',
      ja: 'Japanese',
      ko: 'Korean',
      ru: 'Russian',
      ar: 'Arabic'
    };
    return mappings[code];
  },
  capitalize: str => {
    return str.replace(/-/g, ' ').replace(/\w\S*/g, txt => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  },
  // https://stackoverflow.com/questions/1053902/how-to-convert-a-title-to-a-url-slug-in-jquery
  toSlug: str =>
    str
      .toLowerCase()
      .replace(/[^\w- ]+/g, '')
      .replace(/ +/g, '-')
      .replace(/(-)\1+/g, '$1') // remove duplicate --
};

const numberHelpers = {
  numberToCurrency: num => {
    if (!num) return '-';
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    });
    return formatter.format(num);
  }
};

const dateHelpers = {
  strToDate: str => {
    var date = new Date(str);
    const dateTimeFormat = new Intl.DateTimeFormat('en', {
      year: 'numeric',
      month: 'short',
      day: '2-digit'
    });
    return dateTimeFormat.format(date);
  },
  currTimestamp: () => {
    var date = new Date();
    return date.getTime();
  },
  toTimestamp: str => {
    var date = new Date(str);
    return date.getTime();
  }
};

const urlHelpers = {
  tmdbUrl: (size, path) => {
    return `https://image.tmdb.org/t/p/${size}${path}`;
  }
};

export { numberHelpers, urlHelpers, dateHelpers, arraysHelpers, textHelpers };

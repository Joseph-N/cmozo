const arraysHelpers = {
  uniq: arr => {
    let uniq = {};
    return arr.filter(obj => !uniq[obj.id] && (uniq[obj.id] = true));
  },
  byYear: (a, b) => {
    const year1 = a.year;
    const year2 = b.year;

    let comparison = 0;
    if (year1 > year2) {
      comparison = -1; // descending order
    } else if (year1 < year2) {
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
    return str.replace(/\w\S*/g, txt => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  },
  toSlug: str =>
    str
      .toLowerCase()
      .replace(/[^\w- ]+/g, '')
      .replace(/ +/g, '-')
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

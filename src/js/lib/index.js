const arraysHelpers = {
  uniq: arr => {
    let uniq = {};
    return arr.filter(obj => !uniq[obj.id] && (uniq[obj.id] = true));
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
  }
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

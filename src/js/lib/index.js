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
  }
};

const urlHelpers = {
  tmdbUrl: (size, path) => {
    return `https://image.tmdb.org/t/p/${size}${path}`;
  }
};

export { numberHelpers, urlHelpers, dateHelpers };

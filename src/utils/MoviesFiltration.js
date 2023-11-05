// Функция для фильтрации по названию фильма
export function filterByName(movie, query) {
  const nameRU = movie.nameRU.toLowerCase();
  const nameEN = movie.nameEN.toLowerCase();
  return nameRU.includes(query) || nameEN.includes(query);
};

// Функция для фильтрации короткометражных фильмов
export function filterShortMovies(movie) {
  return movie.duration <= 40;
};

export function filterMovies(movies, query, isShort) {
  const filteredByName = movies.filter(movie => filterByName(movie, query.toLowerCase()));

  if (isShort) {
    return filteredByName.filter(filterShortMovies);
  } else {
    return filteredByName;
  }
};

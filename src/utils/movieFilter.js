import { SHORTS_DURATION } from "./constants.js";

export function filterMovies(movies, searchKeyword, shortsChecked) {
  return movies.filter((movie) => {
    const keyword = searchKeyword.toLowerCase();
    const fieldsToSearch = [
      movie.nameRU.toLowerCase(),
      movie.nameEN.toLowerCase(),
    ];
    const matchKeyword = fieldsToSearch.some((field) =>
      field.includes(keyword)
    );
    const matchShorts = shortsChecked
      ? movie.duration <= SHORTS_DURATION
      : true;

    return matchKeyword && matchShorts;
  });
}

export function filterSavedMovies(movies, shortsChecked) {
  return movies.filter((movie) => {
    const matchShorts = shortsChecked
      ? movie.duration <= SHORTS_DURATION
      : true;
    return matchShorts;
  });
}

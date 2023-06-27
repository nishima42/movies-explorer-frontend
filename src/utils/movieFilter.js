export function filterMovies(movies, searchKeyword, shortsChecked) {
  return movies.filter((movie) => {
    const matchKeyword =
      movie.nameRU.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      movie.nameEN.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      movie.country.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      movie.description.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      movie.director.toLowerCase().includes(searchKeyword.toLowerCase());

    const matchShorts = shortsChecked ? movie.duration <= 40 : true;

    return matchKeyword && matchShorts;
  });
}

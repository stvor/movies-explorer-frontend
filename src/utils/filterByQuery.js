function filterMoviesByQuery(movies, query) {
  return movies.filter(function(movie) {
      return movie.nameRU.toLowerCase().indexOf(query.toLowerCase()) !== -1
  })
}

export default filterMoviesByQuery;

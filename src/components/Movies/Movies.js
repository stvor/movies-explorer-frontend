import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import moviesApi from '../../utils/MoviesApi';
import filterMoviesByQuery from '../../utils/filterByQuery';
import { moviesFromBeatfilm } from '../../utils/constants';

function Movies() {
  const [initialMovies, setInitialMovies] = React.useState([]);
  const [filteredMovies, setFilteredMovies] = React.useState([]);

  function handleSearch(query) {
    const searchResult = filterMoviesByQuery(initialMovies, query);
    setFilteredMovies(searchResult);
  }

  React.useEffect(() => {
    // получить все фильмы из API вместо мока
    // TODO

    setInitialMovies(moviesFromBeatfilm);
  }, []);

  return (
    <section className="movies">
      <SearchForm onSearch={handleSearch}/>
      <MoviesCardList
        movies={filteredMovies}
      />
    </section>
  );
}

export default Movies;

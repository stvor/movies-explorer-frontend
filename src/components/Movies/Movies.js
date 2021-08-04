import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import moviesApi from '../../utils/MoviesApi';
import filterMoviesByQuery from '../../utils/filterByQuery';

function Movies() {
  const [filteredMovies, setFilteredMovies] = React.useState([]);

  function handleSearch(query) {
    moviesApi.getMovies()
      .then((data) => {
        setFilteredMovies(filterMoviesByQuery(data, query))
      })
      .catch(err => {
        console.log(err)
      });
    }

  return (
    <section className="movies">
      <SearchForm onSearch={handleSearch}/>
      <MoviesCardList movies={filteredMovies} />
    </section>
  );
}

export default Movies;

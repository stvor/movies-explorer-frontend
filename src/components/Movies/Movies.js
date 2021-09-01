import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import moviesApi from '../../utils/MoviesApi';
import filterMoviesByQuery from '../../utils/filterByQuery';
import { moviesFromBeatfilm } from '../../utils/constants';

function Movies() {
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [isMoreButtonShown, setIsMoreButtonShown] = React.useState(false);

  function handleSearch(query) {
    const newFilteredMovies = filterMoviesByQuery(moviesFromBeatfilm, query);
    setFilteredMovies(newFilteredMovies);

    // moviesApi.getMovies()
    //   .then((data) => {
    //     setFilteredMovies(filterMoviesByQuery(data, query));
    //     if (filteredMovies.length === 1) {
    //       setIsMoreButtonShown(true);
    //     }
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   });
    }

  return (
    <section className="movies">
      <SearchForm onSearch={handleSearch}/>
      <MoviesCardList
        movies={filteredMovies}
        isMoreButtonShown={isMoreButtonShown}
      />
    </section>
  );
}

export default Movies;

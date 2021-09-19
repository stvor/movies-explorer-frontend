import React from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import filterMovies from '../../utils/filterMovies';
import './SavedMovies.css';

function SavedMovies({ savedMoviesByCurrentUser, onMovieDelete }) {
  const [filteredMovies, setFilteredMovies] = React.useState([]);

  function handleSearch(query, checkboxStatus) {
    const searchResult = filterMovies(savedMoviesByCurrentUser, query, checkboxStatus);
    setFilteredMovies(searchResult);
  }

  return (
  <section className="saved-movies">
    <SearchForm
      onSearch={handleSearch}
    />
    <MoviesCardList
      movies={filteredMovies.length > 0 ?
        filteredMovies : savedMoviesByCurrentUser}
      isMoreButtonVisible={false}
      onMovieDelete={onMovieDelete}
    />
  </section>

  );
}

export default SavedMovies;

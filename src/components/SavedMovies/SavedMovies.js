import React from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import filterMovies from '../../utils/filterMovies';
import './SavedMovies.css';

function SavedMovies({ savedMoviesByCurrentUser, onMovieDelete }) {
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [isSearchDone, setIsSearchDone] = React.useState(false);

  function handleSearch(query, checkboxStatus) {
    const searchResult = filterMovies(savedMoviesByCurrentUser, query, checkboxStatus);
    setFilteredMovies(searchResult);
    setIsSearchDone(true);
  }

  return (
  <section className="saved-movies">
    <SearchForm
      onSearch={handleSearch}
    />
    {isSearchDone
      ? filteredMovies.length > 0
        ? <MoviesCardList
            movies={filteredMovies}
            onMovieDelete={onMovieDelete}
          />
        : (
          <span className="saved-movies__nothing-found">Ничего не найдено</span>
        )
      : <MoviesCardList
          movies={savedMoviesByCurrentUser}
          onMovieDelete={onMovieDelete}
        />
    }
  </section>

  );
}

export default SavedMovies;

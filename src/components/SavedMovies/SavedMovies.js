import React from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import filterMovies from '../../utils/filterMovies';
import './SavedMovies.css';

function SavedMovies({ savedMoviesByCurrentUser, onMovieDelete }) {
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [isSearching, setIsSearching] = React.useState(false);
  const [isSearchDone, setIsSearchDone] = React.useState(false);

  function handleSearch(query, checkboxStatus) {
    setIsSearching(true);
    const searchResult = filterMovies(savedMoviesByCurrentUser, query, checkboxStatus);
    setFilteredMovies(searchResult);
    setIsSearching(false);
    setIsSearchDone(true);
  }

  return (
  <section className="saved-movies">
    <SearchForm
      onSearch={handleSearch}
    />
    {isSearching
      ? <Preloader />
      : isSearchDone
        ? filteredMovies.length > 0
          ? <MoviesCardList
              movies={filteredMovies}
              onMovieDelete={onMovieDelete}
            />
          : ("Ничего не найдено")
        : <MoviesCardList
            movies={savedMoviesByCurrentUser}
            onMovieDelete={onMovieDelete}
          />
    }
  </section>

  );
}

export default SavedMovies;

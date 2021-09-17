import React from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './SavedMovies.css';

function SavedMovies({ savedMoviesByCurrentUser, onMovieDelete }) {

  return (
  <section className="saved-movies">
    <SearchForm />
    <MoviesCardList
      movies={savedMoviesByCurrentUser}
      isMoreButtonVisible={false}
      onMovieDelete={onMovieDelete}
    />
  </section>

  );
}

export default SavedMovies;

import React from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './SavedMovies.css';

function SavedMovies({ savedMovies, onMovieDelete }) {

  return (
  <section className="saved-movies">
    <SearchForm />
    <MoviesCardList
      movies={savedMovies}
      isMoreButtonVisible={false}
      onMovieDelete={onMovieDelete}
    />
  </section>

  );
}

export default SavedMovies;

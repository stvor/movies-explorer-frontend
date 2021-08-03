import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { Link } from 'react-router-dom';

function Movies() {
  return (
    <section className="movies">
      <Link to="/profile">Профайл</Link>
      <SearchForm />
      <MoviesCardList />
    </section>
  );
}

export default Movies;

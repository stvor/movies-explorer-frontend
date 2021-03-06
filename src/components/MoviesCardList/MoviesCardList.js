import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({
  movies,
  savedMoviesByCurrentUser,
  onMovieSave,
  onMovieDelete,
  isMoreButtonVisible = false,
  onMoreButtonClick
}) {
  const moreButtonClassName = `movies-card-list__more-button ${
    isMoreButtonVisible && "movies-card-list__more-button_visible"
  }`;

  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__list">
        {movies.map((movie) => (
          <MoviesCard
            key={movie.id || movie.movieId}
            movie={movie}
            savedMoviesByCurrentUser={savedMoviesByCurrentUser}
            onMovieSave={onMovieSave}
            onMovieDelete={onMovieDelete}
          />
        ))}
      </ul>
      <button
        className={moreButtonClassName}
        onClick={onMoreButtonClick}
        type="button"
      >Ещё</button>
    </section>
  );
}

export default MoviesCardList;

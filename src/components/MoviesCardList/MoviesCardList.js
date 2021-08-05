import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ movies, isMoreButtonShown }) {
  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__list">
        {movies.map((movie) => (
          <MoviesCard
            key={movie.id}
            movie={movie}
          />
        ))}
      </ul>
      <button
        className={`movies-card-list__more-button  ${isMoreButtonShown ? "movies-card-list__more-button_visible" : "" }`}
      >
        Ещё
      </button>
    </section>
  );
}

export default MoviesCardList;

import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ movies, isMoreButtonVisible, onMoreButtonClick }) {
  const moreButtonClassName = `movies-card-list__more-button ${
    isMoreButtonVisible && "movies-card-list__more-button_visible"
  }`;

  function handleMoreButtonClick() {
    onMoreButtonClick();
  }

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
        className={moreButtonClassName}
        onClick={handleMoreButtonClick}
      >Ещё</button>
    </section>
  );
}

export default MoviesCardList;

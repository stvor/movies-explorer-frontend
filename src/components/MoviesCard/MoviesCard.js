import React from 'react';
import './MoviesCard.css';
import CardCover from '../../images/card-cover.png';

function MoviesCard() {
  return (
    <li className="movies-card">
      <div className="movies-card__header">
        <div className="movies-card__info">
          <h2 className="movies-card__title">33 слова о дизайне</h2>
          <span className="movies-card__duration">1ч 47м</span>
        </div>
        <button className="movies-card__save" type="button"></button>
      </div>
      <img className="movies-card__cover" src={CardCover} alt="Обложка фильма"/>
    </li>
  );
}

export default MoviesCard;

import React from 'react';
import './MoviesCard.css';
import CardCover from '../../images/card-cover.png';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { Route, Switch } from 'react-router-dom';

function MoviesCard() {
  const [isSaved, setIsSaved] = React.useState(true);
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <li className="movies-card">
      <div className="movies-card__header">
        <div className="movies-card__info">
          <h2 className="movies-card__title">33 слова о дизайне</h2>
          <span className="movies-card__duration">1ч 47м</span>
        </div>
        <Switch>
          <Route path="/movies">
            <button className={`movies-card__button movies-card__button_type_save ${isSaved ? "movies-card__button_type_save-active" : ""}`} type="button"></button>
          </Route>
          <Route path="/saved-movies">
            <button className="movies-card__button movies-card__button_type_delete" type="button"></button>
          </Route>
        </Switch>
      </div>
      <img className="movies-card__cover" src={CardCover} alt="Обложка фильма"/>
    </li>
  );
}

export default MoviesCard;

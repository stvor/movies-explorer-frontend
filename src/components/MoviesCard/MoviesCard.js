import React from 'react';
import './MoviesCard.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { Route, Switch } from 'react-router-dom';
import { BEATFILM_URL } from '../../utils/constants';

function MoviesCard({ movie }) {
  const [isSaved, setIsSaved] = React.useState(false);
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <li className="movies-card">
      <div className="movies-card__header">
        <div className="movies-card__info">
          <h2 className="movies-card__title">{movie.nameRU}</h2>
          <span className="movies-card__duration">{movie.duration}</span>
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
      <img
        className="movies-card__cover"
        // src={`${BEATFILM_URL}${movie.image.url}`}
        alt="Обложка фильма"
      />
    </li>
  );
}

export default MoviesCard;

import React from 'react';
import './MoviesCard.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { Route, Switch } from 'react-router-dom';
import { BEATFILM_URL } from '../../utils/constants';
import convertDuration from '../../utils/convertDuration';

function MoviesCard({ movie, onMovieDelete }) {
  const [isSaved, setIsSaved] = React.useState(false);
  const currentUser = React.useContext(CurrentUserContext);

  const saveButtonClassName = `movies-card__button movies-card__button_type_save ${
    isSaved && "movies-card__button_type_save-active"
  }`;
  const deleteButtonClassName = "movies-card__button movies-card__button_type_delete";

  function handleDeleteClick() {
    onMovieDelete(movie);
  }

  return (
    <li className="movies-card">
      <div className="movies-card__header">
        <div className="movies-card__info">
          <h2 className="movies-card__title">{movie.nameRU}</h2>
          <span className="movies-card__duration">{convertDuration(movie.duration)}</span>
        </div>
        <Switch>
          <Route path="/movies">
            <button
              className={saveButtonClassName}
              type="button"
            ></button>
          </Route>
          <Route path="/saved-movies">
            <button
              className={deleteButtonClassName}
              onClick={handleDeleteClick}
              type="button"
            ></button>
          </Route>
        </Switch>
      </div>
      <a href={movie.trailerLink} target="_blank" rel="noreferrer">
        <img
          className="movies-card__cover"
          // src={`${BEATFILM_URL}${movie.image.url}`}
          alt="Обложка фильма"
        />
      </a>
    </li>
  );
}

export default MoviesCard;

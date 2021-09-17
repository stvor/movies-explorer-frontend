import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import moviesApi from '../../utils/MoviesApi';
import filterMovies from '../../utils/filterMovies';
import { moviesFromBeatfilm } from '../../utils/constants';

function Movies({
  savedMoviesByCurrentUser,
  onMovieSave,
  onMovieDelete
}) {
  const [initialMovies, setInitialMovies] = React.useState([]);
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [moviesToRender, setMoviesToRender] = React.useState([]);
  const [isMoreButtonVisible, setIsMoreButtonVisible] = React.useState(false);
  const [firstResultsNumber, setFirstResultsNumber] = React.useState(0);
  const [moreResultsNumber, setMoreResultsNumber] = React.useState(0);
  const currentViewport = document.documentElement.clientWidth;

  function handleSearch(query, checkboxStatus) {
    const searchResult = filterMovies(initialMovies, query, checkboxStatus);
    setFilteredMovies(searchResult);
  }

  // Устанавливаем количество карточек,
  // которые отображаются сразу
  // и по клику на кнопку "Ещё"
  React.useEffect(() => {
    if (currentViewport <= 480) {
      setFirstResultsNumber(5);
      setMoreResultsNumber(2);
    } else if (currentViewport <= 768) {
      setFirstResultsNumber(8);
      setMoreResultsNumber(2);
    } else if (currentViewport > 768) {
      setFirstResultsNumber(12);
      setMoreResultsNumber(3);
    }
  }, []);

  // Выбираем, сколько результатов поиска показать
  React.useEffect(() => {
    if (filteredMovies.length > firstResultsNumber) {
      setMoviesToRender(filteredMovies.slice(0, firstResultsNumber));
      setIsMoreButtonVisible(true);
    } else {
      setMoviesToRender(filteredMovies);
    }
  }, [filteredMovies, firstResultsNumber]);

  function handleMoreButtonClick() {
    setMoviesToRender((state) => filteredMovies.slice(0, state.length + moreResultsNumber));
  }

  // Проверяем видимость кнопки "Ещё"
  React.useEffect(() => {
    if (moviesToRender.length === filteredMovies.length) {
      setIsMoreButtonVisible(false);
    }
  }, [moviesToRender, filteredMovies]);

  // Получаем все фильмы из API Beatfilm
  React.useEffect(() => {
    // получить все фильмы из API вместо мока
    // TODO

    setInitialMovies(moviesFromBeatfilm);
  }, []);

  return (
    <section className="movies">
      <SearchForm
        onSearch={handleSearch}
      />
      <MoviesCardList
        movies={moviesToRender}
        savedMoviesByCurrentUser={savedMoviesByCurrentUser}
        onMovieSave={onMovieSave}
        onMovieDelete={onMovieDelete}
        isMoreButtonVisible={isMoreButtonVisible}
        onMoreButtonClick={handleMoreButtonClick}
      />
    </section>
  );
}

export default Movies;

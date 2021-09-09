import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import moviesApi from '../../utils/MoviesApi';
import filterMovies from '../../utils/filterMovies';
import { moviesFromBeatfilm } from '../../utils/constants';

function Movies() {
  const [initialMovies, setInitialMovies] = React.useState([]);
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [moviesToRender, setMoviesToRender] = React.useState([]);
  const [isMoreButtonVisible, setIsMoreButtonVisible] = React.useState(false);

  function handleSearch(query, checkboxStatus) {
    const searchResult = filterMovies(initialMovies, query, checkboxStatus);
    setFilteredMovies(searchResult);
  }

  // Выбираем, сколько результатов поиска показать
  React.useEffect(() => {
    if (filteredMovies.length > 12) {
      setMoviesToRender(filteredMovies.slice(0, 12));
      setIsMoreButtonVisible(true);
    } else {
      setMoviesToRender(filteredMovies);
    }
  }, [filteredMovies]);

  function handleMoreButtonClick() {
    setMoviesToRender((state) => filteredMovies.slice(0, state.length + 3));
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
        isMoreButtonVisible={isMoreButtonVisible}
        onMoreButtonClick={handleMoreButtonClick}
      />
    </section>
  );
}

export default Movies;

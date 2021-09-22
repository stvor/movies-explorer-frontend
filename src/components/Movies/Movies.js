import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import moviesApi from '../../utils/MoviesApi';
import filterMovies from '../../utils/filterMovies';

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
  const [isSearching, setIsSearching] = React.useState(false);
  const [isSearchDone, setIsSearchDone] = React.useState(false);
  const currentViewport = document.documentElement.clientWidth;

  function searchPromise(query, checkboxStatus) {
    return new Promise((resolve) => {
      resolve(filterMovies(initialMovies, query, checkboxStatus));
    })
  }

  function handleSearch(query, checkboxStatus) {
    setIsSearchDone(false);
    setIsSearching(true);
    searchPromise(query, checkboxStatus)
      .then((data) => {
        setFilteredMovies(data);
        console.log(data)
        setIsSearchDone(true);
      })
      .catch(console.log)
      .finally(() => {
        setIsSearching(false);
      })
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

  return (
    <section className="movies">
      <SearchForm
        onSearch={handleSearch}
      />
      {isSearching
        ? <Preloader />
        : isSearchDone
          ? moviesToRender.length > 0
            ? <MoviesCardList
                movies={moviesToRender}
                savedMoviesByCurrentUser={savedMoviesByCurrentUser}
                onMovieSave={onMovieSave}
                onMovieDelete={onMovieDelete}
                isMoreButtonVisible={isMoreButtonVisible}
                onMoreButtonClick={handleMoreButtonClick}
              />
            : ("Ничего не найдено")
          : ("")
      }
    </section>
  );
}

export default Movies;

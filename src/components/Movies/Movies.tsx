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

  const [query, setQuery] = React.useState('');
  const [checkboxStatus, setCheckboxStatus] = React.useState(false);

  function handleSearch(query: string, checkboxStatus: boolean) {
    setMoviesToRender([]);
    setQuery(query);
    setCheckboxStatus(checkboxStatus);

    const initialMoviesInLocalStorage = JSON.parse(localStorage.getItem('initialMovies'));

    if (!initialMoviesInLocalStorage) {
      setIsSearching(true);
      moviesApi.getMovies()
        .then((data) => {
          setInitialMovies(data);
          localStorage.setItem('initialMovies', JSON.stringify(data));
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          setIsSearching(false);
        })
    } else {
      setInitialMovies(initialMoviesInLocalStorage);
    }
  }

  React.useEffect(() => {
    if (initialMovies.length > 0) {
      const searchResults = filterMovies(initialMovies, query, checkboxStatus);
      setFilteredMovies(searchResults);
      setIsSearchDone(true);
    }
  }, [initialMovies, query, checkboxStatus]);

  // ?????????????????????????? ???????????????????? ????????????????,
  // ?????????????? ???????????????????????? ??????????
  // ?? ???? ?????????? ???? ???????????? "??????"
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
  }, [currentViewport]);

  // ????????????????, ?????????????? ?????????????????????? ???????????? ????????????????
  React.useEffect(() => {
    if (filteredMovies.length > 0) {
      if (filteredMovies.length > firstResultsNumber) {
        setMoviesToRender(filteredMovies.slice(0, firstResultsNumber));
        setIsMoreButtonVisible(true);
      } else {
        setMoviesToRender(filteredMovies);
      }
    }
  }, [filteredMovies, firstResultsNumber]);

  function handleMoreButtonClick() {
    setMoviesToRender((state) => filteredMovies.slice(0, state.length + moreResultsNumber));
  }

  // ?????????????????? ?????????????????? ???????????? "??????"
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
            : (
              <span className="movies__nothing-found">
                ???????????? ???? ??????????????
              </span>
            )
          : ("")
      }
    </section>
  );
}

export default Movies;

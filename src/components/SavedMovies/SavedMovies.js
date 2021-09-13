import React from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import mainApi from '../../utils/MainApi';
import './SavedMovies.css';

function SavedMovies() {
  const [savedMovies, setSavedMovies] = React.useState([]);

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    mainApi.getSavedMovies(jwt)
      .then((data) => {
        setSavedMovies(data);
      })
      .catch(err => {
        console.log(err)
      })
  }, []);

  return (
  <section className="saved-movies">
    <SearchForm />
    <MoviesCardList
      movies={savedMovies}
      isMoreButtonVisible={false}
    />
  </section>

  );
}

export default SavedMovies;

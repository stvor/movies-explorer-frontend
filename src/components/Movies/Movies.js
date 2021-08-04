import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import moviesApi from '../../utils/MoviesApi';

function Movies() {
  const [allMovies, setAllMovies] = React.useState([]);

  // получить поисковый запрос
  function handleSearch(query) {

    // запросить все фильмы
    moviesApi.getMovies()
      .then((data) => {
        setAllMovies(data);
      })
      .catch(err => {
        console.log(err)
      });
    }
  // отфильтровать фильмы по запросу
  // передать фильмы в MoviesCardList

  return (
    <section className="movies">
      <SearchForm onSearch={handleSearch}/>
      <MoviesCardList movies={allMovies} />
    </section>
  );
}

export default Movies;

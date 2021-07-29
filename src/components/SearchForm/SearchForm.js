import React from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm() {
  return (
    <section className="search-form">
      <form className="search-form__form">
        <div className="search-form__input-wrap">
          <input className="search-form__input" type="text" name="movie" placeholder="Фильм" required></input>
          <button className="search-form__submit" type="submit">Найти</button>
        </div>
        <div className="search-form__filter">
          <FilterCheckbox />
        </div>
      </form>
    </section>
  );
}

export default SearchForm;

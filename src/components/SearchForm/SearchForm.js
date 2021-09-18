import React from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm({ onSearch }) {
  const [query, setQuery] = React.useState('');
  const [checkboxStatus, setCheckboxStatus] = React.useState(false);

  function handleQueryChange(evt) {
    setQuery(evt.target.value);
  }

  function handleCheckboxChange(checkboxStatus) {
    setCheckboxStatus(checkboxStatus);
    onSearch(query, checkboxStatus);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onSearch(query, checkboxStatus);
  }

  return (
    <section className="search-form">
      <form
        onSubmit={handleSubmit}
        className="search-form__form"
      >
        <div className="search-form__input-wrap">
          <input
            value={query || ''}
            onChange={handleQueryChange}
            className="search-form__input"
            type="text"
            name="query"
            placeholder="Фильм"
            required
          />
          <button
            className="search-form__submit"
            type="submit"
          >Найти</button>
        </div>
        <div className="search-form__filter">
          <FilterCheckbox
            checkboxStatus={checkboxStatus}
            onCheckboxChange={handleCheckboxChange}
          />
        </div>
      </form>
    </section>
  );
}

export default SearchForm;

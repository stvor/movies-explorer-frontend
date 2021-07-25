import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox() {
  return (
    <label className="filter-checkbox">
      <input className="filter-checkbox__invisible-checkbox" type="checkbox"></input>
      <span className="filter-checkbox__pseudo-checkbox"></span>
      <span className="filter-checkbox-label-text">Короткометражки</span>
    </label>
  );
}

export default FilterCheckbox;

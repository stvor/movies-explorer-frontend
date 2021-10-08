import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox({ checkboxStatus, onCheckboxChange }) {
  function handleCheckboxChange(evt) {
    onCheckboxChange(evt.target.checked);
  }

  return (
    <label
      className="filter-checkbox"
      onClick={handleCheckboxChange}
    >
      <input
        defaultChecked={checkboxStatus}
        className="filter-checkbox__invisible-checkbox"
        type="checkbox"
      />
      <span className="filter-checkbox__pseudo-checkbox"></span>
      <span className="filter-checkbox-label-text">Короткометражки</span>
    </label>
  );
}

export default FilterCheckbox;

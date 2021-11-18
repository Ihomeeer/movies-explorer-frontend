import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox ({
  handleShortMovies
}) {



  return (
    <div className="section filter">
      <label className="filter__switch">
        <input
          type="checkbox"
          className="filter__checkbox"
          onClick={handleShortMovies}
        />
        <span className="filter__caption">Короткометражки</span>
      </label>
  </div>
  )
};

export default FilterCheckbox;
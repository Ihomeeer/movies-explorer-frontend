import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox (props) {

  return (
    <div className="filter">
      <label className="filter__switch">
        <input
          type="checkbox"
          className="filter__checkbox"
        />
        <span className="filter__caption">Короткометражки</span>
      </label>
  </div>
  )
};

export default FilterCheckbox;
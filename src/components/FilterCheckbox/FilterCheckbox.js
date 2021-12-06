import React from "react";
import "./FilterCheckbox.css";

function FilterCheckbox({
  handleShortMovies,
  isSavedMovies
}) {
  return (
    <div className="section filter" id="filter">
      <label className="filter__switch" htmlFor="filter">
        <input
          type="checkbox"
          className="filter__checkbox"
          onChange={handleShortMovies}
          checked={
            isSavedMovies == true
            ? JSON.parse(localStorage.getItem("savedMoviesCheckBoxStatus")) || false
            : JSON.parse(localStorage.getItem("moviesCheckBoxStatus")) || false
          }
        />
        <span className="filter__caption">Короткометражки</span>
      </label>
    </div>
  );
}

export default FilterCheckbox;

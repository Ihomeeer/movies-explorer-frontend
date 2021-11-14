import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm ({
  getAllMovies
}) {


  return (
    <section className="section search-form">
      <form className="search-form__form" noValidate >
        <input
        className="search-form__input"
        placeholder="Фильм"
        required
        ></input>
        <button type='button' className="button search-form__search-button" aria-label="Найти" onClick={getAllMovies}></button>
      </form>
      <FilterCheckbox />
    </section>
  )
};

export default SearchForm;
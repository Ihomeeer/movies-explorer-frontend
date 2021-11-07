import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm (props) {

  return (
    <section className="section searchForm">
      <form className="searchForm__form" noValidate>
        <input className="searchForm__input" placeholder="Фильм"></input>
        <button className="searchForm__search-button" aria-label="Найти"></button>
      </form>
      <FilterCheckbox />
    </section>
  )
};

export default SearchForm;
import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm (props) {

  return (
    <section className="section search-form">
      <form className="search-form__form" noValidate>
        <input className="search-form__input" placeholder="Фильм"></input>
        <button className="search-form__search-button" aria-label="Найти"></button>
      </form>
      <FilterCheckbox />
    </section>
  )
};

export default SearchForm;
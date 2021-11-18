import React from 'react';
import { useFormWithValidation } from '../../utils/validation';
import './SearchForm.css';



function SearchForm ({
  getMovies,
  searchMessage,
}) {

  const { values, handleChange } = useFormWithValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    getMovies(values.search);
  }

  return (
    <section className="section search-form">
      <form className="search-form__form" noValidate onSubmit={handleSubmit}>
        <input
        className="search-form__input"
        placeholder="Фильм"
        required
        type="search"
        name="search"
        onChange={handleChange}
        value={values.search || ''}
        ></input>
        <button type='submit' className="button search-form__search-button" aria-label="Найти"></button>
      </form>
      <span className="search-form__error">{searchMessage}</span>
    </section>
  )
};

export default SearchForm;
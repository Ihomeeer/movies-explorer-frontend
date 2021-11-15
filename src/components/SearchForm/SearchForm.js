import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useFormWithValidation } from '../../utils/validation';
import './SearchForm.css';



function SearchForm ({
  getMovies
}) {

  const [errorMessage, setErrorMessage] = React.useState('');

 const handleSubmit = (e) => {

    e.preventDefault();
    getMovies(values.search);

 }

const { values, handleChange } = useFormWithValidation();


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
      <FilterCheckbox />
      <span className="search-form__error">{errorMessage}</span>
    </section>
  )
};

export default SearchForm;
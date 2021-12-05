import React from "react";
import { useFormWithValidation } from "../../utils/validation";
import "./SearchForm.css";

function SearchForm({
  isSavedMovies,
  getMovies,
  setSearchMessage,
  searchMessage,
}) {
  // валидация инпутов
  const { values, handleChange } = useFormWithValidation();

  React.useEffect(() => {
    setSearchMessage("");
  }, [values.search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    getMovies(values.search);
  };

  return (
    <section className="section search-form">
      <form className="search-form__form" noValidate onSubmit={handleSubmit}>
        <input
          className="search-form__input"
          placeholder={
            isSavedMovies
            ?
              localStorage.getItem("lastSavedMoviesRequest")
              ? JSON.parse(localStorage.getItem("lastSavedMoviesRequest"))
              : "Фильм"
            :
              localStorage.getItem("lastMoviesRequest")
              ? JSON.parse(localStorage.getItem("lastMoviesRequest"))
              : "Фильм"
          }
          required
          type="search"
          name="search"
          onChange={handleChange}
          value={values.search || ""}
        />
        <button
          type="submit"
          className="button search-form__search-button"
          aria-label="Найти"
        />
      </form>
      <span className="search-form__error">{searchMessage}</span>
    </section>
  );
}

export default SearchForm;


// value={
//   if (localStorage.getItem("lastMoviesRequest")) {
//     JSON.parse(localStorage.getItem("lastMoviesRequest"))
// } else {
//   values.search || ""
// }
// }
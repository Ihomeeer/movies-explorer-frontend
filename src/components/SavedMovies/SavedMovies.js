import React from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

function SavedMovies({
  isAuth,
  searchedSavedMoviesArray,
  setSearchedSavedMoviesArray,
  userSavedMoviesArray,
  setUserSavedShortsArray,
  userSavedShortsArray,
  setShownSavedMoviesArray,
  shownSavedMoviesArray,
  onDeleteMovie,
}) {
  // сообщение о ненайденных фильмах при поиске
  const [searchMessage, setSearchMessage] = React.useState("");
  // Видимость секции "Movies"
  const [isSavedMoviesVisible, setIsSavedMoviesVisible] = React.useState(false);
  // переменная для работы чекбокса короткометражек
  const [isShortMovies, setIsShortMovies] = React.useState(false);

  // функция для переключения стейта чекбоксом
  const handleShortMovies = () => {
    setIsShortMovies(!isShortMovies);
  }

  // Фильтрует сохраненные фильмы по длительности
  const filterDuration = (movies) =>
    movies.filter(
      (movie) => movie.duration <= 40
    );

  // Фильтрует сохраненные фильмы по значению инпута из SearchForm
  const filterMovies = (arr, query) =>
    arr.filter(
      (el) => el.nameRU.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );

  const getMovies = (title) => {
    const searchedMovies = filterMovies(JSON.parse(localStorage.getItem("userSavedMovies")), title);
    const shortMovies = filterDuration(searchedMovies);
    console.log(shortMovies)
    setSearchedSavedMoviesArray(searchedMovies);
    setUserSavedShortsArray(shortMovies);
    if (searchedMovies.length === 0) {
      setSearchMessage("Ничего не найдено");
      setIsSavedMoviesVisible(false);
    } else {
      setIsSavedMoviesVisible(true);
      setSearchMessage("");
      if (isShortMovies) {
        setShownSavedMoviesArray(shortMovies);
      } else {
        setShownSavedMoviesArray(searchedMovies);
      }
    }
  }

  // Реализация работы чекбокса с короткометражками после поиска по названию
  React.useEffect(() => {
    if (isShortMovies) {
      setShownSavedMoviesArray(userSavedShortsArray);
    } else {
      setShownSavedMoviesArray(searchedSavedMoviesArray);
    }
  }, [isShortMovies]);


  // эффект для прорисовки массива после удаления карточки
  React.useEffect(() => {
    console.log(isShortMovies);
    if (isShortMovies === true) {
      const shortMovies = filterDuration(userSavedMoviesArray);
      setShownSavedMoviesArray(shortMovies);
    } else {
      setShownSavedMoviesArray(userSavedMoviesArray);
    }
  }, [userSavedMoviesArray]);

  return (
    <div>
      <Header isAuth={isAuth} />
      <SearchForm
        getMovies={getMovies}
        setSearchMessage={setSearchMessage}
        searchMessage={searchMessage}
      />
      <FilterCheckbox
        handleShortMovies={handleShortMovies}
      />
      {isSavedMoviesVisible ? (
        <MoviesCardList
          isSavedMovies
          shownSavedMoviesArray={shownSavedMoviesArray}
          userSavedMoviesArray={userSavedMoviesArray}
          onDeleteMovie={onDeleteMovie}
        />
      ) : (
        ""
      )}
      <Footer />
    </div>
  );
}

export default SavedMovies;
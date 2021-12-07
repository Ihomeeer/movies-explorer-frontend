import React from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import { ShortMoviesDuration } from '../../utils/constants';

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
  const [isSavedShortMovies, setIsSavedShortMovies] = React.useState(`${localStorage.getItem("savedMoviesCheckBoxStatus")
  ? JSON.parse(localStorage.getItem("savedMoviesCheckBoxStatus"))
  : false
 }`);

  // функция для переключения стейта чекбоксом
  const handleShortMovies = () => {
    localStorage.setItem("savedMoviesCheckBoxStatus", !isSavedShortMovies);
    setIsSavedShortMovies(!isSavedShortMovies);
  }

  // Фильтрует сохраненные фильмы по длительности
  const filterDuration = (movies) =>
    movies.filter(
      (movie) => movie.duration <= ShortMoviesDuration
    );

  // Фильтрует сохраненные фильмы по значению инпута из SearchForm
  const filterMovies = (arr, query) =>
    arr.filter(
      (el) => el.nameRU.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );

  const getMovies = (title) => {
    if (title) {
      // Засовывание значения инпута в локалсторадж
      localStorage.setItem("lastSavedMoviesRequest", JSON.stringify(title));
      // передача в константы результатов поиска и короткометражек
      const searchedMovies = filterMovies(JSON.parse(localStorage.getItem("userSavedMovies")), title);
      const shortMovies = filterDuration(searchedMovies);
      // Засовывание фильтрованных фильмов в локалсторадж, чтобы потом при перезаходе показывать
      localStorage.setItem("searchedSavedMovies", JSON.stringify(searchedMovies));
      localStorage.setItem("searchedSavedShorts", JSON.stringify(shortMovies));
      setSearchedSavedMoviesArray(searchedMovies);
      setUserSavedShortsArray(shortMovies);
      if (searchedMovies.length === 0) {
        setSearchMessage("Ничего не найдено");
        setIsSavedMoviesVisible(false);
      } else {
        setIsSavedMoviesVisible(true);
        setSearchMessage("");
        if (JSON.parse(localStorage.getItem("savedMoviesCheckBoxStatus")) == true) {
          setShownSavedMoviesArray(shortMovies);
        } else {
          setShownSavedMoviesArray(searchedMovies);
        }
      }
    }  else {
      setSearchMessage("Нужно ввести ключевое слово");
      setIsSavedMoviesVisible(false);
    }
  }

  // Реализация работы чекбокса с короткометражками после поиска по названию
  React.useEffect(() => {
    if (isSavedShortMovies) {
      setShownSavedMoviesArray(userSavedShortsArray);
    } else {
      setShownSavedMoviesArray(searchedSavedMoviesArray);
    }
  }, [isSavedShortMovies]);

  // рендер результатов предыдущего поиска при монтировании компонента, а так же при удалении карточки,
  React.useEffect(() => {
      if (JSON.parse(localStorage.getItem("searchedSavedMovies"))) {
        const lastSearchedSavedMovies = JSON.parse(localStorage.getItem("searchedSavedMovies"));
        const lastSearchedSavedShorts = JSON.parse(localStorage.getItem("searchedSavedShorts"));
        if (lastSearchedSavedMovies.length > 0) {
          setSearchedSavedMoviesArray(lastSearchedSavedMovies);
          setUserSavedShortsArray(lastSearchedSavedShorts);
          if (lastSearchedSavedMovies.length === 0) {
            setSearchMessage("Ничего не найдено");
            setIsSavedMoviesVisible(false);
          } else {
            setIsSavedMoviesVisible(true);
            setSearchMessage("");
            if (JSON.parse(localStorage.getItem("savedMoviesCheckBoxStatus")) == true) {
              setShownSavedMoviesArray(lastSearchedSavedShorts);
            } else {
              setShownSavedMoviesArray(lastSearchedSavedMovies);
            }
          }
        }
      }
  }, [userSavedMoviesArray]);

  return (
    <div>
      <Header isAuth={isAuth} />
      <SearchForm
        isSavedMovies={true}
        getMovies={getMovies}
        setSearchMessage={setSearchMessage}
        searchMessage={searchMessage}
      />
      <FilterCheckbox
        handleShortMovies={handleShortMovies}
        isSavedMovies={true}
      />
      {isSavedMoviesVisible ? (
        <MoviesCardList
          isSavedMovies={true}
          shownSavedMoviesArray={shownSavedMoviesArray}
          onDeleteMovie={onDeleteMovie}
        />
      ) : (
        ''
      )}
      <Footer />
    </div>
  );
}

export default SavedMovies;

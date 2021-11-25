/* eslint-disable no-console */
import React from "react";
import moviesApi from "../../utils/MoviesApi";
import useWindowSize from "../../utils/windowSize";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";

function Movies({
  isAuth,
  setShownMoviesArray,
  setSearchedMoviesArray,
  setShortMoviesArray,
  shownMoviesArray,
  searchedMoviesArray,
  shortMoviesArray,
  onSaveMovie,
  isPreloaderVisible,
  setIsPreloaderVisible
}) {
  const windowSize = useWindowSize();

  // сообщение о ненайденных фильмах при поиске
  const [searchMessage, setSearchMessage] = React.useState("");
  // Видимость секции "Movies"
  const [isMoviesVisible, setIsMoviesVisible] = React.useState(false);
  // переменная для работы чекбокса короткометражек
  const [isShortMovies, setIsShortMovies] = React.useState(false);
  // сколько карточек рендерить и сколько прибавлять по нажатию кнопки
  const [cardsAmount, setCardsAmount] = React.useState({ total: 12, delta: 3 });

  // Фильтрует полученные фильмы по значению инпута из SearchForm
  const filterMovies = (arr, query) =>
    arr.filter(
      (el) => el.nameRU.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );

  // проверка ширины страницы для добавления нужного количества карточек
  const checkAmount = () => {
    if (windowSize.width >= 1280) {
      setCardsAmount({ total: 12, delta: 3 });
    } else if (windowSize.width >= 768) {
      setCardsAmount({ total: 8, delta: 2 });
    } else if (windowSize.width >= 320) {
      setCardsAmount({ total: 5, delta: 2 });
    }
  };

  React.useEffect(() => {
    checkAmount();
  }, [windowSize.width]);

  const handleMoreButtonClick = () =>
    setCardsAmount({
      ...cardsAmount,
      total: cardsAmount.total + cardsAmount.delta,
    });

  // Работа с чекбоксом
  const filterDuration = (movies) =>
    movies.filter((movie) => movie.duration <= 40);

  // функция для переключения стейта чекбоксом
  const handleShortMovies = () => {
    setIsShortMovies(!isShortMovies);
  }

  // Запрос на получение фильмов со всеми фильтрами и прочим
  const getMovies = (title) => {
    if (title) {
      setIsPreloaderVisible(true);
      moviesApi
        .getAllMovies()
        .then((res) => {
          // Засовывание всех фильмов в локалсторадж
          localStorage.setItem("allMovies", JSON.stringify(res));
          // передача в константы результатов поиска и короткометражек
          const searchedMovies = filterMovies(JSON.parse(localStorage.getItem("allMovies")), title);
          const shortMovies = filterDuration(searchedMovies);
          console.log(shortMovies)
          // добавление всего в стейты
          setSearchedMoviesArray(searchedMovies);
          setShortMoviesArray(shortMovies);
          if (searchedMovies.length === 0) {
            setSearchMessage("Ничего не найдено");
            setIsMoviesVisible(false);
          } else {
            setIsMoviesVisible(true);
            setSearchMessage("");
            if (isShortMovies) {
              setShownMoviesArray(shortMovies);
            } else {
              setShownMoviesArray(searchedMovies);
            }
          }
        })
        .catch((err) => {
          console.log(err);
          setIsPreloaderVisible(false);
          setSearchMessage(
            "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен"
          );
        })
        .finally(() => {
          setIsPreloaderVisible(false);
        })
    } else {
      setSearchMessage("Нужно ввести ключевое слово");
      setIsMoviesVisible(false);
    }
  };

  // Реализация работы чекбокса с короткометражками после поиска по названию
  React.useEffect(() => {
    if (isShortMovies) {
      setShownMoviesArray(shortMoviesArray);
    } else {
      setShownMoviesArray(searchedMoviesArray);
    }
  }, [isShortMovies]);

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
      {isMoviesVisible ? (
        <MoviesCardList
          isSavedMovies={false}
          onSaveMovie={onSaveMovie}
          shownMoviesArray={shownMoviesArray}
          handleBtnClick={handleMoreButtonClick}
          total={cardsAmount.total}
        />
      ) : (
        ""
      )}
      {isPreloaderVisible ? (
        <Preloader />
      ) : (
        ""
      )}
      <Footer />
    </div>
  );
}

export default Movies;

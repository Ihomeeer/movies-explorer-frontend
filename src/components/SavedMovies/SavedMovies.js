import React from "react";
import mainApi from "../../utils/MainApi";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

function SavedMovies({
  isLoggedIn,
  setSavedMoviesArray,
  setShownMoviesArray,
  setSearchedMoviesArray,
  setShortMoviesArray,
  savedMoviesArray,
  shownMoviesArray,
  searchedMoviesArray,
  shortMoviesArray,
  currentUser,
  onSaveMovie,
  onDeleteMovie
}) {
  // сообщение о ненайденных фильмах при поиске
  const [searchMessage, setSearchMessage] = React.useState("");
  // Видимость секции "Movies"
  const [isMoviesVisible, setIsMoviesVisible] = React.useState(false);
  // переменная для работы чекбокса короткометражек
  const [isShortMovies, setIsShortMovies] = React.useState(false);

  // Работа с чекбоксом
  const filterDuration = (movies) =>
    movies.filter((movie) => movie.duration <= 40);

  // функция для переключения стейта чекбоксом
  const handleShortMovies = () => {
    setIsShortMovies(!isShortMovies);
  }

  React.useEffect(() => {
    mainApi.getMovies()
      .then((res) => {
        // Распихивание всего в локальное хранилище
        localStorage.setItem("allSavedMovies", JSON.stringify(res.data));
        localStorage.setItem("userSavedMovies", JSON.stringify(res.data.filter((movie) => movie.owner === currentUser._id)));
        const shortMovies = filterDuration(JSON.parse(localStorage.getItem("userSavedMovies")));
        localStorage.setItem("userSavedMoviesShorts", JSON.stringify(shortMovies));
        setSavedMoviesArray(JSON.parse(localStorage.getItem("userSavedMovies")));
        setShortMoviesArray(shortMovies);
        console.log(JSON.parse(localStorage.getItem("userSavedMovies")))
        if (JSON.parse(localStorage.getItem("userSavedMovies")).length > 0) {
          setShownMoviesArray(savedMoviesArray);
          setIsMoviesVisible(true);
        } else {
          setIsMoviesVisible(false);
          setSearchMessage("Отсутствуют сохраненные элементы");
        }
      })
      .catch((err) => {
        setSearchMessage(
          "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен"
        );
        console.log(err);
      });
  }, []);

  // Реализация работы чекбокса с короткометражками после поиска по названию
  React.useEffect(() => {
    if (isShortMovies) {
      setShownMoviesArray(shortMoviesArray);
    } else {
      setShownMoviesArray(savedMoviesArray);
    }
  }, [isShortMovies]);

  return (
    <div>
      <Header isLoggedIn={isLoggedIn} />
      <SearchForm
        // getMovies={getMovies}
        setSearchMessage={setSearchMessage}
        searchMessage={searchMessage}
      />
      <FilterCheckbox
        handleShortMovies={handleShortMovies}
      />
      {isMoviesVisible ? (
        <MoviesCardList
          isSavedMovies
          shownMoviesArray={shownMoviesArray}
          savedMoviesArray={savedMoviesArray}
          onSaveMovie={onSaveMovie}
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



  // Реализация работы чекбокса с короткометражками после поиска по названию
  // React.useEffect(() => {
  //   if (isShortMovies) {
  //     console.log(shortMoviesArray)
  //     console.log('лох')
  //     setShownMoviesArray(shortMoviesArray);
  //   } else {
  //     setShownMoviesArray(searchedMoviesArray);
  //   }
  // }, [isShortMovies]);
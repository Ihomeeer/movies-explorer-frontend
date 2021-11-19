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
    mainApi
      .getMovies()
      .then((res) => {
        // Распихивание всего в локальное хранилище
        localStorage.setItem("allSavedMovies", JSON.stringify(res.data));
        localStorage.setItem(
          "userSavedMovies",
          JSON.stringify(
            res.data.filter((movie) => movie.owner === currentUser._id)
          )
        );
        const shortMovies = filterDuration(
          JSON.parse(localStorage.getItem("userSavedMovies"))
        );
        localStorage.setItem("userSavedMoviesShorts", shortMovies);
        setSavedMoviesArray(
          JSON.parse(localStorage.getItem("userSavedMovies"))
        );
        setShortMoviesArray(shortMovies);
        if (JSON.parse(localStorage.getItem("userSavedMovies")).length > 0) {
          setIsMoviesVisible(true);
          if (isShortMovies) {
            setShownMoviesArray(
              JSON.parse(localStorage.getItem("userSavedMoviesShorts"))
            );
          } else {
            setShownMoviesArray(
              JSON.parse(localStorage.getItem("userSavedMovies"))
            );
          }
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
      setShownMoviesArray(searchedMoviesArray);
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
      <FilterCheckbox handleShortMovies={handleShortMovies} />
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

// Отображение сохраненок сразу при рендере страницы
// React.useEffect(() => {
//   mainApi.getMovies()
//   .then((res) => {
//     if (res.data.length > 0) {
//       setIsMoviesVisible(true);
//       setShownMoviesArray(res.data.filter((movie) => movie.owner === currentUser._id))
//       localStorage.setItem('savedMovies', JSON.stringify(res.data));
//       setShownMoviesArray(res.data.filter((movie) => movie.owner === currentUser._id));
//       if (isShortMovies) {
//         setShownMoviesArray(shortMoviesArray);
//         setSearchMessage('');
//       } else {
//         setShownMoviesArray(savedMoviesArray);
//         setSearchMessage('');
//       }
//     } else {
//       setIsMoviesVisible(false);
//       setSearchMessage('Отсутствуют сохраненные элементы');
//     }
//   })
//   .catch((err) => {
//     setSearchMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен');
//     console.log(err);
//   })
// }, [currentUser]);

// // Фильтрует полученные фильмы по значению инпута из SearchForm
// const filterMovies = (arr, query) => {

//   return arr.filter(el => el.nameRU.toLowerCase().indexOf(query.toLowerCase()) !== -1)
// }

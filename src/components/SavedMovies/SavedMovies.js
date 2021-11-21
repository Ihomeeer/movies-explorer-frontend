import React from "react";
import mainApi from "../../utils/MainApi";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

function SavedMovies({
  isAuth,
  userSavedMoviesArray,
  userSavedShortsArray,
  setShownSavedMoviesArray,
  shownSavedMoviesArray,
  onSaveMovie,
  onDeleteMovie
}) {
  // сообщение о ненайденных фильмах при поиске
  const [searchMessage, setSearchMessage] = React.useState("");
  // Видимость секции "Movies"
  const [isSavedMoviesVisible, setIsSavedMoviesVisible] = React.useState(false);
  // переменная для работы чекбокса короткометражек
  const [isShortMovies, setIsShortMovies] = React.useState(false);

    console.log(userSavedMoviesArray)
    console.log(userSavedShortsArray)

  // функция для переключения стейта чекбоксом
  const handleShortMovies = () => {
    setIsShortMovies(!isShortMovies);
  }

  // Фильтрует сохраненные фильмы по значению инпута из SearchForm
  const filterMovies = (arr, query) =>
    arr.filter(
      (el) => el.nameRU.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );

  const getMovies = (title) => {
    const currentMovies = filterMovies(JSON.parse(localStorage.getItem("userSavedMovies")), title);
    console.log(currentMovies);
    setShownSavedMoviesArray(currentMovies);
    if (currentMovies.length > 0) {
      setIsSavedMoviesVisible(true);
    } else {
      setIsSavedMoviesVisible(false);
    }
  }



  // Реализация работы чекбокса с короткометражками после поиска по названию
  React.useEffect(() => {
    if (isShortMovies) {
      setShownSavedMoviesArray(userSavedShortsArray);
    } else {
      setShownSavedMoviesArray(userSavedMoviesArray);
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
      {isSavedMoviesVisible ? (
        <MoviesCardList
          isSavedMovies
          shownSavedMoviesArray={shownSavedMoviesArray}
          userSavedMoviesArray={userSavedMoviesArray}
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
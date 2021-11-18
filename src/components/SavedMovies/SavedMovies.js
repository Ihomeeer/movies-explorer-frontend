import React from 'react';
import moviesApi from '../../utils/MoviesApi';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function SavedMovies({
  isLoggedIn,
  isSavedMovies,
  setShownMoviesArray,
  setSearchedMoviesArray,
  setShortMoviesArray,
  shownMoviesArray,
  searchedMoviesArray,
  shortMoviesArray,
  currentUser
}) {

  // сообщение о ненайденных фильмах при поиске
  const [searchMessage, setSearchMessage] = React.useState('');
  // Видимость секции "Movies"
  const [isMoviesVisible, setIsMoviesVisible] = React.useState(false);
  // переменная для работы чекбокса короткометражек
  const [isShortMovies, setIsShortMovies] = React.useState(false);



//Запись id в поле владельца сохраненной карточки
const owner = currentUser._id;







  // Фильтрует полученные фильмы по значению инпута из SearchForm
  const filterMovies = (arr, query) => {
    return arr.filter(el => el.nameRU.toLowerCase().indexOf(query.toLowerCase()) !== -1)
  }

    //Запрос на получение фильмов со всеми фильтрами и прочим
    const getMovies = (title) => {
      if (title) {
        moviesApi.getAllMovies()
        .then((res) => {
          // Засовывание всех фильмов в локалсторадж
          localStorage.setItem('allMovies', JSON.stringify(res));
          //передача в константы результатов поиска и короткометражек
          const searchedMovies = filterMovies(JSON.parse(localStorage.getItem('allMovies')), title);
          const shortMovies = filterDuration(searchedMovies);
          //добавление всего в стейты
          setSearchedMoviesArray(searchedMovies);
          setShortMoviesArray(shortMovies);
          if (searchedMovies.length === 0) {
            setSearchMessage('Ничего не найдено');
            setIsMoviesVisible(false);

            return
          } else {
            setIsMoviesVisible(true);
            setSearchMessage('');
            if (isShortMovies) {
              setShownMoviesArray(shortMovies);
            } else {
              setShownMoviesArray(searchedMovies);
            }
          }
        })
        .catch((err) => {
          setSearchMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен');
          console.log(err);
        })
      } else {
        setSearchMessage('Нужно ввести ключевое слово');
        setIsMoviesVisible(false);

        return
      }
    }

    // Реализация работы чекбокса с короткометражками после поиска по названию
    React.useEffect(() => {
      if (isShortMovies) {
        setShownMoviesArray(shortMoviesArray);
        console.log(shortMoviesArray)
      } else {
        setShownMoviesArray(searchedMoviesArray);
      }
    }, [isShortMovies]);

    //Работа с чекбоксом
    const filterDuration = (movies) => {
      return movies.filter((movie) => movie.duration <= 40);
      }

    //функция для переключения стейта чекбоксом
    function handleShortMovies() {
      setIsShortMovies(!isShortMovies);
    }

  return (
    <div>
      <Header
        isLoggedIn = {isLoggedIn}
      />
      <SearchForm
        getMovies={getMovies}
        searchMessage={searchMessage}
        isMoviesVisible={isMoviesVisible}
        searchedMovies={searchedMoviesArray}
      />
      <FilterCheckbox
        handleShortMovies={handleShortMovies}
      />
      {isMoviesVisible ? (
        <MoviesCardList
          isSavedMovies={isSavedMovies}
          shownMoviesArray={shownMoviesArray}
        />
      ) : ('')}
      <Footer />
    </div>
  )
}

export default SavedMovies;
import React from 'react';
import moviesApi from '../../utils/MoviesApi';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function Movies({
  isLoggedIn,
  isSavedMovies,
  setShownMoviesArray,
  setSearchedMoviesArray,
  setShortMoviesArray,
  shownMoviesArray,
  searchedMoviesArray,
  shortMoviesArray
}) {



  // сообщение о ненайденных фильмах при поиске
  const [searchMessage, setSearchMessage] = React.useState('');
  // Видимость секции "Movies"
  const [isMoviesVisible, setIsMoviesVisible] = React.useState(false);
  // переменная для работы чекбокса короткометражек
  const [isShortMovies, setIsShortMovies] = React.useState(false);

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
        console.log(shortMovies)
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

  React.useEffect(() => {
    // const shortMovies = filterDuration(searchedMoviesArray);
    if (isShortMovies) {
      console.log('попало в тру')
      setShownMoviesArray(shortMoviesArray);
      console.log(shortMoviesArray)
    } else {
      console.log('попало в фолс')
      setShownMoviesArray(searchedMoviesArray);
    }
  }, [isShortMovies])

  //функция для переключения стейта чекбоксом
  function handleShortMovies() {
    setIsShortMovies(!isShortMovies);
  }

  // Фильтрует полученные фильмы по значению инпута из SearchForm
  const filterMovies = (arr, query) => {
    return arr.filter(el => el.nameRU.toLowerCase().indexOf(query.toLowerCase()) !== -1)
  }

  //Работа с чекбоксом
  const filterDuration = (movies) => {
   return movies.filter((movie) => movie.duration <= 40);
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

export default Movies;




    //Запрос на получение фильмов
    // const getMovies = (title) => {
    //   if (title) {
    //     moviesApi.getAllMovies()
    //     .then((res) => {
    //       const newMovies = filterMovies(res, title);
    //       console.log(newMovies)
    //       if (newMovies.length === 0) {
    //         setSearchMessage('Ничего не найдено');
    //         setIsMoviesVisible(false);

    //         return
    //       } else {
    //         setSearchedMovies(newMovies);
    //         console.log(searchedMovies)
    //         setSearchMessage('');
    //         setIsMoviesVisible(true);
    //       }
    //     })
    //     .catch((err) => {
    //       setSearchMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен');
    //       console.log(err);
    //     })
    //   } else {
    //     setSearchMessage('Нужно ввести ключевое слово');
    //     setIsMoviesVisible(false);

    //     return
    //   }
    // }

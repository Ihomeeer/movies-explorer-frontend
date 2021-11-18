import React from 'react';
import moviesApi from '../../utils/MoviesApi';
import useWindowSize from '../../utils/windowSize';
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

  const windowSize = useWindowSize();

  // сообщение о ненайденных фильмах при поиске
  const [searchMessage, setSearchMessage] = React.useState('');
  // Видимость секции "Movies"
  const [isMoviesVisible, setIsMoviesVisible] = React.useState(false);
  // переменная для работы чекбокса короткометражек
  const [isShortMovies, setIsShortMovies] = React.useState(false);
  // проверка ширины страницы для добавления нужного количества карточек
  // сколько карточек рендерить и сколько прибавлять по нажатию кнопки
  const [cardsAmount, setCardsAmount] = React.useState({total: 12, delta: 3});

  // Фильтрует полученные фильмы по значению инпута из SearchForm
  const filterMovies = (arr, query) => {
    return arr.filter(el => el.nameRU.toLowerCase().indexOf(query.toLowerCase()) !== -1)
  }


  const checkAmount = () => {
    if (windowSize.width >= 1280) {
      setCardsAmount({total: 12, delta: 3})
    } else if (windowSize.width >= 768) {
      setCardsAmount({total: 8, delta: 2})
    } else if (windowSize.width >= 320) {
      setCardsAmount({total: 5, delta: 2})
    }
  }


  React.useEffect(() => {
    checkAmount();
  }, [windowSize.width]);


  const handleMoreButtonClick = () => {
    return setCardsAmount({
      ...cardsAmount,
      total: cardsAmount.total + cardsAmount.delta,
    });
  };



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
          handleBtnClick = {handleMoreButtonClick}
          total={cardsAmount.total}
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

import React from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import './App.css';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import mainApi from '../../utils/MainApi';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import {
  ShortMoviesDuration,
  ConflictErrorCode,
  UnauthorizedErrorCode,
  BadRequestErrorCode
 } from '../../utils/constants';

function App() {

  const history = useHistory();

  //  ---------------------------------------------------------------------------Хуки всякие, переменные
  // переменная для контекста
  const [currentUser, setCurrentUser] = React.useState({});
  // аутентификация
  const [isAuth, setIsAuth] = React.useState(false)
  // наличие ошибки при логине для выведения текста ошибки в соответствующий спан. По сути, сюда пишется текст ошибки
  const [isLoginError, setIsLoginError] = React.useState('');
  // наличие ошибки при регистрации для выведения текста ошибки в соответствующий спан. По сути, сюда пишется текст ошибки
  const [isRegisterError, setIsRegisterError] = React.useState('');
  // наличие сообщения при ихменении данных профиля для выведения текста в соответствующий спан. По сути, сюда пишется текст ошибки
  const [isProfileMessage, setIsProfileMessage] = React.useState('');
  // видимость загрузочной крутилки
  const [isPreloaderVisible, setIsPreloaderVisible] = React.useState(false);
  // отключение инпутов профиля, чтобы не случилось беды
  const [isProfileInputsDisabled, setIsProfileInputsDisabled] = React.useState(false)
  // отключение инпутов профиля, чтобы не случилось беды
  const [isLoginInputsDisabled, setIsLoginInputsDisabled] = React.useState(false)
  // отключение инпутов профиля, чтобы не случилось беды
  const [isRegisterInputsDisabled, setIsRegisterInputsDisabled] = React.useState(false)

  //  ---------------------------------------------------------------------------стейты для компонента Movies (BeatsFilm)
  // переменная для сохраненных фильмов, которые будут отрисовываться на странице
  const [shownMoviesArray, setShownMoviesArray] = React.useState([]);
  // переменная для записи отфильтрованных фильмов (по названию)
  const [searchedMoviesArray, setSearchedMoviesArray] = React.useState([]);
  // переменная для записи короткометражек
  const [shortMoviesArray, setShortMoviesArray] = React.useState([]);

  //  ---------------------------------------------------------------------------стейты для компонента savedMovies
  // переменная для сохраненных фильмов, которые будут отрисовываться на странице
  const [shownSavedMoviesArray, setShownSavedMoviesArray] = React.useState([]);
  // переменная для записи сохраненных отфильтрованных фильмов (по названию)
  const [searchedSavedMoviesArray, setSearchedSavedMoviesArray] = React.useState([]);
  // переменная для хранения сохраненных пользователем фильмов
  const [userSavedMoviesArray, setUserSavedMoviesArray] = React.useState([]);
  // переменная для сохраненных короткометражек
  const [userSavedShortsArray, setUserSavedShortsArray] = React.useState([]);

  // ---------------------------------------------------------------------------Аутентификация

    // проверка наличия и подлинности токена пользователя
    const checkToken = () => {
      const token = localStorage.getItem('token');
      if (token) {
        mainApi.getUserInfo()
        .then((res) => {
          if (res.data.email) {
            setCurrentUser(res.data)
            setIsAuth(true);
          }
        })
        .catch((err)=>{
          console.log(err);
          setIsAuth(false);
          localStorage.clear()
        })
      }
    }

    // Проверка авторизации при отрисовке страницы
    React.useEffect(() => {
      checkToken();
    }, [])

  // ---------------------------------------------------------------------------Работа с пользователем

  // Регистрация нового пользователя
  const handleRegister = (name, email, password) => {
    setIsRegisterInputsDisabled(true);
    mainApi.register(name, email, password)
    .then(() => {
      setIsRegisterInputsDisabled(false);
      setIsRegisterError('');
      handleLogin(email, password);
    })
    .catch((err) => {
      setIsRegisterInputsDisabled(false);
      if (err === ConflictErrorCode) {
        setIsRegisterError('Пользователь с такими данными уже существует');
      } else {
        setIsRegisterError('При регистрации профиля произошла ошибка');
      }
    })
  }

  // Логин существующего пользователя
  const handleLogin = (email, password) => {
    setIsLoginInputsDisabled(true);
    mainApi.authorize(email, password)
    .then((res) => {
      setIsLoginInputsDisabled(false);
      localStorage.setItem('token', res.token);
      mainApi.getUserInfo()
      .then((res) => {
        if(res.data.email) {
          setCurrentUser(res.data);
          setIsAuth(true);
          const currentUserId = res.data._id;
          mainApi.getMovies()
          .then((res) => {
            // записывание всего в константы
            const allSavedMovies = res.data;
            const userSavedMovies = filterOwner(allSavedMovies, currentUserId);
            // записывание всего в локальное хранилище
            localStorage.setItem("userSavedMovies", JSON.stringify(userSavedMovies));
            // записывание в стейты
            setUserSavedMoviesArray(userSavedMovies);
          })
          .catch((err) => {
            console.log(err)
          });
        }
      })
      .catch((err) => {
        console.log(err)
      });
      history.push('/movies')
    })
    .catch((err) => {
      setIsLoginInputsDisabled(false);
      if (err === UnauthorizedErrorCode || BadRequestErrorCode) {
        setIsLoginError('Введены некорректные данные пользователя');
      } else {
        setIsLoginError('При авторизации произошла ошибка');
      }
    })
  }

  // Логаут существующего пользователя
  const handleLogOut = () => {
    localStorage.clear();
    setIsAuth(false);
    setUserSavedMoviesArray([]);
    setCurrentUser('');
    history.push('/');
  }

  // Измененение данных текущего пользователя
  const handleChangeProfile = (data) => {
    setIsProfileInputsDisabled(true);
    mainApi.sendUserInfo(data)
    .then((res) => {
      setCurrentUser(res.data);
      setIsProfileInputsDisabled(false);
      setIsProfileMessage('Профиль успешно обновлен');
    })
    .catch((err) => {
      setIsProfileInputsDisabled(false);
      if (err === ConflictErrorCode || ConflictErrorCode) {
        setIsProfileMessage('Пользователь с такими данными уже существует');
      } else {
        setIsProfileMessage('При обновлении профиля произошла ошибка');
      }
    })
  }

  // ---------------------------------------------------------------------------Карточки с фильмами

  // Фильтрует сохраненные фильмы по длительности
  const filterDuration = (movies) =>
  movies.filter(
    (movie) => movie.duration <= ShortMoviesDuration
  );

  // Отфильтровывание фильмов, сохраненных пользователем
  const filterOwner = (movies, id) =>
  movies.filter((movie) => movie.owner === id);

  // Сохранение карточки
  const handleSaveMovie = (data) => {
    mainApi.addNewMovie(data)
    .then(() => {
      // если ответ 200, то повторный запрос сохраненок и перерисовывание их на странице в новом составе
      mainApi.getMovies()
      .then((res) => {
        const newMoviesArray = res.data;
        const userId = currentUser._id;
        const newUserSavedMovies = filterOwner(newMoviesArray, userId);
        localStorage.setItem("userSavedMovies", JSON.stringify(newUserSavedMovies));
        setUserSavedMoviesArray(newUserSavedMovies);
      })
      .catch(error => {
        console.log(error)
      })
    })
    .catch(error => {
      console.log(error)
    })
  }

  // Удаление карточки
  const handleDeleteMovie = (id) => {
    console.log(id);
    const searchedSavedMovies = JSON.parse(localStorage.getItem("searchedSavedMovies"));
    const newSeachedSavedMovies = searchedSavedMovies.filter((movie) => movie._id != id);
    const newSeachedSavedShorts = filterDuration(newSeachedSavedMovies);
    localStorage.setItem("searchedSavedMovies", JSON.stringify(newSeachedSavedMovies));
    localStorage.setItem("searchedSavedShorts", JSON.stringify(newSeachedSavedShorts));
    console.log(newSeachedSavedMovies);
    mainApi.deleteMovie(id)
    .then(() => {
      // если ответ 200, то повторный запрос сохраненок и перерисовывание их на странице в новом составе
      mainApi.getMovies()
      .then((res) => {
        const newMoviesArray = res.data;
        const userId = currentUser._id;
        const newUserSavedMovies = filterOwner(newMoviesArray, userId);
        localStorage.setItem("userSavedMovies", JSON.stringify(newUserSavedMovies));
        setUserSavedMoviesArray(newUserSavedMovies);
      })
      .catch(error => {
        console.log(error)
      })
    })
    .catch(error => {
      console.log(error)
    })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <Switch>

            <Route exact path="/signup">
            {isAuth
              ? <Redirect to="/" />
              : <Register
                handleRegister={handleRegister}
                isRegisterError={isRegisterError}
                isRegisterInputsDisabled={isRegisterInputsDisabled}
                />
            }
            </Route>

            <Route exact path="/signin">
              {isAuth
                ? <Redirect to="/" />
                : <Login
                    handleLogin={handleLogin}
                    isLoginError={isLoginError}
                    isLoginInputsDisabled={isLoginInputsDisabled}
                  />
              }
            </Route>

            <Route exact path="/">
              <Main
                isAuth={isAuth}
                isMainPage="true"
              />
            </Route>

            <ProtectedRoute exact path="/movies"
              component={Movies}
              isAuth={isAuth}
              setShownMoviesArray={setShownMoviesArray}
              setSearchedMoviesArray={setSearchedMoviesArray}
              setShortMoviesArray={setShortMoviesArray}
              shownMoviesArray={shownMoviesArray}
              searchedMoviesArray={searchedMoviesArray}
              shortMoviesArray={shortMoviesArray}
              onSaveMovie={handleSaveMovie}
              onDeleteMovie={handleDeleteMovie}
              isPreloaderVisible={isPreloaderVisible}
              setIsPreloaderVisible={setIsPreloaderVisible}
            />

            <ProtectedRoute exact path="/saved-movies"
              component={SavedMovies}
              isAuth={isAuth}
              searchedSavedMoviesArray={searchedSavedMoviesArray}
              setSearchedSavedMoviesArray={setSearchedSavedMoviesArray}
              userSavedMoviesArray={userSavedMoviesArray}
              setUserSavedShortsArray={setUserSavedShortsArray}
              userSavedShortsArray={userSavedShortsArray}
              setShownSavedMoviesArray={setShownSavedMoviesArray}
              shownSavedMoviesArray={shownSavedMoviesArray}
              onDeleteMovie={handleDeleteMovie}
            />

            <ProtectedRoute exact path="/profile"
              component={Profile}
              isAuth={isAuth}
              handleLogOut = {handleLogOut}
              handleChangeProfile = {handleChangeProfile}
              setIsProfileMessage={setIsProfileMessage}
              isProfileMessage={isProfileMessage}
              isProfileInputsDisabled={isProfileInputsDisabled}
            />

            <Route path="*">
              <NotFoundPage />
            </Route>

          </Switch>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );

}

export default App;

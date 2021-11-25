import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
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

  // Получение инфы о пользователе при отрисовке страницы и отправка ее в контекст
  React.useEffect(() => {
    if (isAuth) {
      mainApi.getUserInfo()
      .then((res) => {
        setCurrentUser(res.data)
      })
      .catch(error => {
        console.log(error)
      })
    }
  }, [isAuth])

  // ---------------------------------------------------------------------------Работа с пользователем
  // проверка наличия и подлинности токена пользователя
  const checkToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
      mainApi.getUserInfo()
      .then((res) => {
        if (res.data.email) {
          console.log('проверка токена успешна')
          setIsAuth(true);
        }
      })
      .catch((err)=>{
        console.log('проверка токена сломалась')
        console.log(err);
        setIsAuth(false);
      })
    }
  }
  // Проверка авторизации при отрисовке страницы
  React.useEffect(() => {
    checkToken();
  }, [])

  // Отфильтровывание фильмов, сохраненных пользователем
  const filterOwner = (movies, id) =>
  movies.filter((movie) => movie.owner === id);

  // Регистрация нового пользователя
  const handleRegister = (name, email, password) => {
    setIsRegisterInputsDisabled(true);
    mainApi.register(name, email, password)
    .then(() => {
      setIsRegisterInputsDisabled(false);
      history.push('/signin')
      setIsRegisterError('');
    })
    .catch((err) => {
      setIsRegisterInputsDisabled(false);
      if (err === '409') {
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
      if (res.token) {
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
              // localStorage.setItem("allSavedMovies", JSON.stringify(allSavedMovies));
              localStorage.setItem("userSavedMovies", JSON.stringify(userSavedMovies));
              // localStorage.setItem("userSavedShorts", JSON.stringify(userSavedShorts));
              // записывание в стейты
              setUserSavedMoviesArray(userSavedMovies);
              // setUserSavedShortsArray(userSavedShorts);
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
      }
    })
    .catch((err) => {
      setIsLoginInputsDisabled(false);
      if (err === '401' || '400') {
        setIsLoginError('Введены некорректные данные пользователя');
      } else {
        setIsLoginError('При авторизации произошла ошибка');
      }
    })
  }

  // Логаут существующего пользователя
  const handleLogOut = () => {
    localStorage.clear();
    setCurrentUser({});
    setIsAuth(false);
    history.push('/');
  }

  // Измененение данных текущего пользователя
  const handleChangeProfile = (data) => {
    setIsProfileInputsDisabled(true);
    mainApi.sendUserInfo(data)
    .then(() => {
      setIsProfileInputsDisabled(false);
      setIsProfileMessage('Профиль успешно обновлен');
    })
    .catch((err) => {
      setIsProfileInputsDisabled(false);
      if (err === '409' || '409') {
        setIsProfileMessage('Пользователь с такими данными уже существует');
      } else {
        setIsProfileMessage('При обновлении профиля произошла ошибка');
      }
    })
  }

  // ---------------------------------------------------------------------------Карточки с фильмами

  // Сохранение карточки
  const handleSaveMovie = (data) => {
    mainApi.addNewMovie(data)
      .then((res) => { // написать проверку id, чтобы не сохранять несколько одинаковых карточек
        console.log(res)
        setUserSavedMoviesArray([res.data, ...userSavedMoviesArray]) //заменить на перерендер сейвов
        localStorage.setItem('userSavedMovies', JSON.stringify([res.data, ...userSavedMoviesArray]));
      })
      .catch(error => {
        console.error(error)
      })
  }

  // Удаление карточки
  const handleDeleteMovie = (id) => {
    mainApi.deleteMovie(id)
    .then(() => {
      mainApi.getMovies()
      .then((res) => {
        const newMoviesArray = res.data;
        const userId = currentUser._id;
        const newUserSavedMovies = filterOwner(newMoviesArray, userId);
        // localStorage.setItem("allSavedMovies", JSON.stringify(newMoviesArray));
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
              <Register
                handleRegister={handleRegister}
                isRegisterError={isRegisterError}
                isRegisterInputsDisabled={isRegisterInputsDisabled}
              />
            </Route>

            <Route exact path="/signin">
              <Login
                handleLogin={handleLogin}
                isLoginError={isLoginError}
                isLoginInputsDisabled={isLoginInputsDisabled}
              />
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
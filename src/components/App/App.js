import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import {serverUrl} from '../../utils/constants';
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




  //  ---------------------------------------------------------------------------стейты для компонента Movies (BeatsFilm)
  // переменная для отфильтрованных по названию фильмов
  const [shownMoviesArray, setShownMoviesArray] = React.useState([]);
  // переменная для записи отфильтрованных фильмов
  const [searchedMoviesArray, setSearchedMoviesArray] = React.useState([]);
  // переменная для записи короткометражек
  const [shortMoviesArray, setShortMoviesArray] = React.useState([]);




  //  ---------------------------------------------------------------------------стейты для компонента savedMovies
  // переменная для отфильтрованных по названию сохраненных пользователем фильмов
  const [shownSavedMoviesArray, setShownSavedMoviesArray] = React.useState([]);
  // переменная для хранения сохраненных пользователем фильмов
  const [userSavedMoviesArray, setUserSavedMoviesArray] = React.useState([]);
  // переменная для отфильтрованных по названию сохраненных пользователем фильмов
  const [userSavedShortsArray, setUserSavedShortsArray] = React.useState([]);

  // Получение инфы о пользователе при отрисовке страницы и отправка ее в контекст
  React.useEffect(() => {
    if (isAuth) {
      mainApi.checkUser()
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
      mainApi.checkUser()
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

  // Регистрация нового пользователя
  const handleRegister = (name, email, password) => {
    mainApi.register(name, email, password)
    .then((res) => {
      console.log(res);
      history.push('/signin')
      setIsRegisterError('');
    })
    .catch((err) => {
      if (err === '409') {
        setIsRegisterError('Пользователь с такими данными уже существует');
      } else {
        setIsRegisterError('При регистрации профиля произошла ошибка');
      }
    })
  }

  // Логин существующего пользователя
  const handleLogin = (email, password) => {
    mainApi.authorize(email, password)
    .then((res) => {
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
              const userSavedShorts = filterDuration(userSavedMovies);
              // записывание всего в локальное хранилище
              localStorage.setItem("allSavedMovies", JSON.stringify(allSavedMovies));
              localStorage.setItem("userSavedMovies", JSON.stringify(userSavedMovies));
              localStorage.setItem("userSavedShorts", JSON.stringify(userSavedShorts));
              // записывание в стейты
              setUserSavedMoviesArray(userSavedMovies); //вот эти 2 стейта я прокидываю в savedMovies (строки 258 и 259)
              setUserSavedShortsArray(userSavedShorts);
            })
            .catch((err) => console.log(err));
          }
        })
        .catch((err) => console.log(err));
        history.push('/movies')
      }
    })
    .catch((err) => {
      if (err === '401' || '400') {
        setIsLoginError('Введены некорректные данные пользователя');
      } else {
        setIsLoginError('При авторизации произошла ошибка');
      }
    })
  }

  console.log(userSavedMoviesArray)
  console.log(userSavedShortsArray)

  // Логаут существующего пользователя
  const handleLogOut = () => {
    localStorage.clear();
    setCurrentUser({});
    setIsAuth(false);
    history.push('/');
  }

  // Измененение данных текущего пользователя
  const handleChangeProfile = (data) => {
    mainApi.sendUserInfo(data)
    .then(() => {
      setIsProfileMessage('Профиль успешно обновлен');
    })
    .catch((err) => {
      if (err === '409' || '409') {
        setIsProfileMessage('Пользователь с такими данными уже существует');
      } else {
        setIsProfileMessage('При обновлении профиля произошла ошибка');
      }
    })
  }

  // ---------------------------------------------------------------------------Карточки с фильмами

  // Сохранение карточки
  // const handleSaveMovie = (data) => {
  //   mainApi.addNewMovie(data)
  //     .then((res) => {
  //       setSavedMoviesArray([res.data, ...savedMoviesArray]) //заменить на перерендер сейвов
  //       localStorage.setItem('userSavedMovies', JSON.stringify([res.data, ...savedMoviesArray]));
  //     })
  //     .catch(error => {
  //       console.error(error)
  //     })
  // }

  // // Удаление карточки
  // const handleDeleteMovie = (data) => { //упростить
  //   const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
  //   mainApi
  //     .deleteSavedMovie(data._id)
  //     .then(() => {
  //       setSavedMoviesArray((newArray) => newArray.filter((element) => element._id !== data._id));
  //       const updatedArray = savedMovies.filter(
  //         (element) => element._id !== data._id,
  //       );
  //       localStorage.setItem('savedMovies', JSON.stringify(updatedArray));
  //       setSavedMoviesArray(updatedArray);
  //     })
  //     .catch(err => {
  //       console.error(err)
  //     })
  // }


  // Отфильтровывание фильмов, сохраненных пользователем
  const filterOwner = (movies, id) =>
  movies.filter((movie) => movie.owner === id);

  const filterDuration = (movies) =>
  movies.filter((movie) => movie.duration <= 40);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <Switch>

            <Route exact path="/signup">
              <Register
                handleRegister={handleRegister}
                isRegisterError={isRegisterError}
              />
            </Route>

            <Route exact path="/signin">
              <Login
                handleLogin={handleLogin}
                isLoginError={isLoginError}
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
              // onSaveMovie={handleSaveMovie}
            />

            <ProtectedRoute exact path="/saved-movies"
              component={SavedMovies}
              isAuth={isAuth}
              userSavedMoviesArray={userSavedMoviesArray}
              userSavedShortsArray={userSavedShortsArray}
              setShownSavedMoviesArray={setShownSavedMoviesArray}
              shownSavedMoviesArray={shownSavedMoviesArray}
              // onSaveMovie={handleSaveMovie}
              // onDeleteMovie={handleDeleteMovie}
            />

            <ProtectedRoute exact path="/profile"
                component={Profile}
                isAuth={isAuth}
                handleLogOut = {handleLogOut}
                handleChangeProfile = {handleChangeProfile}
                isProfileMessage={isProfileMessage}
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




  // //Запрос на получение фильмов
  // const getMovies = (title) => {
  //   if (title) {
  //     moviesApi.getAllMovies()
  //     .then((res) => {
  //       const newMovies = filterMovies(res, title);
  //       if (newMovies.length === 0) {
  //         setSearchMessage('Ничего не найдено');
  //         setIsMoviesVisible(false);

  //         return
  //       } else {
  //         setSearchedMovies(newMovies);
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



  // // Логин существующего пользователя
  // const handleLogin = (email, password) => {
  //   mainApi.authorize(email, password)
  //   .then((res) => {
  //     if (res.token) {
  //       localStorage.setItem('token', res.token);
  //       setLoggedIn(true);
  //       history.push('/movies')
  //     }
  //   })
  //   .catch((err) => {
  //     if (err === '401' || '400') {
  //       setIsLoginError('Введены некорректные данные пользователя');
  //     } else {
  //       setIsLoginError('При авторизации произошла ошибка');
  //     }
  //   })
  // }


    // // проверка наличия и подлинности токена пользователя
    // const checkToken = () => {
    //   const token = localStorage.getItem('token');
    //   if (token) {
    //     mainApi.checkUser()
    //     .then((res) => {
    //       if (res.data.email) {
    //         setLoggedIn(true);
    //         console.log('проверка токена успешна')
    //       }
    //     })
    //     .catch((err)=>{
    //       console.log('проверка токена сломалась')
    //       console.log(err);
    //     })
    //   }
    // }
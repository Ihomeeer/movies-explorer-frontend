import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
import CurrentUserContext from '../../contexts/CurrentUserContext';
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

  //---------------------------------------------------------------------------Хуки всякие, переменные
  // переменная для контекста
  const [currentUser, setCurrentUser] = React.useState({});
  // проверка логина для навбара в хидере
  const [loggedIn, setLoggedIn] = React.useState(true);
  // наличие ошибки при логине для выведения текста ошибки в соответствующий спан. По сути, сюда пишется текст ошибки
  const [isLoginError, setIsLoginError] = React.useState('');
  // наличие ошибки при регистрации для выведения текста ошибки в соответствующий спан. По сути, сюда пишется текст ошибки
  const [isRegisterError, setIsRegisterError] = React.useState('');
  // наличие сообщения при ихменении данных профиля для выведения текста в соответствующий спан. По сути, сюда пишется текст ошибки
  const [isProfileMessage, setIsProfileMessage] = React.useState('');
  // переменная для выводивых фильмов
  const [shownMoviesArray, setShownMoviesArray] = React.useState([[]]);
  // переменная для записи отфильтрованных фильмов
  const [searchedMoviesArray, setSearchedMoviesArray] = React.useState([]);
  // переменная для записи короткометражек
  const [shortMoviesArray, setShortMoviesArray] = React.useState([]);

  // проверка для выделения активной кнопки в хидере
  const [isSavedMovies, setIsSavedMovies] = React.useState(false);
  // Проверка авторизации при отрисовке страницы
  React.useEffect(() => {
    checkToken();
  }, [])
  // Получение инфы о пользователе при отрисовке страницы и отправка ее в контекст
  React.useEffect(() => {
    if (loggedIn) {
      mainApi.checkUser()
      .then((res) => {
        setCurrentUser(res.data)
      })
      .catch(error => {
        console.error(error)
      })
    }
  }, [loggedIn])
  //---------------------------------------------------------------------------Хэндлеры, функции и прочее
  //проверка наличия и подлинности токена пользователя
  const checkToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
      mainApi.checkUser()
      .then((res) => {
        if (res.data.email) {
          setLoggedIn(true);
          console.log('проверка токена успешна')
        }
      })
      .catch((err)=>{
        console.log('проверка токена сломалась')
        console.log(err);
      })
    } else {
      return
    }
  }

  //Регистрация нового пользователя
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

  //Логин существующего пользователя
  const handleLogin = (email, password) => {
    mainApi.authorize(email, password)
    .then((res) => {
      if (res.token) {
        localStorage.setItem('token', res.token);
        setLoggedIn(true);
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

  //Логаут существующего пользователя
  const handleLogOut = () => {
    localStorage.removeItem('token');
    // localStorage.removeItem('jwt');
    setLoggedIn(false);
    setCurrentUser({});
    history.push('/')
  }

  //Измененение данных текущего пользователя
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

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
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
                isLoggedIn={loggedIn}
                isMainPage="true"
              />
            </Route>
            <Route exact path="/movies">
              <Movies
                isLoggedIn={loggedIn}
                setShownMoviesArray={setShownMoviesArray}
                setSearchedMoviesArray={setSearchedMoviesArray}
                setShortMoviesArray={setShortMoviesArray}
                shownMoviesArray={shownMoviesArray}
                searchedMoviesArray={searchedMoviesArray}
                shortMoviesArray={shortMoviesArray}
              />
            </Route>
            <Route exact path="/saved-movies">
              <SavedMovies
                isLoggedIn={loggedIn}
                isSavedMovies={isSavedMovies}
              />
            </Route>
            <Route exact path="/profile">
              <Profile
                isLoggedIn={loggedIn}
                handleLogOut = {handleLogOut}
                handleChangeProfile = {handleChangeProfile}
                isProfileMessage={isProfileMessage}
              />
            </Route>
            <Route path="*">
              <NotFoundPage />
            </Route>
          </Switch>
        </div>
      </CurrentUserContext.Provider>
    </div>
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




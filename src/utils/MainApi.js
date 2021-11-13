import { mainApiUrl } from './constants';

//Класс содержит всю логику для работы с BeatFilmsApi
class MainApi {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  //проверка состояния промиса
  _checkStatus(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  //регистрация нового пользователя
  register(name, email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers:   {
        'Accept': "application/json",
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({name, email, password})
    })
    .then(res => this._checkStatus(res));
  }

  //Запрос для авторизации пользователя
  authorize(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        password: password,
        email: email
      })
    })
    .then(res => this._checkStatus(res));
  }

  //Запрос для проверки валидности токена
  checkUser() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers,
    })
    .then(res => this._checkStatus(res));
  }

  //получение информации о пользователе с сервера
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers,
    })
    .then(res => this._checkStatus(res));
  }

  //обновление информации о пользователе с сервера
  sendUserInfo(userData) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify ({
        name: userData.name,
        email: userData.email
      })
    })
    .then(res => this._checkStatus(res));
  }

  //получение списка карточек с сервера при старте страницы
  getMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'GET',
      headers: this._headers,
    })
    .then(res => this._checkStatus(res));
  }

  //карточка с кинцом с сервера
  addNewMovie(movieData) {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify ({
        country: movieData.country,
        director: movieData.director,
        duration: movieData.duration,
        year: movieData.year,
        description: movieData.description,
        image: movieData.image,
        trailer: movieData.trailer,
        thumbnail: movieData.thumbnail,
        nameRU: movieData.nameRU,
        nameEN: movieData.nameEN,
        movieId: movieData.movieId,
        owner: movieData.owner,
      })
    })
    .then(res => this._checkStatus(res));
  }

  //удаление карточки с сервера
  deleteMovie(id) {
    return fetch(`${this._baseUrl}/movies/${id}`, {
      method: 'DELETE',
      headers: this._headers,
      })
      .then(res => this._checkStatus(res));
  }
}

const mainApi = new MainApi({
  baseUrl: mainApiUrl,
  headers:
  {
    'Accept': "application/json",
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'
  }
});

export default mainApi;

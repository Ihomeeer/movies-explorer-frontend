import { mainApiUrl } from "./constants";

// Класс содержит всю логику для работы с BeatFilmsApi
class MainApi {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  // проверка состояния промиса
  _checkStatus(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // регистрация нового пользователя
  register(name, email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ name, email, password }),
    }).then((res) => this._checkStatus(res));
  }

  // Запрос для авторизации пользователя
  authorize(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        email,
      }),
    }).then((res) => this._checkStatus(res));
  }

  // получение информации о пользователе с сервера
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    }).then((res) => this._checkStatus(res));
  }

  // обновление информации о пользователе с сервера
  sendUserInfo(userData) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userData.name,
        email: userData.email,
      }),
    }).then((res) => this._checkStatus(res));
  }

  // получение списка карточек с сервера при старте страницы
  getMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    }).then((res) => this._checkStatus(res));
  }

  // отправка карточки с фильмом в сохраненки
  addNewMovie(movieData) {
    return fetch(`${this._baseUrl}/movies`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        country: movieData.country ? movieData.country : "Страна не указана",
        director: movieData.director ? movieData.director : "Директор не указан",
        duration: movieData.duration ? movieData.duration : 9000,
        year: movieData.year ? movieData.year : "Год не указан",
        description: movieData.description ? movieData.description : "Описание отсутствует",
        image: movieData.image,
        trailer: movieData.trailer ? movieData.trailer : "https://youtube.ru",
        thumbnail: movieData.thumbnail ? movieData.thumbnail : "отсутствует",
        nameRU: movieData.nameRU ? movieData.nameRU : "Имя отутствует в базе",
        nameEN: movieData.nameEN ? movieData.nameEN : "Имя отутствует в базе",
        movieId: movieData.movieId,
        owner: movieData.owner,
      }),
    }).then((res) => this._checkStatus(res));
  }

  // удаление карточки с сервера
  deleteMovie(id) {
    return fetch(`${this._baseUrl}/movies/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    }).then((res) => this._checkStatus(res));
  }
}

const mainApi = new MainApi({
  baseUrl: mainApiUrl,
});

export default mainApi;

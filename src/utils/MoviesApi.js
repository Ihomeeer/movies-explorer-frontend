import { moviesApiUrl } from './constants';

// Класс содержит всю логику для работы с BeatFilmsApi
class MoviesApi {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  // проверка состояния промиса
  _checkStatus(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // получение списка ВСЕХ фильмов от API (сделано специально, чтобы поработать с фильтрацией на стороне пользователя)
  getAllMovies() {
    return fetch(`${this._baseUrl}`, {
      method: 'GET',
      headers: this._headers,
    })
    .then(res => this._checkStatus(res));
  }
}

const moviesApi = new MoviesApi({
  baseUrl: moviesApiUrl,
  headers: {
  'Content-Type': 'application/json',
  }
});

export default moviesApi;

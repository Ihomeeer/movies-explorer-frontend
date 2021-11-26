import React from "react";
import "./MoviesCard.css";
import { serverUrl } from "../../utils/constants";

function MoviesCard({
  card,
  isSavedMovies,
  onSaveMovie,
  onDeleteMovie,
  userSavedMoviesArray
}) {

  // стейт для определения наличия лайка
  const [isLiked, setIsLiked] = React.useState(false)

  // проверка, присутствует ли карточка в массиве с сохраненками. Number, потому что в бд id дается строкой
  const isSaved = card.id && JSON.parse(localStorage.getItem("userSavedMovies")).some(element => Number(element.movieId) === card.id);

  // просто вынесенный класс кнопки
  const likeButtonStatus = (`movie__like-button ${isLiked ? 'movie__like-button_active' : 'movie__like-button_inactive'}`)

  React.useEffect(() => {
    if (!isSavedMovies) {
      if (isSaved) {
        setIsLiked (true)
      } else {
        setIsLiked(false)
      }
    }
  })

   // Тут проверка, надо ли рисовать


  // некоторые поля в объекте могут отсутствовать или быть разными для разных api
  const cardToSave = {
    country: card.country,
    director: card.director,
    duration: card.duration,
    year: card.year,
    description: card.description,
    image: isSavedMovies ? card.image : `${serverUrl}${card.image.url}`,
    trailer:  isSavedMovies ? card.trailer : card.trailerLink,
    thumbnail: isSavedMovies ? card.thumbnail : `${serverUrl}${card.image.formats.thumbnail.url}`,
    movieId: isSavedMovies ? card._id : card.id,
    nameRU: card.nameRU,
    nameEN: card.nameEN,
  }

  // Перевод длительности в формат чч:мм
  function convertDuration(mins) {
    const hours = Math.trunc(mins / 60);
    const minutes = mins % 60;
    return `${hours}ч ${minutes}мин`;
  }

  function buttonClick() {
    if (isSavedMovies) {
      onDeleteMovie(cardToSave.movieId);
    } else {
      if (isSaved) {
        const currentSavedMovies = JSON.parse(localStorage.getItem("userSavedMovies"));
        const currentMovie = currentSavedMovies.filter((element) => Number(element.movieId) === card.id);
        onDeleteMovie(currentMovie[0]._id);
      } else {
        onSaveMovie(cardToSave);
      }
    }
  }

  return (
    <li className="movie__card">
      <div className="movie__info-panel">
        <div className="movie__info-wrapper">
          <p className="movie__title">{cardToSave.nameRU}</p>
          <p className="movie__duration">{convertDuration(cardToSave.duration)}</p>
        </div>
          {isSavedMovies ? (
            <button
              className="movie__like-button movie__like-button_saved"
              onClick={buttonClick}
              type="button"
              aria-label="like"
            />
           ) : (
            <button
            className={likeButtonStatus}
            onClick={buttonClick}
            type="button"
            aria-label="like"
            />
            )
          }
      </div>
      <a className="movie__trailer-link" target="_blank" href={card.trailerLink}>
        <img
          className="movie__poster"
          alt="Постер фильма"
          src={cardToSave.image}
        />
      </a>
    </li>
  );
}

export default MoviesCard;

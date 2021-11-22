import React from "react";
import "./MoviesCard.css";
import { serverUrl } from "../../utils/constants";

function MoviesCard({
  card,
  isSavedMovies,
  isLiked,
  onSaveMovie,
  onDeleteMovie,
  savedMoviesArray
}) {

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

  function convertDuration(mins) {
    const hours = Math.trunc(mins / 60);
    const minutes = mins % 60;
    return `${hours}ч ${minutes}мин`;
  }

  function buttonClick(card) {
    if (isSavedMovies) {
      onDeleteMovie(cardToSave.movieId);
    } else {
      onSaveMovie(cardToSave);
    }
  }

  return (
    <li className="movie__card">
      <div className="movie__info-panel">
        <div className="movie__info-wrapper">
          <p className="movie__title">{cardToSave.nameRU}</p>
          <p className="movie__duration">{convertDuration(cardToSave.duration)}</p>
        </div>
        <button
          className={
            isSavedMovies
              ? "movie__like-button_saved"
              : isLiked
              ? "movie__like-button_active"
              : "movie__like-button"
          }
          onClick={buttonClick}
          type="button"
          aria-label="like"
        />
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

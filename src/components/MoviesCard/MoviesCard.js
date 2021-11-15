import React from 'react';
import './MoviesCard.css';
import {serverUrl} from '../../utils/constants';

function MoviesCard ({
  card,
}) {

  function convertDuration(mins) {
    let hours = Math.trunc(mins/60);
    let minutes = mins % 60;
    return hours + 'ч ' + minutes + 'мин';
  };

  return (
    <li className="movie__card">
      <div className="movie__info-panel">
        <div className="movie__info-wrapper">
          <p className="movie__title">{card.nameRU}</p>
          <p className="movie__duration">{convertDuration(card.duration)}</p>
        </div>
        <button className="movie__like-button" type="button"></button>
      </div>
      <a className="movie__trailer-link" href={card.trailerLink}>
        <img className="movie__poster" alt="Постер фильма" src={`${serverUrl}${card.image.url}`}></img>
      </a>
    </li>
  )
};

export default MoviesCard;
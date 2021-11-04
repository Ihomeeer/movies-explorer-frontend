import React from 'react';
import './MoviesCard.css';

function MoviesCard (props) {

  return (
    <li className="movie__card">
      <div className="movie__info-panel">
        <div className="movie__info-wrapper">
          <p className="movie__title">АБОБА АБОБА АБОБА АБОБА АБОБА</p>
          <p className="movie__duration">14ч 54м</p>
        </div>
        <button className="movie__like-button" type="button"></button>
      </div>
      <img className="movie__poster" alt="постер фильма" src="https://gomel24.com/wp-content/uploads/2021/02/aboba-5.png"></img>
    </li>
  )
};

export default MoviesCard;
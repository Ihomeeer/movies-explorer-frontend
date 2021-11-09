import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList ({
  isSavedMovies
}) {

  return (
    <section className="section movies">
      <ul className="movies__list">
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      </ul>
        <button type="button" className={`movies__append-button  ${isSavedMovies ? 'movies__append-button_none' : ' '}`}>Ещё</button>
    </section>
  )
};

export default MoviesCardList;
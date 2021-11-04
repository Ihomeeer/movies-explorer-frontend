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
      </ul>
      {isSavedMovies ? (
        ''
      ) : (
        <button type="button" className="movies__append-button">Ещё</button>
      )}
    </section>
  )
};

export default MoviesCardList;
import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList ({
  isSavedMovies,
  searchedMovies
}) {

  return (
    <section className="section movies">
      <ul className="movies__list">
      {searchedMovies.map((movie) => {
          return (
            <MoviesCard key={movie.id} card={movie}/>
          )
      })}
      </ul>
        <button type="button" className={`movies__append-button  ${isSavedMovies ? 'movies__append-button_none' : ' '}`}>Ещё</button>
    </section>
  )
};

export default MoviesCardList;
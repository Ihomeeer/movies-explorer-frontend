import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList ({
  isSavedMovies,
  shownMoviesArray,
  handleBtnClick,
  total
}) {
  const[buttonVisibility, setButtonVisibility] = React.useState(false);

  React.useEffect(() => {
    if (total > shownMoviesArray.length) {
      setButtonVisibility(true);
    } else {
      setButtonVisibility(false);
    }
  }, [shownMoviesArray, total])

  return (
    <section className="section movies">
      {isSavedMovies ?
      (
        <ul className="movies__list">
          {shownMoviesArray.map((movie) => {
              return (
                <MoviesCard key={movie.id} card={movie}/>
              )
          })}
        </ul>
      ) : (
        <>
          <ul className="movies__list">
          {shownMoviesArray.slice(0, total).map((movie) => {
              return (
                <MoviesCard key={movie.id} card={movie}/>
              )
          })}
          </ul>
          <button type="button" className={`movies__append-button  ${buttonVisibility ? 'movies__append-button_none' : ''}`} onClick={handleBtnClick}>Ещё</button>
        </>
      )}
    </section>
  )
};

export default MoviesCardList;
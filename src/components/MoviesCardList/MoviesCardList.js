import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

function MoviesCardList({
  isSavedMovies,
  onSaveMovie,
  onDeleteMovie,
  shownMoviesArray,
  savedMoviesArray,
  handleBtnClick,
  total,
}) {
  const [buttonVisibility, setButtonVisibility] = React.useState(false);
  React.useEffect(() => {
    if (total > shownMoviesArray.length) {
      setButtonVisibility(true);
    } else {
      setButtonVisibility(false);
    }
  }, [shownMoviesArray, total]);

  return (
    <section className="section movies">
      {isSavedMovies ? (
        <ul className="movies__list">
          {shownMoviesArray.map((movie) => (
            <MoviesCard
            key={movie._id}
            card={movie}
            isSavedMovies={isSavedMovies}
            />
          ))}
        </ul>
      ) : (
        <>
          <ul className="movies__list">
            {shownMoviesArray.slice(0, total).map((movie) => (
              <MoviesCard
                key={movie.id}
                card={movie}
                isSavedMovies={isSavedMovies}
                onSaveMovie={onSaveMovie}
                onDeleteMovie={onDeleteMovie}
                savedMoviesArray={savedMoviesArray}
              />
            ))}
          </ul>
          <button
            type="button"
            className={`movies__append-button  ${
              buttonVisibility ? "movies__append-button_none" : ""
            }`}
            onClick={handleBtnClick}
          >
            Ещё
          </button>
        </>
      )}
    </section>
  );
}

export default MoviesCardList;

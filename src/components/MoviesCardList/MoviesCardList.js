import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

function MoviesCardList({
  isSavedMovies,
  onSaveMovie,
  onDeleteMovie,
  shownMoviesArray,
  shownSavedMoviesArray,
  handleBtnClick,
  total,
}) {
  const [buttonVisibility, setButtonVisibility] = React.useState(false);

  React.useEffect(() => {
    if (!isSavedMovies && total > shownMoviesArray.length) {
      setButtonVisibility(true);
    } else {
      setButtonVisibility(false);
    }
  }, [shownMoviesArray, total]);

  return (
    <section className="section movies">
      {isSavedMovies ? (
        <ul className="movies__list">
          {shownSavedMoviesArray.map((movie) => (
            <MoviesCard
            key={movie._id}
            card={movie}
            isSavedMovies={isSavedMovies}
            onDeleteMovie={onDeleteMovie}
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

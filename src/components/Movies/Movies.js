import React from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function Movies({
  isLoggedIn,
  isSavedMovies,
  getMovies,
  searchedMovies
}) {

  return (
    <div>
      <Header
        isLoggedIn = {isLoggedIn}
      />
      <SearchForm
        getMovies={getMovies}
      />
      <MoviesCardList
        isSavedMovies = {isSavedMovies}
        searchedMovies={searchedMovies}
      />
      <Footer />
    </div>
  )
}

export default Movies;
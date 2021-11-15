import React from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function Movies({
  isLoggedIn,
  isSavedMovies,
  getAllMovies,
}) {

  return (
    <div>
      <Header
        isLoggedIn = {isLoggedIn}
      />
      <SearchForm
        getAllMovies={getAllMovies}
      />
      <MoviesCardList
        isSavedMovies = {isSavedMovies}
      />
      <Footer />
    </div>
  )
}

export default Movies;
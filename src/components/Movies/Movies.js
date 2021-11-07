import React from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function Movies({
  isLoggedIn,
  isMainPage,
  isSavedMovies
}) {

  return (
    <div>
      <Header
        isLoggedIn = {isLoggedIn}
        isMainPage = {isMainPage}
      />
      <SearchForm />
      <MoviesCardList
        isSavedMovies = {isSavedMovies}
      />
      <Footer />
    </div>
  )
}

export default Movies;
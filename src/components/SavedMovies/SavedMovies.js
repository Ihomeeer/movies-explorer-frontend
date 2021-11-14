import React from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function SavedMovies({
  isLoggedIn,
}) {

  return (
    <div>
      <Header
        isLoggedIn = {isLoggedIn}
      />
      <SearchForm />
      <MoviesCardList />
      <Footer />
    </div>
  )
}

export default SavedMovies;
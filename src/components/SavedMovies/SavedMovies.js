import React from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';
import Footer from '../Footer/Footer';

function SavedMovies({
  isLoggedIn,
  isMainPage
}) {

  return (
    <div>
      <Header
        isLoggedIn = {isLoggedIn}
        isMainPage = {isMainPage}
      />
      <SearchForm />
      <MoviesCardList />
      <Footer />
    </div>
  )
}

export default SavedMovies;
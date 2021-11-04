import React from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function Movies({
  isLoggedIn,
  isMainPage
}) {

  const [isSavedMovies, setIsSavedMovies] = React.useState(false);

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
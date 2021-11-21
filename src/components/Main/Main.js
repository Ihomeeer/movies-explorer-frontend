import React from 'react';
import Header from '../Header/Header';
import About from '../AboutProject/AboutProject';
import Promo from '../Promo/Promo';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Footer from '../Footer/Footer';

function Main({
  isAuth,
  isMainPage,
}) {

  return (
    <div className="main">
      <Header
        isAuth = {isAuth}
        isMainPage = {isMainPage}
      />
      <Promo />
      <About />
      <Techs />
      <AboutMe />
      <Footer />
    </div>
  )
}

export default Main;
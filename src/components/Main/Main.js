import React from 'react';
import Header from '../Header/Header';
import About from '../AboutProject/AboutProject';
import Promo from '../Promo/Promo';
import NavTab from '../NavTab/NavTab';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import Footer from '../Footer/Footer';

function Main(props) {
  
  return (
    <main>
      <Header />
      <Promo />
      <About />
      <NavTab />
      <Techs />
      <AboutMe />
      <Portfolio />
      <Footer />
    </main>
  )
}

export default Main;
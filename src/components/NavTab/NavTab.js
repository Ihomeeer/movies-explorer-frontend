import React from 'react';
import { Route, Link } from 'react-router-dom';
import navTabLogoPath from '../../images/NavTab/logo.svg';
import './NavTab.css';
import Navigation from '../Navigation/Navigation';

function NavTab ({
  isLoggedIn
}) {

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const openMenu = () => {
      setIsMenuOpen(true);
    }

  return (
    <section className="navTab">
        {isLoggedIn ? (
          <>
          <div className="navTab__links">
            <a href="/#aboutProject">
              <img className="logo navTab__logo" src={navTabLogoPath} alt="лого проекта" />
            </a>
            <div className="navTab__films-wrapper">
            <Route exact path="/" >
              <Link className="link navTab__link navTab__link_type_all-films" to="/movies">Фильмы</Link>
              <Link className="link navTab__link navTab__link_type_saved-films" to="/saved-movies">Сохранённые фильмы</Link>
            </Route>
            <Route exact path="/movies" >
              <Link className="link navTab__link navTab__link_type_active navTab__link_type_all-films" to="/movies">Фильмы</Link>
              <Link className="link navTab__link navTab__link_type_saved-films" to="/saved-movies">Сохранённые фильмы</Link>
            </Route>
            <Route exact path="/saved-movies" >
              <Link className="link navTab__link navTab__link_type_all-films" to="/movies">Фильмы</Link>
              <Link className="link navTab__link navTab__link_type_active navTab__link_type_saved-films" to="/saved-movies">Сохранённые фильмы</Link>
            </Route>
            <Route exact path="/profile" >
              <Link className="link navTab__link navTab__link_type_all-films" to="/movies">Фильмы</Link>
              <Link className="link navTab__link navTab__link_type_saved-films" to="/saved-movies">Сохранённые фильмы</Link>
            </Route>
            </div>
            <Link to="/profile" className="navTab__link_type_profile">
              <p className="navTab__profile-text">Аккаунт</p>
              <div className="navTab__profile-icon"></div>
            </Link>
            <button type="button" className="navTab__menu-button" onClick={openMenu}></button>
          </div>
          <Navigation
           setIsMenuOpen = {setIsMenuOpen}
           isMenuOpen = {isMenuOpen}
           />
          </>

        ) : (
          <div className="navTab__links">
            <a href="/#aboutProject">
              <img className="logo navTab__logo" src={navTabLogoPath} alt="лого проекта" />
            </a>
            <div className="navTab__nav-wrapper">
              <Link className="link navTab__link_type_sign-up" to="/signup">Регистрация</Link>
              <Link className="link navTab__link_type_sign-in" to="/signin">Войти</Link>
            </div>
          </div>
        )}


    </section>
  )
};

export default NavTab;
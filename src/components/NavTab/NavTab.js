import React from 'react';
import { Route, Link } from 'react-router-dom';
import navTabLogoPath from '../../images/NavTab/logo.svg';
import './NavTab.css';
import Navigation from '../Navigation/Navigation';

function NavTab ({
  isAuth,
  isMainPage
}) {

  // стейт-переменная для октрытия меню
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const openMenu = () => {
    setIsMenuOpen(true);
  }

  return (
    <section className="nav-tab">
        {isAuth ? (
          <>
          <div className="nav-tab__links">
            <Link to="/#aboutProject">
              <img className="logo nav-tab__logo" src={navTabLogoPath} alt="лого проекта" />
            </Link>
            <div className="nav-tab__films-wrapper">
            <Route exact path="/" >
              <Link className="link nav-tab__link nav-tab__link_white nav-tab__link_type_all-films" to="/movies">Фильмы</Link>
              <Link className="link nav-tab__link nav-tab__link_white nav-tab__link_type_saved-films" to="/saved-movies">Сохранённые фильмы</Link>
            </Route>
            <Route exact path="/movies" >
              <Link className="link nav-tab__link nav-tab__link_type_active nav-tab__link_type_all-films" to="/movies">Фильмы</Link>
              <Link className="link nav-tab__link nav-tab__link_type_saved-films" to="/saved-movies">Сохранённые фильмы</Link>
            </Route>
            <Route exact path="/saved-movies" >
              <Link className="link nav-tab__link nav-tab__link_type_all-films" to="/movies">Фильмы</Link>
              <Link className="link nav-tab__link nav-tab__link_type_active nav-tab__link_type_saved-films" to="/saved-movies">Сохранённые фильмы</Link>
            </Route>
            <Route exact path="/profile" >
              <Link className="link nav-tab__link nav-tab__link_type_all-films" to="/movies">Фильмы</Link>
              <Link className="link nav-tab__link nav-tab__link_type_saved-films" to="/saved-movies">Сохранённые фильмы</Link>
            </Route>
            </div>
            <Link to="/profile" className="nav-tab__link_type_profile">
              <p className="nav-tab__profile-text">Аккаунт</p>
              <div className="nav-tab__profile-icon"></div>
            </Link>
            <button type="button" className={`nav-tab__menu-button ${isMainPage ? "nav-tab__menu-button-white" : "nav-tab__menu-button-black"}`} onClick={openMenu}></button>
          </div>
          <Navigation
           setIsMenuOpen = {setIsMenuOpen}
           isMenuOpen = {isMenuOpen}
           />
          </>

        ) : (
          <div className="nav-tab__links">
            <a href="/#aboutProject">
              <img className="logo nav-tab__logo" src={navTabLogoPath} alt="лого проекта" />
            </a>
            <div className="nav-tab__nav-wrapper">
              <Link className="link nav-tab__link_type_sign-up" to="/signup">Регистрация</Link>
              <Link className="link nav-tab__link_type_sign-in" to="/signin">Войти</Link>
            </div>
          </div>
        )}


    </section>
  )
};

export default NavTab;

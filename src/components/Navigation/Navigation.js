import React from 'react';
import { Route, Link } from 'react-router-dom';
import './Navigation.css';

function Navigation ({
  setIsMenuOpen,
  isMenuOpen
})  {

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <div className={`navigation ${isMenuOpen ? 'navigation_active' : ' '}`}>
      <div className="navigation__cover"></div>
      <div className="navigation__wrapper">
        <button type="button" className="navigation__close-button" onClick={closeMenu}></button>
        <div className="navigation__links-wrapper">
        <Route exact path="/" >
          <Link className="link navigation__link navigation__link_type_active navigation__link_type_main-page" to="/">Главная</Link>
          <Link className="link navigation__link navigation__link_type_all-films" to="/movies">Фильмы</Link>
          <Link className="link navigation__link navigation__link_type_saved-films" to="/saved-movies">Сохранённые фильмы</Link>
        </Route>
        <Route exact path="/movies" >
          <Link className="link navigation__link navigation__link_type_main-page" to="/">Главная</Link>
          <Link className="link navigation__link navigation__link_type_active navigation__link_type_all-films" to="/movies">Фильмы</Link>
          <Link className="link navigation__link navigation__link_type_saved-films" to="/saved-movies">Сохранённые фильмы</Link>
        </Route>
        <Route exact path="/saved-movies" >
          <Link className="link navigation__link navigation__link_type_main-page" to="/">Главная</Link>
          <Link className="link navigation__link navigation__link_type_all-films" to="/movies">Фильмы</Link>
          <Link className="link navigation__link navigation__link_type_active navigation__link_type_saved-films" to="/saved-movies">Сохранённые фильмы</Link>
        </Route>
        <Route exact path="/profile" >
          <Link className="link navigation__link navigation__link_type_main-page" to="/">Главная</Link>
          <Link className="link navigation__link navigation__link_type_all-films" to="/movies">Фильмы</Link>
          <Link className="link navigation__link navigation__link_type_saved-films" to="/saved-movies">Сохранённые фильмы</Link>
        </Route>
        </div>
        <Link to="/profile" className="navigation__link_type_profile">
          <p className="navigation__profile-text">Аккаунт</p>
          <div className="navigation__profile-icon"></div>
        </Link>
      </div>
    </div>
  )
};

export default Navigation;

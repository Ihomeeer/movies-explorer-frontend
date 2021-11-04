import React from 'react';
import { Link } from 'react-router-dom';
import './NavTab.css';

function NavTab ({
  isLoggedIn
}) {

  return (
    <section className="navTab">
        {isLoggedIn ? (
          <div className="navTab__nav-wrapper_type_auth">
            <div className="navTab__films-wrapper">
              <Link className="link navTab__link navTab__link_type_all-films" to="/movies">Фильмы</Link>
              <Link className="link navTab__link navTab__link_type_saved-films" to="/saved-movies">Сохранённые фильмы</Link>
            </div>
            <Link to="/profile" className="navTab__link_type_profile">
              <p className="navTab__profile-text">Аккаунт</p>
              <div className="navTab__profile-icon"></div>
            </Link>
          </div>
        ) : (
          <div className="navTab__nav-wrapper">
            <Link className="link navTab__link_type_sign-up" to="/signup">Регистрация</Link>
            <button className="navTab__sign-in-btn" aria-label="Войти">Войти</button>
          </div>
        )}


    </section>
  )
};

export default NavTab;
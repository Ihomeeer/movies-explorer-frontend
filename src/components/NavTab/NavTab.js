import React from 'react';
import { Link } from 'react-router-dom';
import './NavTab.css';

function NavTab (props) {

  return (
    <section className="navTab">
      <div className="navTab__nav-wrapper">
        <Link className="link navTab__sign-up-link" to="/signup">Регистрация</Link>
        <button className="navTab__sign-in-btn" aria-label="Войти">Войти</button>
      </div>
    </section>
  )
};

export default NavTab;
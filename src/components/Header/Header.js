import React from 'react';
import './Header.css';
import NavTab  from '../NavTab/NavTab';
import headerLogoPath from '../../images/Header/logo.svg';

function Header({
  isLoggedIn,
  isMainPage
}) {

  return (
    <header className={`section ${isMainPage ? 'header header-dark' : 'header header-white'}`}>
      <a href="/#aboutProject">
        <img className="logo header__logo" src={headerLogoPath} alt="лого проекта" />
      </a>
      <NavTab
        isLoggedIn = {isLoggedIn}
      />
    </header>
  )
}

export default Header;






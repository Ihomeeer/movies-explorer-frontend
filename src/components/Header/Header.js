import React from 'react';
import './Header.css';
import NavTab  from '../NavTab/NavTab';

function Header({
  isAuth,
  isMainPage
}) {

  return (
    <header className={`section ${isMainPage === "true" ? 'header header-dark' : 'header header-white'}`}>
      <NavTab
        isAuth = {isAuth}
        isMainPage= {isMainPage}
      />
    </header>
  )
}

export default Header;

import React from 'react';
import './Header.css';
import NavTab  from '../NavTab/NavTab';

function Header({
  isLoggedIn,
  isMainPage
}) {

  return (
    <header className={`section ${isMainPage ? 'header header-dark' : 'header header-white'}`}>
      <NavTab
        isLoggedIn = {isLoggedIn}
      />
    </header>
  )
}

export default Header;






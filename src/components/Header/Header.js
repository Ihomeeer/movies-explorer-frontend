import React from 'react';
import './Header.css';
import NavTab  from '../NavTab/NavTab';
import headerLogoPath from '../../images/Header/logo.svg';

function Header(props) {

  return (
    <header className="section header">
      <img className="header__logo" src={headerLogoPath} alt="лого проекта" />
      <NavTab />
    </header>
  )
}

export default Header;
    
    
    
    
    

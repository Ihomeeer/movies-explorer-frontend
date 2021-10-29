import React from 'react';

function Header(props) {

  return (
    <header className="header">
      <img className="header__logo" src="" alt="лого проекта" />
      <div className="header__buttons-wrapper">
        <button className="header__signUpBtn" aria-label="Регистрация"></button>
        <button className="header__signInBtn" aria-label="Войти"></button>
      </div>
    </header>
  )
}

export default Header;
    
    
    
    
    

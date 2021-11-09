import React from 'react';
import { Link } from 'react-router-dom';
import loginLogoPath from '../../images/NavTab/logo.svg';
import '../Register/Register';

function Register(props) {

  return (
    <section className="register">
      <a className="register__logo-link" href="/#aboutProject">
        <img className="logo register__logo" src={loginLogoPath} alt="лого проекта" />
      </a>
      <h1 className="register__greetings">Рады видеть!</h1>
      <fieldset className="register__inputs-wrapper">

        <div className="register__input_module">
          <label className="register__label register__label_type_email" htmlFor="email">E-mail</label>
          <input
            className="register__input register__input_type_email"
            id="email"
            name="email"
            type="text"
            autoComplete="off"
            required
            minLength="2"
            maxLength="30"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            placeholder="E-mail"
          />
          <span className="register__error register__error_type_email">тест тест тест тест тест тест тест тест тест</span>
        </div>

        <div className="register__input_module">
          <label className="register__label register__label_type_password" htmlFor="password">Пароль</label>
          <input
            className="register__input register__input_type_password"
            id="password"
            name="password"
            type="text"
            autoComplete="off"
            required
            minLength="6"
            maxLength="30"
            placeholder="Пароль"
          />
          <span className="register__error register__error_type_password">тест тест тест тест тест тест тест тест тест</span>
        </div>

      </fieldset>
      <button type="submit" className="register__button">Войти</button>
      <div className="register__signin-wrapper">
        <p className="register__text">Еще не зарегистрированы?</p>
        <Link className="link register__link" to="/signup">Регистрация</Link>
      </div>
    </section>
  );
}

export default Register;
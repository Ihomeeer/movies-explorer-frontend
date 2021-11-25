import React from 'react';
import { Link } from 'react-router-dom';
import { useFormWithValidation } from '../../utils/validation';
import loginLogoPath from '../../images/NavTab/logo.svg';
import '../Register/Register';

function Login({
  handleLogin,
  isLoginError,
  isLoginInputsDisabled
}) {

  const { values, errors, isValid, handleChange } = useFormWithValidation();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleLogin(values.email, values.password);
  }

  return (
    <form className="register" onSubmit={handleFormSubmit} noValidate>
      <a className="register__logo-link" href="/#aboutProject">
        <img className="logo register__logo" src={loginLogoPath} alt="лого проекта" />
      </a>
      <h1 className="register__greetings">Рады видеть!</h1>
      <fieldset className="register__inputs-wrapper">

        <div className="register__input-module">
          <label className="register__label register__label_type_email" htmlFor="email">E-mail</label>
          <input
            className={`register__input register__input_type_email ${errors.email ? 'register__input_error' : ''}`}
            id="email"
            name="email"
            type="email"
            autoComplete="off"
            required
            minLength="2"
            maxLength="30"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            placeholder="E-mail"
            onChange={handleChange}
            value={values.email || ''}
            disabled={isLoginInputsDisabled}
          />
          <span className={`register__error_type_email ${errors.email ? "register__error" : ''}`}>{errors.email}</span>
        </div>

        <div className="register__input-module">
          <label className="register__label register__label_type_password" htmlFor="password">Пароль</label>
          <input
            className={`register__input register__input_type_password ${errors.password ? 'register__input_error' : ''}`}
            id="password"
            name="password"
            type="password"
            autoComplete="off"
            required
            minLength="6"
            maxLength="30"
            placeholder="Пароль"
            onChange={handleChange}
            value={values.password || ''}
            disabled={isLoginInputsDisabled}
          />
          <span className={`register__error_type_password ${errors.password ? "register__error" : ''}`}>{errors.password}</span>
        </div>

      </fieldset>
      <button type="submit" className={`register__button ${isValid ? "register__button_type_active" : "register__button_type_inactive"}`} disabled={!isValid}>Войти</button>
      <span className="register__error register__error_type_general">{isLoginError}</span>
      <div className="register__signin-wrapper">
        <p className="register__text">Еще не зарегистрированы?</p>
        <Link className="link register__link" to="/signup">Регистрация</Link>
      </div>
    </form>
  );
}

export default Login;
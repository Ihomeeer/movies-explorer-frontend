import React from 'react';
import { Link } from 'react-router-dom';
import { useFormWithValidation } from '../../utils/validation';
import registerLogoPath from '../../images/NavTab/logo.svg';
import './Register.css';


function Register({
  handleRegister,
  isRegisterError
}) {

  const { values, errors, isValid, handleChange } = useFormWithValidation();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleRegister( values.name, values.email, values.password);
  }

  return (
    <form className="register" onSubmit={handleFormSubmit} noValidate>
      <a className="register__logo-link" href="/#aboutProject">
        <img className="logo register__logo" src={registerLogoPath} alt="лого проекта" />
      </a>
      <h1 className="register__greetings">Добро пожаловать!</h1>
      <fieldset className="register__inputs-wrapper">

        <div className="register__input-module">
          <label className="register__label register__label_type_name" htmlFor="name">Имя</label>
          <input
            className={`register__input register__input_type_name ${errors.name ? 'register__input_error' : ''}`}
            id="name"
            name="name"
            type="text"
            autoComplete="off"
            required
            minLength="2"
            maxLength="30"
            placeholder="Имя"
            onChange={handleChange}
            value={values.name || ''}
          />
          <span className={`register__error_type_name ${errors.name ? "register__error" : ''}`}>{errors.name}</span>
        </div>

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
          />
          <span className={`register__error_type_password ${errors.password ? "register__error" : ''}`}>{errors.password}</span>
        </div>

      </fieldset>
      <button type="submit" className={`register__button ${isValid ? "register__button_type_active" : "register__button_type_inactive"}`} disabled={!isValid}>Зарегистрироваться</button>
      <span className="register__error register__error_type_general">{isRegisterError}</span>
      <div className="register__signin-wrapper">
        <p className="register__text">Уже зарегистрированы?</p>
        <Link className="link register__link" to="/signin">Войти</Link>
      </div>
    </form>
  );
}

export default Register;
import React from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../../utils/validation';
import Header from '../Header/Header';
import './Profile.css';

function Profile({
  handleLogOut,
  handleChangeProfile,
  isProfileMessage,
  isAuth,
}) {

  const currentUser = React.useContext(CurrentUserContext);

  const { values, setValues, errors, isValid, handleChange } = useFormWithValidation();

  React.useEffect(() => {
    setValues({
      name: currentUser.name,
      email: currentUser.email,
    });
  }, [setValues, currentUser]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleChangeProfile(values);
    console.log('click');
  }

  return (
    <>
      <Header
        isAuth = {isAuth}
      />
      <form className="profile" onSubmit={handleFormSubmit}>
        <h1 className="profile__greetings">Привет, {values.name}</h1>

        <fieldset className="profile__inputs-wrapper">

            <div className="profile__input-wrapper">
              <label className="profile__label profile__label_type_name" htmlFor="name">Имя</label>
              <input
                className={`profile__input profile__input_type_name ${errors.name ? 'profile__input_error' : ''}`}
                id="name"
                name="name"
                type="text"
                autoComplete="off"
                required
                minLength="2"
                maxLength="30"
                onChange={handleChange}
                value={values.name || ''}
                placeholder={currentUser.name}
              />
            </div>

            <div className="profile__input-wrapper">
              <label className="profile__label profile__label_type_email" htmlFor="email">E-mail</label>
                <input
                  className={`profile__input profile__input_type_email ${errors.email ? 'profile__input_error' : ''}`}
                  id="email"
                  name="email"
                  type="text"
                  autoComplete="off"
                  required
                  minLength="2"
                  maxLength="30"
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  onChange={handleChange}
                  value={values.email || ''}
                  placeholder={currentUser.email}
                />
            </div>

            <span className="profile__error">{(isProfileMessage) ? isProfileMessage : errors.name ? `Имя: ${(errors.name)}` : (errors.email) ? `E-mail: ${(errors.email)}` : ''}</span>

        </fieldset>

        <div className="profile__buttons">
          <button type="submit" className={`profile__button profile__button_type_submit ${!isValid ? 'profile__button_disabled' : ''}`} disabled={!isValid}>Редактировать</button>
          <button type="button" className="profile__button profile__button_type_quit" onClick={handleLogOut}>Выйти из аккаунта</button>
        </div>
      </form>
    </>
  );
}

export default Profile;
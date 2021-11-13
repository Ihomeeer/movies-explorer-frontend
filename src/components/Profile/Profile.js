import React from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../../utils/validation';
import Header from '../Header/Header';
import './Profile.css';

function Profile({
  handleLogOut,
  handleChangeProfile,
  isProfileError
}) {

  const currentUser = React.useContext(CurrentUserContext);
  const [isEditActive, setIsEditActive] = React.useState();

  const { values, setValues, errors, isValid, handleChange, } = useFormWithValidation();

  React.useEffect(() => {
    setValues({
      name: currentUser.name,
      email: currentUser.email,
    });
  }, [setValues, currentUser]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleChangeProfile(values);
  }

  return (
    <>
      <Header />
      <form className="profile" onSubmit={handleFormSubmit}>
        <h1 className="profile__greetings">Привет, {values.name}</h1>

        <fieldset className="profile__inputs-wrapper">

            <div className="profile__input-wrapper">
              <label className="profile__label profile__label_type_name" htmlFor="name">Имя</label>
              <input
                className="profile__input profile__input_type_name"
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
                  className="profile__input profile__input_type_email"
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

            <span className="profile__error">{(isProfileError) ? isProfileError : (errors.name) ? errors.name : (errors.email) ? errors.email : ''}</span>

        </fieldset>

        <div className="profile__buttons">
          <button type="submit" className="profile__button profile__button_type_submit" disabled={!isValid}>Редактировать</button>
          <button type="button" className="profile__button profile__button_type_quit" onClick={handleLogOut}>Выйти из аккаунта</button>
        </div>
      </form>
    </>
  );
}

export default Profile;
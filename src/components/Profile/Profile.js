import React from 'react';
import Header from '../Header/Header';
import './Profile.css';


function Profile(props) {

  return (
    <>
      <Header />
      <section className="profile">
        <h1 className="profile__greetings">Привет, Юзернейм!</h1>

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
                placeholder="Имя"
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
                  placeholder="E-mail"
                />
            </div>

            <span className="profile__error">А вот тут ошибки будут всякие со всех инпутов</span>

        </fieldset>

        <div className="profile__buttons">
          <button type="submit" className="profile__button profile__button_type_submit">Редактировать</button>
          <button type="button" className="profile__button profile__button_type_quit">Выйти из аккаунта</button>
        </div>
      </section>
    </>
  );
}

export default Profile;
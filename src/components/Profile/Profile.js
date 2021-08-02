import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './Profile.css';

function Profile() {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <section className="profile">
      <form className="profile-form" name="login" action="#" >
        <h1 className="profile-form__title">Привет, Виталий!</h1>

        <label className="profile-form__label">
          <span className="profile-form__label-text">Имя</span>
          <input id="name-input" type="text" name="name" placeholder="Имя" className="profile-form__input profile-form__input_type_name" minLength="2" maxLength="30" required />
        </label>

        <label className="profile-form__label">
          <span className="profile-form__label-text">E-mail</span>
          <input id="email-input" type="text" name="email" placeholder="E-mail" className="profile-form__input profile-form__input_type_email" required />
        </label>

        <button type="submit" className="profile-form__submit">Редактировать</button>
        <button className="profile__logout">Выйти из аккаунта</button>
      </form>
    </section>
  );
}

export default Profile;

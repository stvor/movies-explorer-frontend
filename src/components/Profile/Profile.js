import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './Profile.css';

function Profile({ onProfileEdit, onSignOut }) {
  const [name, setName] = React.useState('name');
  const [email, setEmail] = React.useState('email');
  const currentUser = React.useContext(CurrentUserContext);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onProfileEdit({ name, email });
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);


  return (
    <section className="profile">
      <form
        onSubmit={handleSubmit}
        className="profile-form"
        name="login"
        action="#"
      >
        <h1 className="profile-form__title">Привет, {currentUser.name}!</h1>

        <label className="profile-form__label">
          <span className="profile-form__label-text">Имя</span>
          <input
            value={name || ''}
            onChange={handleNameChange}
            id="name-input"
            type="text"
            name="name"
            placeholder="Имя"
            className="profile-form__input profile-form__input_type_name"
            minLength="2"
            maxLength="30"
            required
          />
        </label>

        <label className="profile-form__label">
          <span className="profile-form__label-text">E-mail</span>
          <input
            value={email || ''}
            onChange={handleEmailChange}
            id="email-input"
            type="text"
            name="email"
            placeholder="E-mail"
            className="profile-form__input profile-form__input_type_email"
            required
          />
        </label>

        <button
          type="submit"
          className="profile-form__submit"
        >Редактировать</button>
        <button
          onClick={onSignOut}
          className="profile__logout"
        >Выйти из аккаунта</button>
      </form>
    </section>
  );
}

export default Profile;

import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './Profile.css';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';

function Profile({ onProfileEdit, onSignOut, isSending }) {
  const currentUser = React.useContext(CurrentUserContext);
  const { values, handleChange, resetFrom, errors, isValid } = useFormWithValidation();

  const isDisabled = !isValid || isSending;
  const submitButtonClassName = `profile-form__submit ${
    isDisabled && "profile-form__submit_inactive"
  }`;

  function handleSubmit(evt) {
    evt.preventDefault();
    onProfileEdit(values);
  }

  React.useEffect(() => {
    if (currentUser) {
      resetFrom(currentUser, {}, false);
    }
  }, [currentUser, resetFrom]);


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
            value={values.name || ''}
            onChange={handleChange}
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
            value={values.email || ''}
            onChange={handleChange}
            id="email-input"
            type="text"
            name="email"
            placeholder="E-mail"
            className="profile-form__input profile-form__input_type_email"
            required
          />
        </label>
        {isEditing ? (
          <button
            type="submit"
            className={submitButtonClassName}
          >Сохранить</button>
        ) : (
          <>
            <button
              onClick={handleEditClick}
              className="profile-form__edit"
            >Редактировать</button>
            <button
              onClick={onSignOut}
              className="profile__logout"
            >Выйти из аккаунта</button>
          </>
        )}
      </form>
    </section>
  );
}

export default Profile;

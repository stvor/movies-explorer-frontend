import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './Profile.css';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';

function Profile({ onProfileEdit, onSignOut, isSending }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [isEditing, setIsEditing] = React.useState(false);
  const { values, handleChange, resetFrom, errors, isValid } = useFormWithValidation();

  const isDisabled = !isValid || isSending;
  const submitButtonClassName = `profile-form__submit ${
    isDisabled && "profile-form__submit_inactive"
  }`;
  const inputClassName = `profile-form__input ${
    !isEditing && "profile-form__input_disabled"
  }`;

  function handleEditClick() {
    resetFrom(currentUser, {}, false);
    setIsEditing(true);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    setIsEditing(false);
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
            className={inputClassName}
            minLength="2"
            maxLength="30"
            required
            disabled={!isEditing}
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
            className={inputClassName}
            required
            disabled={!isEditing}
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
              type="button"
            >Редактировать</button>
            <button
              onClick={onSignOut}
              className="profile__logout"
              type="button"
            >Выйти из аккаунта</button>
          </>
        )}
      </form>
    </section>
  );
}

export default Profile;

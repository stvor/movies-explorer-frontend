import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './Profile.css';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';

function Profile({ onProfileEdit, onSignOut, isSending, requestStatus: { type, text } }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [isEditing, setIsEditing] = React.useState(false);
  const [requestStatusText, setRequestStatusText] = React.useState('');
  const { values, handleChange, resetFrom, isValid } = useFormWithValidation();

  const isDisabled = !isValid || isSending;
  const submitButtonClassName = `profile-form__submit ${
    isDisabled && "profile-form__submit_inactive"
  }`;
  const inputClassName = `profile-form__input ${
    !isEditing && "profile-form__input_disabled"
  }`;
  const apiFeedbackClassName = `profile-form__api-feedback profile-form__api-feedback_type_${type}`;

  function handleEditClick() {
    resetFrom(currentUser, {}, false);
    setIsEditing(true);
    setRequestStatusText('');
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    setIsEditing(false);
    onProfileEdit(values);
  }

  React.useEffect(() => {
    if (text) {
      setRequestStatusText(text);
    }
  }, [text]);

  React.useEffect(() => {
    if (currentUser) {
      resetFrom(currentUser, {}, false);
      setRequestStatusText('');
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
            type="email"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            name="email"
            placeholder="E-mail"
            className={inputClassName}
            required
            disabled={!isEditing}
          />
        </label>

        {!isEditing && (
          <span
            className={apiFeedbackClassName}
          >{requestStatusText}</span>
        )}

        {isEditing ? (
          <button
            type="submit"
            className={submitButtonClassName}
            disabled={isDisabled}
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

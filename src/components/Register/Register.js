import React from 'react';
import { Link } from 'react-router-dom';
import './Register.css';
import Logo from '../../images/logo.svg';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';

function Register({ onRegister, isSending }) {
  const { values, handleChange, resetFrom, errors, isValid } = useFormWithValidation();
  const isDisabled = !isValid || isSending;
  const submitButtonClassName = `form__submit ${
    isDisabled && "form__submit_inactive"
  }`;

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister(values);
  }

  React.useEffect(() => {
    resetFrom({}, {}, false);
  }, [resetFrom]);

  return (
    <section className="register">
      <form
        onSubmit={handleSubmit}
        className="form"
        name="register"
        action="#"
      >
        <Link to="/">
          <img
            className="form__logo"
            src={Logo}
            alt="Логотип сайта"
          />
        </Link>
        <h1 className="form__title">Добро пожаловать!</h1>

        <label className="form__label">
          <span className="form__label-text">Имя</span>
          <input
            value={values.name || ''}
            onChange={handleChange}
            id="name-input"
            type="text"
            name="name"
            placeholder="Имя"
            className="form__input form__input_type_name"
            minLength="2"
            maxLength="30"
            required
          />
          <span className="name-input-error form__input-error">
            {errors.name || ''}
          </span>
        </label>

        <label className="form__label">
          <span className="form__label-text">E-mail</span>
          <input
            value={values.email || ''}
            onChange={handleChange}
            id="email-input"
            type="email"
            name="email"
            placeholder="E-mail"
            className="form__input form__input_type_email"
            required
          />
          <span className="email-input-error form__input-error">
            {errors.email || ''}
          </span>
        </label>

        <label className="form__label" >
          <span className="form__label-text">Пароль</span>
          <input
            value={values.password || ''}
            onChange={handleChange}
            id="password-input"
            type="password"
            name="password"
            placeholder="Пароль"
            className="form__input form__input_type_password"
            required
          />
          <span className="password-input-error form__input-error">
            {errors.password || ''}
          </span>
        </label>

        <button
          type="submit"
          className={submitButtonClassName}
          disabled={isDisabled}
        >Зарегистрироваться</button>

        <div className="form__sign-in-wrap">
          <p className="form__sign-in-question">Уже зарегистрированы? <Link className="form__sign-in-link" to="/signin">Войти</Link></p>
        </div>
      </form>
    </section>
  );
}

export default Register;

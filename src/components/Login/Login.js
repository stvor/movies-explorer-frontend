import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import Logo from '../../images/logo.svg';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';

function Login({ onLogin }) {
  const { values, handleChange, resetFrom, errors, isValid } = useFormWithValidation();
  const submitButtonClassName = `form__submit ${
    !isValid && "form__submit_inactive"
  }`;

  function handleSubmit(evt) {
    evt.preventDefault();
    onLogin(values);
  }

  React.useEffect(() => {
    resetFrom({}, {}, false);
  }, [resetFrom]);

  return (
    <section className="login">
      <form
        className="form"
        onSubmit={handleSubmit}
        name="login"
        action="#"
        noValidate
      >
        <Link to="/">
          <img
            className="form__logo"
            src={Logo}
            alt="Логотип сайта"
          />
        </Link>
        <h1 className="form__title">Рады видеть!</h1>

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

        <label className="form__label">
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
          disabled={!isValid}
        >Войти</button>

        <div className="form__sign-in-wrap">
          <p className="form__sign-in-question">Ещё не зарегистрированы? <Link className="form__sign-in-link" to="/signup">Регистрация</Link></p>
        </div>
      </form>
    </section>
  );
}

export default Login;

import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import Logo from '../../images/logo.svg';

function Login({ onLogin }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onLogin({ email, password });
  }

  return (
    <section className="login">
      <form
        className="form"
        onSubmit={handleSubmit}
        name="login"
        action="#"
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
            value={email || ''}
            onChange={handleEmailChange}
            id="email-input"
            type="text"
            name="email"
            placeholder="E-mail"
            className="form__input form__input_type_email"
            required
          />
          <span className="email-input-error form__input-error"></span>
        </label>

        <label className="form__label">
          <span className="form__label-text">Пароль</span>
          <input
            value={password || ''}
            onChange={handlePasswordChange}
            id="password-input"
            type="password"
            name="password"
            placeholder="Пароль"
            className="form__input form__input_type_password"
            required
          />
          <span className="password-input-error form__input-error"></span>
        </label>

        <button
          type="submit"
          className="form__submit"
        >Войти</button>

        <div className="form__sign-in-wrap">
          <p className="form__sign-in-question">Ещё не зарегистрированы? <Link className="form__sign-in-link" to="/signup">Регистрация</Link></p>
        </div>
      </form>
    </section>
  );
}

export default Login;

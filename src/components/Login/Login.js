import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import Logo from '../../images/logo.svg';

function Login() {
  return (
    <section className="login">
      <form className="form" name="login" action="#" noValidate>
        <Link exact to="/">
          <img className="form__logo" src={Logo} alt="Логотип сайта" />
        </Link>
        <h1 className="form__title">Рады видеть!</h1>

        <label className="form__label" for="email-input">E-mail</label>
        <input id="email-input" type="text" name="email" placeholder="E-mail" className="form__input form__input_type_email" />
        <span className="email-input-error form__input-error">Что-то пошло не так...</span>

        <label className="form__label" for="password-input">Пароль</label>
        <input id="password-input" type="password" name="password" placeholder="Пароль" className="form__input form__input_type_password" />
        <span className="password-input-error form__input-error">Что-то пошло не так...</span>

        <button type="submit" className="form__submit">Войти</button>

        <div className="form__sign-in-wrap">
          <p className="form__sign-in-question">Ещё не зарегистрированы? <Link className="form__sign-in-link" to="/signup">Регистрация</Link></p>
        </div>
      </form>
    </section>
  );
}

export default Login;

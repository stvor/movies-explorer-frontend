import React from 'react';
import { Link } from 'react-router-dom';
import './Register.css';
import Logo from '../../images/logo.svg';

function Register() {
  return (
    <section className="register">
      <form className="form" name="register" action="#" >
        <Link to="/">
          <img className="form__logo" src={Logo} alt="Логотип сайта" />
        </Link>
        <h1 className="form__title">Добро пожаловать!</h1>

        <label className="form__label">
          <span className="form__label-text">Имя</span>
          <input id="name-input" type="text" name="name" placeholder="Имя" className="form__input form__input_type_name" minLength="2" maxLength="30" required />
          <span className="name-input-error form__input-error">Что-то пошло не так...</span>
        </label>

        <label className="form__label">
          <span className="form__label-text">E-mail</span>
          <input id="email-input" type="text" name="email" placeholder="E-mail" className="form__input form__input_type_email" required />
          <span className="email-input-error form__input-error">Что-то пошло не так...</span>
        </label>

        <label className="form__label" >
          <span className="form__label-text">Пароль</span>
          <input id="password-input" type="password" name="password" placeholder="Пароль" className="form__input form__input_type_password" required />
          <span className="password-input-error form__input-error">Что-то пошло не так...</span>
        </label>

        <button type="submit" className="form__submit">Зарегистрироваться</button>

        <div className="form__sign-in-wrap">
          <p className="form__sign-in-question">Уже зарегистрированы? <Link className="form__sign-in-link" to="/signin">Войти</Link></p>
        </div>
      </form>
    </section>
  );
}

export default Register;

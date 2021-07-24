import React from 'react';
import { Link } from 'react-router-dom';
import './Register.css';
import Logo from '../../images/logo.svg';

function Register() {
  return (
    <section className="register">
      <form className="form" name="register" action="#" noValidate>
        <img className="form__logo" src={Logo} alt="Логотип сайта" />
        <h1 className="form__title">Добро пожаловать!</h1>

        <label className="form__label" for="name-input">Имя</label>
        <input id="name-input" type="text" name="name" placeholder="Имя" className="form__input form__input_type_name" />
        <span className="name-input-error form__input-error">Что-то пошло не так...</span>

        <label className="form__label" for="email-input">E-mail</label>
        <input id="email-input" type="text" name="email" placeholder="E-mail" className="form__input form__input_type_email" />
        <span className="email-input-error form__input-error">Что-то пошло не так...</span>

        <label className="form__label" for="password-input">Пароль</label>
        <input id="password-input" type="password" name="password" placeholder="Пароль" className="form__input form__input_type_password" />
        <span className="password-input-error form__input-error">Что-то пошло не так...</span>

        <button type="submit" className="form__submit">Зарегистрироваться</button>

        <div className="form__sign-in-wrap">
          <p className="form__sign-in-question">Уже зарегистрированы? <Link className="form__sign-in-link" to="/signin">Войти</Link></p>
        </div>
      </form>
    </section>
  );
}

export default Register;

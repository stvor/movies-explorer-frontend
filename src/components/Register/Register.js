import React from 'react';
import { Link } from 'react-router-dom';
import './Register.css';
import Logo from '../../images/logo.svg';

function Register({ onRegister }) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister({ name, email, password });
  }

  return (
    <section className="register">
      <form onSubmit={handleSubmit} className="form" name="register" action="#" >
        <Link to="/">
          <img className="form__logo" src={Logo} alt="Логотип сайта" />
        </Link>
        <h1 className="form__title">Добро пожаловать!</h1>

        <label className="form__label">
          <span className="form__label-text">Имя</span>
          <input value={name || ''} onChange={handleNameChange} id="name-input" type="text" name="name" placeholder="Имя" className="form__input form__input_type_name" minLength="2" maxLength="30" required />
          <span className="name-input-error form__input-error">Что-то пошло не так...</span>
        </label>

        <label className="form__label">
          <span className="form__label-text">E-mail</span>
          <input value={email || ''} onChange={handleEmailChange} id="email-input" type="text" name="email" placeholder="E-mail" className="form__input form__input_type_email" required />
          <span className="email-input-error form__input-error">Что-то пошло не так...</span>
        </label>

        <label className="form__label" >
          <span className="form__label-text">Пароль</span>
          <input value={password || ''} onChange={handlePasswordChange} id="password-input" type="password" name="password" placeholder="Пароль" className="form__input form__input_type_password" required />
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

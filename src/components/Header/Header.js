import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <h2>Header</h2>
      <Link to="/"> О проекте </Link>
      <Link to="/movies"> Фильмы </Link>
      <Link to="/saved-movies"> Сохранённые фильмы </Link>
      <Link to="/signup"> Регистрация </Link>
      <Link to="/signin"> Авторизация </Link>
      <Link to="/profile"> Аккаунт </Link>
    </header>
  );
}

export default Header;

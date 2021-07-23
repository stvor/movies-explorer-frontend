import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

function Navigation({ isLoggedIn, isHeaderColored }) {
  return (
    <nav className="navigation">
        {isLoggedIn ? (
          <div className="navigation__site">
            <NavLink className={`navigation__site-link ${isHeaderColored ? "navigation__site-link_white" : ""}`} activeClassName="navigation__site-link_active" to="/movies">Фильмы</NavLink>
            <NavLink className={`navigation__site-link ${isHeaderColored ? "navigation__site-link_white" : ""}`} activeClassName="navigation__site-link_active" to="/saved-movies">Сохранённые фильмы</NavLink>
          </div>
        ) : ''}
      <div className="navigation__user">
        {isLoggedIn ? (
          <NavLink className="navigation__user-profile" to="/profile">Аккаунт</NavLink>
        ) : (
          <>
            <NavLink className="navigation__user-register" to="/signup">Регистрация</NavLink>
            <NavLink className="navigation__user-login" to="/signin">Войти</NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navigation;

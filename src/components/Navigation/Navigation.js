import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navigation.css';

function Navigation({ isLoggedIn, isHeaderColored }) {

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  function handleMenuOpen() {
    setIsMenuOpen(true);
  }

  function handleMenuClose() {
    setIsMenuOpen(false);
  }

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
          <>
            <Link className="navigation__user-profile navigation__user-profile_place_header" to="/profile">Аккаунт</Link>
            <button className="navigation__menu-open" onClick={handleMenuOpen}>Menu</button>
          </>
        ) : (
          <>
            <Link className="navigation__user-register" to="/signup">Регистрация</Link>
            <Link className="navigation__user-login" to="/signin">Войти</Link>
          </>
        )}
      </div>
      <div className={`navigation__mobile-menu ${isMenuOpen ? "navigation__mobile-menu_is-open" : ""}`}>
        <button className="navigation__menu-close" onClick={handleMenuClose}>Close</button>
        <NavLink className={`navigation__site-link ${isHeaderColored ? "navigation__site-link_white" : ""}`} activeClassName="navigation__site-link_active" to="/" onClick={handleMenuClose}>Главная</NavLink>
        <NavLink className={`navigation__site-link ${isHeaderColored ? "navigation__site-link_white" : ""}`} activeClassName="navigation__site-link_active" to="/movies" onClick={handleMenuClose}>Фильмы</NavLink>
        <NavLink className={`navigation__site-link ${isHeaderColored ? "navigation__site-link_white" : ""}`} activeClassName="navigation__site-link_active" to="/saved-movies" onClick={handleMenuClose}>Сохранённые фильмы</NavLink>
        <Link className="navigation__user-profile_place_menu" to="/profile" onClick={handleMenuClose}>Аккаунт</Link>
      </div>
    </nav>
  );
}

export default Navigation;

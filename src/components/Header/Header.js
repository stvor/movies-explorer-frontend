import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import Logo from '../../images/logo.svg';

function Header({ isLoggedIn, isHeaderColored }) {
  return (
    <header className={`header ${isHeaderColored ? "header_colored" : ""}`}>
      <div className="header__wrap">
        <Link to="/">
          <img src={Logo} alt="Логотип сайта" />
        </Link>
        <Navigation isLoggedIn={isLoggedIn} isHeaderColored={isHeaderColored} />
      </div>
    </header>
  );
}

export default Header;

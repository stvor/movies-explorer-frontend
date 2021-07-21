import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavTab.css';

function NavTab() {
  return (
    <nav className="nav-tab">
      <a href="#about-project" className="nav-tab__link">О проекте</a>
      <a href="#tech" className="nav-tab__link">Технологии</a>
      <a href="#student" className="nav-tab__link">Студент</a>
    </nav>
  );
}

export default NavTab;

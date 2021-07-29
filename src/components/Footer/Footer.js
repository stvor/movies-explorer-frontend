import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <section className="footer">
      <p className="footer__caption">Учебный проект Яндекс.Практикум × BeatFilm.</p>
      <div className="footer__wrap">
        <p className="footer__copyright">&copy; {new Date().getFullYear()}</p>
        <ul className="footer__links-list">
          <li>
            <a className="footer__links-item" href="https://praktikum.yandex.ru" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
          </li>
          <li>
            <a className="footer__links-item" href="https://github.com/stvor" target="_blank" rel="noreferrer">Github</a>
          </li>
          <li>
            <a className="footer__links-item" href="https://www.facebook.com/manhat10/" target="_blank" rel="noreferrer">Facebook</a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Footer;

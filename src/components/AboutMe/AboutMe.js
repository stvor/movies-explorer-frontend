import React from 'react';
import './AboutMe.css';
import Photo from '../../images/photo.jpg';

function AboutMe() {
  return (
    <section className="about-me">
      <h2 className="about-me__title" id="student">Студент</h2>
      <div className="about-me__wrap">
        <div className="about-me__info">
          <h3 className="about-me__name">Станислав</h3>
          <p className="about-me__profile">Фронтенд-разработчик, 32 года</p>
          <p className="about-me__description">Я&nbsp;родился и&nbsp;живу в&nbsp;Москве, с&nbsp;отличием закончил факультет налогов и&nbsp;налогового менеджмента в&nbsp;ГУУ. В&nbsp;прошлом я&nbsp;менеджер&nbsp;IT проектов (5&nbsp;лет опыта, из&nbsp;них 3&nbsp;года в&nbsp;Яндексе). Сейчас я&nbsp;работаю тестировщиком на&nbsp;проекте МТС Библиотека и&nbsp;заканчиваю обучение в&nbsp;Яндекс.Практикуме по&nbsp;специальности &laquo;Веб-разработчик&raquo;.</p>
          <ul className="about-me__links-list">
            <li>
              <a className="about-me__links-item" href="https://www.facebook.com/manhat10/" target="_blank" rel="noreferrer">Facebook</a>
            </li>
            <li>
            <a className="about-me__links-item" href="https://github.com/stvor" target="_blank" rel="noreferrer">Github</a>
            </li>
          </ul>
        </div>
        <img className="about-me__photo" src={Photo} alt="Фотография студента" />
      </div>
    </section>
  );
}

export default AboutMe;

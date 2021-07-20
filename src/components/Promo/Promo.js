import React from 'react';
import './Promo.css';
import Image from '../../images/cover.svg';

function Promo() {
  return (
    <section className="promo">
      <h1 className="promo__title">Учебный проект студента факультета Веб&#8209;разработки.</h1>
      <img className="promo__image" src={Image} alt="Буква П в геометрической сетке" />
    </section>
  );
}

export default Promo;

import React from 'react';
import './Promo.css';
import promoIllustrationRoute from '../../images/Promo/illustration.png';
import { Link } from 'react-router-dom';

function Promo() {

  return (
    <section className="section promo">
      <div className="promo__main-section">
        <div className="promo__text-wrapper">
          <h1 className="promo__title">Учебный проект студента факультета Веб-разработки</h1>
          <p className="promo__text">Листайте ниже, чтобы узнать больше про этот проект и его создателя</p>
        </div>
        <img className="promo__illustration" src={promoIllustrationRoute} alt="главная иллюстрация проекта"/>
      </div>
      <Link to="/#aboutProject">
        <button className="promo__learn-more-button" aria-label="Узнать больше">Узнать больше</button>
      </Link>
    </section>
  );
}

export default Promo;
import React from 'react';
import './Promo.css';
import promoIllustrationRoute from '../../images/Promo/illustration.png'

function Promo(props) {

  return (
    <section className="section section_type_m promo">
      <div className="promo__main-section">
        <div className="promo__text-wrapper">
          <h1 className="promo__title">Учебный проект студента факультета Веб-разработки</h1>
          <p className="promo__text">Листайте ниже, чтобы узнать больше про этот проект и его создателя</p>
        </div>
        <img className="promo__illustration" src={promoIllustrationRoute} alt="главная иллюстрация проекта"/>
      </div>
      <button className="promo__learn-more-button" aria-label="Узнать больше">Узнать больше</button>
    </section>
  );
}

export default Promo;
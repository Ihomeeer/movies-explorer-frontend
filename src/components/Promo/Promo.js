import React from 'react';

function Promo(props) {

  return (
    <section className="promo">
      <div className="promo__main-section">
        <div className="promo__text-wrapper">
          <h1 className="promo__title">Учебный проект студента факультета Веб-разработки</h1>
          <p className="promo">Листайте ниже, чтобы узнать больше про этот проект и его создателя</p>
        </div>
        <img className="promo__illustration" src="" alt="главная иллюстрация проекта"/>
      </div>
      <button className="promo__learnMore" aria-label="Узнать больше"></button>
    </section>
  );
}

export default Promo;
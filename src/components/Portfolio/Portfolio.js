import React from 'react';

function Portfolio(props) {

  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__element">
          <p className="portfolio__element-name">Статичный сайт</p>
          <a className="portfolio__element-link" href="#"></a>
        </li>
        <li className="portfolio__element">
          <p className="portfolio__element-name">Адаптивный сайт</p>
          <a className="portfolio__element-link" href="#"></a>
        </li>
        <li className="portfolio__element">
          <p className="portfolio__element-name">Одностраничное приложение</p>
          <a className="portfolio__element-link" href="#"></a>
        </li>
      </ul>
      <p className="portfolio__text">Учебный проект Яндекс.Практикум х BeatFilm</p>
    </section>
  );
}

export default Portfolio;
import React from 'react';
import './Portfolio.css';
import listIconPath from '../../images/Portfolio/list-icon.svg';
function Portfolio(props) {

  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__element">
          <p className="portfolio__element-name">Статичный сайт</p>
          <a className="portfolio__element-link" href="https://github.com/Ihomeeer/how-to-learn"><img className="portfolio__icon" src={listIconPath} alt="иконка для перехода"></img></a>
        </li>
        <li className="portfolio__element">
          <p className="portfolio__element-name">Адаптивный сайт</p>
          <a className="portfolio__element-link" href="https://github.com/Ihomeeer/russian-travel"><img className="portfolio__icon" src={listIconPath} alt="иконка для перехода"></img></a>
        </li>
        <li className="portfolio__element">
          <p className="portfolio__element-name">Одностраничное приложение</p>
          <a className="portfolio__element-link" href="https://github.com/Ihomeeer/react-mesto-api-full"><img className="portfolio__icon" src={listIconPath} alt="иконка для перехода"></img></a>
        </li>
      </ul>
      <p className="portfolio__text">Учебный проект Яндекс.Практикум х BeatFilm</p>
    </section>
  );
}

export default Portfolio;
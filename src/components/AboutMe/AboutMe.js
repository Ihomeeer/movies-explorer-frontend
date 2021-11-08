import React from 'react';
import './AboutMe.css';
import Portfolio from '../Portfolio/Portfolio';
import photoPath from '../../images/AboutMe/photo.jpg';

function AboutMe(props) {

  return (
    <section className="section about-me">
      <h2 className="section-title about-me__title">Студент</h2>
      <div className="about-me__info-wrapper">
        <div className="about-me__text-wrapper">
          <p className="about-me__name">Михаил</p>
          <p className="about-me__vocation">Фронтенд-разработчик, 27 лет</p>
          <p className="about-me__text">
            Я родился и живу в Ростове-на-Дону, закончил физический факультет Южного федерального университета.
            В данный момент защищаю кандидатскую диссертацию по специальности «Физика и технология наноструктур,
            атомная и молекулярная физика».
            Я люблю пешие прогулки, а ещё увлекаюсь моделизмом.
            В начале 2021 года начал кодить.
            После того, как прошёл курс по веб-разработке,
            начал заниматься поиском работы в сфере IT.
          </p>
          <div className="about-me__links">
            <a className="link about-me__link" href="https://www.facebook.com/mikhail.kirichkov.5">Facebook</a>
            <a className="link about-me__link" href="https://github.com/Ihomeeer?tab=repositories">GitHub</a>
          </div>
        </div>
        <img className="about-me__photo" src={photoPath} alt="фото автора проекта" />
      </div>
    <Portfolio />
    </section>
  );
}

export default AboutMe;
import React from 'react';
import './AboutMe.css';
import Portfolio from '../Portfolio/Portfolio';
import photoPath from '../../images/AboutMe/photo.jpg';

function AboutMe(props) {

  return (
    <section className="section section_type_m aboutMe">
      <h2 className="section-title aboutMe__title">Студент</h2>
      <div className="aboutMe__info-wrapper">
        <div className="aboutMe__text-wrapper">
          <p className="aboutMe__name">Михаил</p>
          <p className="aboutMe__vocation">Фронтенд-разработчик, 27 лет</p>
          <p className="aboutMe__text">
            Я родился и живу в Ростове-на-Дону, закончил физический факультет Южного федерального университета.
            В данный момент защищаю кандидатскую диссертацию по специальности «Физика и технология наноструктур,
            атомная и молекулярная физика».
            Я люблю пешие прогулки, а ещё увлекаюсь моделизмом.
            В начале 2021 года начал кодить.
            После того, как прошёл курс по веб-разработке,
            начал заниматься поиском работы в сфере IT.
          </p>
          <div className="aboutMe__links">
            <a className="link aboutMe__link" href="https://www.facebook.com/mikhail.kirichkov.5">Facebook</a>
            <a className="link aboutMe__link" href="https://github.com/Ihomeeer?tab=repositories">GitHub</a>
          </div>
        </div>
        <img className="aboutMe__photo" src={photoPath} alt="фото автора проекта" />
      </div>
    <Portfolio />
    </section>
  );
}

export default AboutMe;
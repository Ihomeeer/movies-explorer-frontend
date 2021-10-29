import React from 'react';

function AboutMe(props) {

  return (
    <section className="aboutMe">
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
            В начале 2020 года начал кодить. 
            После того, как прошёл курс по веб-разработке, 
            начал заниматься поиском работы в сфере IT.
          </p>
          <div className="aboutMe__links">
            <a href="#">Facebook</a>
            <a href="#">GitHub</a>
          </div>
        </div>
      </div>
      <img className="aboutMe__photo" src="" alt="фото автора проекта" />
    </section>
  );
}

export default AboutMe;
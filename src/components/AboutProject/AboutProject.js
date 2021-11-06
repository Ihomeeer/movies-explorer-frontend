import React from 'react';
import NavTab from '../NavTab/NavTab';
import './AboutProject.css';


function About (props) {

  return (
    <section className="section section_type_m about">
      <a name="aboutProject"></a>
      <h2 className="section-title about__title">О проекте</h2>
      <div className="about__text-section">
        <article className="about__fact">
          <h2 className="about__fact-title">Дипломный проект включал 5 этапов</h2>
          <p className="about__fact-text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки</p>
        </article>
        <article className="about__fact">
          <h2 className="about__fact-title">На выполнение диплома ушло 5 недель</h2>
          <p className="about__fact-text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься</p>
        </article>
      </div>
      <div className="about__roadmap">
        <div className="about__scale about__scale_type_backend">1 неделя</div>
        <div className="about__scale about__scale_type_frontend">4 недели</div>
      </div>
      <div className="about__captions">
        <div className="about__caption about__caption_type_backend">Back-end</div>
        <div className="about__caption about__caption_type_frontend">Front-end</div>
      </div>
    </section>
  )
};

export default About;
import React from 'react';

function About (props) {

  return (
    <section className="about">
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
    </section>
  )
};

export default About;
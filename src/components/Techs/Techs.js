import React from 'react';
import './Techs.css';

function Techs(props) {

  return (
    <section className="section section_type_m techs">
      <h2 className="section-title techs__title">Технологии</h2>
      <div className="techs__text-wrapper">
        <p className="techs__subtitle">7 технологий</p>
        <p className="techs__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте</p>
      </div>
      <ul className="techs__list">
        <li className="techs__list-element">HTML</li>
        <li className="techs__list-element">CSS</li>
        <li className="techs__list-element">JS</li>
        <li className="techs__list-element">React</li>
        <li className="techs__list-element">Git</li>
        <li className="techs__list-element">Express.js</li>
        <li className="techs__list-element">mongoDB</li>
      </ul>
    </section>
  )
}

export default Techs;
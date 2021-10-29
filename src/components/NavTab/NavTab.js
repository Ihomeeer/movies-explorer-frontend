import React from 'react';

function NavTab (props) {

  return (
    <section className="navTab">
      <div className="navTab__roadmap">
        <div className="navTab__backend-scale"></div>
        <div className="navTab__frontend-scale"></div>
      </div>
      <div className="navTab__captions">
        <div className="navTab__backend-caption">Back-end</div>
        <div className="navTab__frontend-caption">Front-end</div>
      </div>
    </section>
  )
};

export default NavTab;
import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.css';

function NotFoundPage(props) {

  return (
    <section className="notfound">
      <h1 className="notfound__title">404</h1>
      <p className="notfound__text">Страница не найдена</p>
      <Link to="/" className="link notfound__back-link">Назад</Link>
    </section>
  )
}

export default NotFoundPage;






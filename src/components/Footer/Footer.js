import React from 'react';
import './Footer.css';

function Footer(props) {

  return (
    <>
      <footer className="section footer">
        <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm</p>
        <div className="footer__wrapper">
          <p className="footer__copyright">© 2020</p>
          <ul className="footer__nav-section">
            <li className="footer__nav-element">
              <a className="link footer__nav-link" href="https://practicum.yandex.ru/profile/web">
              Яндекс.Практикум
              </a>
              </li>
            <li className="footer__nav-element">
            <a className="link footer__nav-link" href="https://github.com/">
              GitHub
              </a>
              </li>
            <li className="footer__nav-element">
            <a className="link footer__nav-link" href="https://www.facebook.com/">
              Facebook
              </a>
              </li>
          </ul>
        </div>
      </footer>
    </>
  )
}

export default Footer;






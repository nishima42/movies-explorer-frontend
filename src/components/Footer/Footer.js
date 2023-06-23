import React from "react";
import "./Footer.css";

function Footer(props) {
  return (
    <footer className="footer">
      <p className="footer__text">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__container">
        <p className="footer__year">&copy; 2023</p>
        <div className="footer__links">
          <a className="footer__link" href="https://practicum.yandex.ru/" target="_blank" rel="noreferrer noopener">
            Яндекс.Практикум
          </a>
          <a className="footer__link" href="https://github.com/" target="_blank" rel="noreferrer noopener">
            Github
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

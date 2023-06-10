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
          <a className="footer__link" href="#">
            Яндекс.Практикум
          </a>
          <a className="footer__link" href="#">
            Github
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

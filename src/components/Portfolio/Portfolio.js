import React from "react";
import "./Portfolio.css";

function Portfolio(props) {
  return (
    <div className="about-me__portfolio">
      <h3 className="about-me__portfolio-title">Портфолио</h3>
      <ul className="about-me__portfolio-links">
        <li className="about-me__link-item">
          <a className="about-me__portfolio-link" href="#">
            Статичный сайт
          </a>
          <a className="about-me__link-button" href="#">
            &#129125;
          </a>
        </li>
        <li className="about-me__link-item">
          <a className="about-me__portfolio-link" href="#">
            Адаптивный сайт
          </a>
          <a className="about-me__link-button" href="#">
            &#129125;
          </a>
        </li>
        <li className="about-me__link-item">
          <a className="about-me__portfolio-link" href="#">
            Одностраничное приложение
          </a>
          <a className="about-me__link-button" href="#">
            &#129125;
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Portfolio;

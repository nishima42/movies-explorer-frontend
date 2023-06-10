import React from "react";
import "./Portfolio.css";

function Portfolio(props) {
  return (
    <div className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__links">
        <li className="portfolio__link-item">
          <a className="portfolio__link" href="#">
            Статичный сайт
          </a>
          <a className="portfolio__link-button" href="#">
            &#129125;
          </a>
        </li>
        <li className="portfolio__link-item">
          <a className="portfolio__link" href="#">
            Адаптивный сайт
          </a>
          <a className="portfolio__link-button" href="#">
            &#129125;
          </a>
        </li>
        <li className="portfolio__link-item">
          <a className="portfolio__link" href="#">
            Одностраничное приложение
          </a>
          <a className="portfolio__link-button" href="#">
            &#129125;
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Portfolio;

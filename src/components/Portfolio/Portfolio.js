import React from "react";
import "./Portfolio.css";

function Portfolio(props) {
  return (
    <div className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__links">
        <li className="portfolio__link-item">
          <a className="portfolio__link" href="https://github.com/nishima42/how-to-learn" target="_blank">
            Статичный сайт
          </a>
          <a className="portfolio__link-button" href="https://github.com/nishima42/how-to-learn" target="_blank">
            &#129125;
          </a>
        </li>
        <li className="portfolio__link-item">
          <a className="portfolio__link" href="https://nishima42.github.io/russian-travel-project/index.html" target="_blank">
            Адаптивный сайт
          </a>
          <a className="portfolio__link-button" href="https://nishima42.github.io/russian-travel-project/index.html" target="_blank">
            &#129125;
          </a>
        </li>
        <li className="portfolio__link-item">
          <a className="portfolio__link" href="https://github.com/nishima42/react-mesto-api-full-gha" target="_blank">
            Одностраничное приложение
          </a>
          <a className="portfolio__link-button" href="https://github.com/nishima42/react-mesto-api-full-gha" target="_blank">
            &#129125;
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Portfolio;

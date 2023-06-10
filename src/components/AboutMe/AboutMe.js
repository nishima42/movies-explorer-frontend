import React from "react";
import "./AboutMe.css";
import Portfolio from "../Portfolio/Portfolio.js";
import photo from "../../images/photo.jpg";

function AboutMe(props) {
  return (
    <section className="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__info">
        <div className="about-me__info-text">
          <div className="about-me__name">Рустам</div>
          <div className="about-me__about">Фронтенд-разработчик, 31 год</div>
          <div className="about-me__bio">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </div>
          <a
            className="about-me__link"
            href="https://github.com/nishima42"
            target="_blank"
          >
            Github
          </a>
        </div>
        <img
          className="about-me__photo"
          src={photo}
          alt="Фотография автора проекта"
        />
      </div>
      <Portfolio />
    </section>
  );
}

export default AboutMe;

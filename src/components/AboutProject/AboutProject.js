import React from "react";
import "./AboutProject.css";

function AboutProject(props) {
  return (
    <section className="about-project" id="about-project">
      <h2 className="about-project__title">О проекте</h2>
      <div className="about-project__info">
        <div className="about-project__column">
          <div className="about-project__info-title">
            Дипломный проект включал 5 этапов
          </div>
          <div className="about-project__info-text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </div>
        </div>
        <div className="about-project__column">
          <div className="about-project__info-title">
            На выполнение диплома ушло 5 недель
          </div>
          <div className="about-project__info-text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </div>
        </div>
      </div>
      <div className="about-project__timeline">
        <div className="about-project__timeline-bar">
          <div className="about-project__bar-item about-project__bar-item_small">
            1 неделя
          </div>
          <div className="about-project__bar-item about-project__bar-item_big">
            4 недели
          </div>
        </div>
        <div className="about-project__timeline-caption">
          <div className="about-project__caption-item about-project__caption-item_small">
            Back-end
          </div>
          <div className="about-project__caption-item about-project__caption-item_big">
            Front-end
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;

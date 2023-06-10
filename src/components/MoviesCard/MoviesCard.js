import React from "react";
import "./MoviesCard.css";
import movieImg from "../../images/movie-img-1.png";

function MoviesCard(props) {
  return (
    <article className="movies-card">
      <div className="movies-card__container">
        <div className="movies-card__info">
          <h2 className="movies-card__name">33 слова о дизайне</h2>
          <p className="movies-card__length">1ч 47м</p>
        </div>
        <div className="movies-card__save-icon"></div>
      </div>
      <img
        className="movies-card__movie-image"
        src={movieImg}
        alt="Обложка фильма 33 слова о дизайне"
      />
    </article>
  );
}

export default MoviesCard;

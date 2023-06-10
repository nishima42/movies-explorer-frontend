import React from "react";
import "./MoviesCard.css";
import movieImg from "../../images/movie-img-1.png";

function MoviesCard(props) {
  return (
    <article className="movies__movie-card">
      <div className="movies__movie-container">
        <div className="movies__movie-info">
          <h2 className="movies__movie-name">33 слова о дизайне</h2>
          <p className="movies__movie-length">1ч 47м</p>
        </div>
        <div className="movies__save-icon"></div>
      </div>
      <img
        className="movies__movie-img"
        src={movieImg}
        alt="Обложка фильма 33 слова о дизайне"
      />
    </article>
  );
}

export default MoviesCard;

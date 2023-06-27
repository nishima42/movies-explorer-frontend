import React from "react";
import { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCard.css";
import SavedMoviesContext from "../../contexts/SavedMoviesContext";

function MoviesCard(props) {
  const location = useLocation();
  const savedMoviesLocation = location.pathname === "/saved-movies";

  const savedMovies = useContext(SavedMoviesContext);

  const [isLiked, setIsLiked] = useState(
    savedMovies.some((i) => i.nameRU === props.movie.nameRU)
  );

  const saveIconClassName = `movies-card__save-icon ${
    savedMoviesLocation
    ? isLiked && "movies-card__save-icon_remove"
    : isLiked && "movies-card__save-icon_active"
  }`;

  const imageSrc =
  savedMoviesLocation
      ? props.movie.image
      : `https://api.nomoreparties.co${props.movie.image.url}`;

  const formattedDuration = formatDuration(props.movie.duration);

  function formatDuration(duration) {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours}ч ${minutes}м`;
  }

  function handleLikeClick(event) {
    event.preventDefault();
    event.stopPropagation();
    if (isLiked) {
      props.onCardDelete(props.movie);
      setIsLiked(false);
    } else {
      props.onCardLike(props.movie);
      setIsLiked(true);
    }
  }

  function removeSavedMovie(event) {
    event.preventDefault();
    event.stopPropagation();
    props.onCardDelete(props.movie);
    setIsLiked(false);
  }

  return (
    <article className="movies-card">
      <a
        className="movies-card__link"
        href={props.movie.trailerLink}
        target="_blank"
        rel="noreferrer"
      >
        <div className="movies-card__container">
          <div className="movies-card__info">
            <h2 className="movies-card__name">{props.movie.nameRU}</h2>
            <p className="movies-card__length">{formattedDuration}</p>
          </div>
          <div
            className={saveIconClassName}
            onClick={savedMoviesLocation ? removeSavedMovie : handleLikeClick}
          ></div>
        </div>
        <img
          className="movies-card__movie-image"
          src={imageSrc}
          alt={props.movie.nameRU}
        />
      </a>
    </article>
  );
}

export default MoviesCard;

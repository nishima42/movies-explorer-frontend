import React from "react";
import "./MoviesCardList.css";
import MovieCard from "../MoviesCard/MoviesCard.js";

function MoviesCardList(props) {
  return (
    <section className="movies-cardlist">
      <div className="movies-cardlist__container">
        {props.movies.map((movie, i) => (
          <MovieCard
            movie={movie}
            key={movie.id || movie._id}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        ))}
      </div>
    </section>
  );
}

export default MoviesCardList;

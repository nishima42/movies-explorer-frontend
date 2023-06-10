import React from "react";
import "./MoviesCardList.css";
import MovieCard from "../MoviesCard/MoviesCard.js";

function MoviesCardList(props) {
  return (
    <section className="movies">
      <div className="movies__container">
        <MovieCard />
      </div>
    </section>
  );
}

export default MoviesCardList;

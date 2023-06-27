import React, { useEffect } from "react";
import { useState } from "react";
import "./Movies.css";
import Header from "../Header/Header.js";
import Footer from "../Footer/Footer.js";
import SearchForm from "../SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";
import Preloader from "../Preloader/Preloader.js";
import More from "../More/More.js";

function Movies(props) {
  const [initialMovies, setInitialMovies] = useState(0);
  const [additionalMovies, setAdditionalMovies] = useState(0);

  function handleMoreClick() {
    setInitialMovies(
      (prevInitialMovies) => prevInitialMovies + additionalMovies
    );
  }

  useEffect(() => {
    if (props.windowWidth > 1000) {
      setInitialMovies(12);
      setAdditionalMovies(3);
    } else if (props.windowWidth > 561) {
      setInitialMovies(8);
      setAdditionalMovies(2);
    } else {
      setInitialMovies(5);
      setAdditionalMovies(2);
    }
  }, []);

  return (
    <>
      <Header />
      <SearchForm
        onSearchSubmit={props.onSearchSubmit}
        onShortsChange={props.onShortsChange}
        saveSearchKeyword={props.saveSearchKeyword}
        searchKeyword={props.searchKeyword}
        shortsState={props.shortsState}
        windowWidth={props.windowWidth}
      />
      {props.movies.length !== 0 && (
        <>
          <MoviesCardList
            movies={props.movies.slice(0, initialMovies)}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
          {initialMovies < props.movies.length && (
            <More handleMoreClick={handleMoreClick} />
          )}
        </>
      )}
      {props.isPreloaderActive && <Preloader />}
      {props.isNotFound && (
        <p className="movies__not-found">Ничего не найдено</p>
      )}
      <Footer />
    </>
  );
}

export default Movies;

import React, { useEffect } from "react";
import { useState } from "react";
import "./Movies.css";
import Header from "../Header/Header.js";
import Footer from "../Footer/Footer.js";
import SearchForm from "../SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";
import Preloader from "../Preloader/Preloader.js";
import More from "../More/More.js";
import {
  TABLET_RES,
  MOBILE_RES,
  DESKTOP_INITIAL,
  DESKTOP_ADDITIONAL,
  TABLET_INITIAL,
  TABLET_ADDITIONAL,
  MOBILE_INITIAL,
  MOBILE_ADDITIONAL,
} from "../../utils/constants.js";

function Movies(props) {
  const [initialMovies, setInitialMovies] = useState(0);
  const [additionalMovies, setAdditionalMovies] = useState(0);

  function handleMoreClick() {
    setInitialMovies(
      (prevInitialMovies) => prevInitialMovies + additionalMovies
    );
  }

  useEffect(() => {
    if (props.windowWidth > TABLET_RES) {
      setInitialMovies(DESKTOP_INITIAL);
      setAdditionalMovies(DESKTOP_ADDITIONAL);
    } else if (props.windowWidth > MOBILE_RES) {
      setInitialMovies(TABLET_INITIAL);
      setAdditionalMovies(TABLET_ADDITIONAL);
    } else {
      setInitialMovies(MOBILE_INITIAL);
      setAdditionalMovies(MOBILE_ADDITIONAL);
    }
  }, [props.windowWidth]);

  return (
    <>
      <Header />
      <SearchForm
        onSearchSubmit={props.onSearchSubmit}
        windowWidth={props.windowWidth}
        saveShortsState={props.saveShortsState}
      />
      {(props.movies.length !== 0 ||
        localStorage.getItem("filteredMovies")) && (
        <>
          <MoviesCardList
            movies={
              props.movies.length !== 0
                ? props.movies.slice(0, initialMovies)
                : JSON.parse(localStorage.getItem("filteredMovies"))
            }
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

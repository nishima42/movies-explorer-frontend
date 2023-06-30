import React from "react";
import { useState, useEffect } from "react";
import Header from "../Header/Header.js";
import Footer from "../Footer/Footer.js";
import SearchForm from "../SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";

import "./SavedMovies.css";

function SavedMovies(props) {

  const [isSearchSubmitted, setIsSearchSubmitted] = useState(false);
  const [notFound, setNotFound] = useState(false);

  function handleNotFound(state) {
    setNotFound(state);
  }

  useEffect(() => {
    handleNotFound(props.notFoundSaved);
  }, [props.filteredSavedMovies]);

  useEffect(() => {
    setIsSearchSubmitted(false);
    handleNotFound(false);
  }, []);

  useEffect(() => {
    setIsSearchSubmitted(false);
    handleNotFound(false);
  }, [props.savedMovies]);


  return (
    <>
      <Header />
      <SearchForm
        onSearchSubmitSaved={props.onSearchSubmitSaved}
        onShortsChange={props.onShortsChange}
        saveSearchKeyword={props.saveSearchKeyword}
        searchKeyword={props.searchKeywordSaved}
        shortsState={props.shortsState}
        windowWidth={props.windowWidth}
        setIsSearchSubmitted={setIsSearchSubmitted}
      />
      {props.savedMovies !== 0 && !notFound && (
        <MoviesCardList
          movies={
            isSearchSubmitted
              ? !notFound && props.filteredSavedMovies
              : props.savedMovies
          }
          onCardDelete={props.onCardDelete}
        />
      )}
      {isSearchSubmitted && notFound && (
        <p className="saved-movies__not-found">Ничего не найдено</p>
      )}
      <Footer />
    </>
  );
}

export default SavedMovies;

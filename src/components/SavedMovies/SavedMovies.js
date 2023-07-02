import React from "react";
import { useState, useEffect } from "react";
import Header from "../Header/Header.js";
import Footer from "../Footer/Footer.js";
import SearchForm from "../SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";

import "./SavedMovies.css";

function SavedMovies(props) {

  const [notFound, setNotFound] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState([]);

  function handleNotFound(state) {
    setNotFound(state);
  }

  useEffect(() => {
    handleNotFound(props.notFoundSaved);
    setFilteredMovies(props.filteredSavedMovies)
  }, [props.filteredSavedMovies]);

  useEffect(() => {
    props.resetSearchKeywordSaved();
    handleNotFound(false);
    setFilteredMovies(props.savedMovies)
  }, []);

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
      />
      {props.savedMovies !== 0 && !notFound && (
        <MoviesCardList
          movies={
            filteredMovies.length === 0
            ? props.savedMovies
            : filteredMovies
          }
          onCardDelete={props.onCardDelete}
        />
      )}
      {notFound && (
        <p className="saved-movies__not-found">Ничего не найдено</p>
      )}
      <Footer />
    </>
  );
}

export default SavedMovies;

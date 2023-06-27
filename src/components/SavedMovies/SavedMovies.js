import React from "react";
import Header from "../Header/Header.js";
import Footer from "../Footer/Footer.js";
import SearchForm from "../SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";

function SavedMovies(props) {
  const renderedMovies = props.searchKeywordSaved
    ? props.filteredSavedMovies
    : props.savedMovies;

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
      <MoviesCardList
        movies={renderedMovies}
        onCardDelete={props.onCardDelete}
      />
      <Footer />
    </>
  );
}

export default SavedMovies;

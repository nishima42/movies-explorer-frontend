import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox.js";

function SearchForm(props) {
  const location = useLocation();
  const savedMoviesLocation = location.pathname === "/saved-movies";

  const [searchValue, setSearchValue] = useState("");

  function handleSearchChange(e) {
    setSearchValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.saveSearchKeyword(searchValue);
    if (savedMoviesLocation) {
      props.onSearchSubmitSaved(searchValue);
    } else {
      props.onSearchSubmit(searchValue);
    }
  }

  useEffect(() => {
    if (props.searchKeyword) {
      setSearchValue(props.searchKeyword);
    }
  }, []);

  return (
    <section className="search-form">
      <div className="search-form__bar">
        <div className="search-form__icon"></div>
        <form className="search-form__form" onSubmit={handleSubmit}>
          <input
            type="search"
            className="search-form__input"
            name="movie-search"
            id="search"
            placeholder="Фильм"
            value={searchValue}
            onChange={handleSearchChange}
            required
          />
          <input type="submit" className="search-form__submit" value="" />
        </form>
        {props.windowWidth > 561 && (
          <FilterCheckbox
            onShortsChange={props.onShortsChange}
            shortsState={props.shortsState}
          />
        )}
      </div>
      {props.windowWidth <= 561 && (
        <FilterCheckbox
          onShortsChange={props.onShortsChange}
          shortsState={props.shortsState}
        />
      )}
      <div className="search-form__border"></div>
    </section>
  );
}

export default SearchForm;

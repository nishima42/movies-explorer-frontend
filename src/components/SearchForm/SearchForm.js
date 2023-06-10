import React from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox.js";

function SearchForm(props) {
  return (
    <section className="search">
      <div className="search__search-bar">
        <div className="search__search-icon"></div>
        <form className="search__form">
          <input
            type="search"
            className="search__input"
            name="movie-search"
            id="search"
            placeholder="Фильм"
          />
          <input type="submit" className="search__submit" value="" />
        </form>
        <FilterCheckbox />
      </div>
      <div className="search__border"></div>
    </section>
  );
}

export default SearchForm;

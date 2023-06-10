import React from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox.js";

function SearchForm(props) {
  return (
    <section className="search-form">
      <div className="search-form__bar">
        <div className="search-form__icon"></div>
        <form className="search-form__form">
          <input
            type="search"
            className="search-form__input"
            name="movie-search"
            id="search"
            placeholder="Фильм"
          />
          <input type="submit" className="search-form__submit" value="" />
        </form>
        <FilterCheckbox />
      </div>
      <div className="search-form__border"></div>
    </section>
  );
}

export default SearchForm;

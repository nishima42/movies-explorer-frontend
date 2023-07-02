import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox.js";

function SearchForm(props) {
  const location = useLocation();
  const savedMoviesLocation = location.pathname === "/saved-movies";

  const [searchValue, setSearchValue] = useState("");
  const [isError, setIsError] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);

  function handleCheckboxChange(state) {
    setCheckboxChecked(state);
    !savedMoviesLocation && props.saveShortsState(state);
    !savedMoviesLocation && localStorage.setItem("shortsState", JSON.stringify(state));
    savedMoviesLocation && props.onShortsChange(state);
  }

  function handleSearchChange(e) {
    setSearchValue(e.target.value);
  }

  function validateSearchValue() {
    if (searchValue.trim() === "") {
      setIsError(true);
      return false;
    }
    setIsError(false);
    return true;
  }

  function handleSubmit(e) {
    e.preventDefault();

    const isValid = validateSearchValue();
    if (!isValid) {
      return;
    }

    if (savedMoviesLocation) {
      props.onSearchSubmitSaved(searchValue);

    } else {
      localStorage.setItem("searchKeyword", searchValue);
      localStorage.setItem("shortsState", checkboxChecked);
      props.onSearchSubmit(searchValue);
    }
  }

  useEffect(() => {
    const searchKeyword = localStorage.getItem("searchKeyword");
    const savedShortsState = localStorage.getItem("shortsState");
    if (!savedMoviesLocation) {
      if (searchKeyword) {
        setSearchValue(searchKeyword);
      }
      if (savedShortsState) {
        setCheckboxChecked(savedShortsState === "true");
      }
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
          />
          <input type="submit" className="search-form__submit" value="" />
        </form>
        {props.windowWidth > 561 && (
          <FilterCheckbox
            checked={checkboxChecked}
            onChange={handleCheckboxChange}
          />
        )}
      </div>
      {props.windowWidth <= 561 && (
        <FilterCheckbox
          checked={checkboxChecked}
          onChange={handleCheckboxChange}
        />
      )}
      {isError && <p className="search__error">Нужно ввести ключевое слово</p>}
      <div className="search-form__border"></div>
    </section>
  );
}

export default SearchForm;

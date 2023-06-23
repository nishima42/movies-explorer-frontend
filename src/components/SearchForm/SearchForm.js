import React, { useState, useEffect } from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox.js";

function SearchForm(props) {

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Удаляем обработчик события при размонтировании компонента
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
        {windowWidth > 561 && <FilterCheckbox />}
      </div>
      {windowWidth <= 561 && <FilterCheckbox />}
      <div className="search-form__border"></div>
    </section>
  );
}

export default SearchForm;

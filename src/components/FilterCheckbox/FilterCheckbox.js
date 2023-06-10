import React from "react";
import "./FilterCheckbox.css";

function FilterCheckbox(props) {
  return (
    <div className="search__switch-container">
      <label className="search__switch">
        <input type="checkbox" className="search__checkbox" />
        <span className="search__slider"></span>
      </label>
      <p className="search__label">Короткометражки</p>
    </div>
  );
}

export default FilterCheckbox;

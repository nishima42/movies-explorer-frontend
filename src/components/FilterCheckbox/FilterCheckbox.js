import React from "react";
import "./FilterCheckbox.css";

function FilterCheckbox(props) {
  return (
    <div className="filter-checkbox">
      <label className="filter-checkbox__container">
        <input type="checkbox" className="filter-checkbox__checkbox" />
        <span className="filter-checkbox__slider"></span>
      </label>
      <p className="filter-checkbox__label">Короткометражки</p>
    </div>
  );
}

export default FilterCheckbox;

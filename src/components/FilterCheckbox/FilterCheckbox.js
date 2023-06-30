import React from "react";
import "./FilterCheckbox.css";

function FilterCheckbox(props) {

  function handleCheckboxChange(e) {
    const state = e.target.checked;
    if (props.onChange) {
      props.onChange(state);
    }
  }

  return (
    <div className="filter-checkbox">
      <label className="filter-checkbox__container">
        <input
          type="checkbox"
          className="filter-checkbox__checkbox"
          id="shorts-checkbox"
          onChange={handleCheckboxChange}
          checked={props.checked}
        />
        <span className="filter-checkbox__slider"></span>
      </label>
      <p className="filter-checkbox__label">Короткометражки</p>
    </div>
  );
}

export default FilterCheckbox;

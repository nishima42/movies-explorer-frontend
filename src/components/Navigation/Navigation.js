import React from "react";
import "./Navigation.css";

function Navigation(props) {
  return (
    <nav className="navigation navigation_register">
      <ul className="navigation__list">
        <li className="navigation__list-item navigation__list-item_active">
          <a href="#" className="navigation__link">
            Войти
          </a>
        </li>
        <li className="navigation__list-item navigation__list-item_hidden">
          <a href="#" className="navigation__link">
            Сохраненные фильмы
          </a>
        </li>
      </ul>
      <button
        className="navigation__button navigation__button_enter"
        type="button"
      >
        Аккаунт
      </button>
    </nav>
  );
}

export default Navigation;

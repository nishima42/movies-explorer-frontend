import { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navigation.css";
import LoggedInContext from "../../contexts/LoggedInContext.js";

function Navigation(props) {
  const [isOpen, setIsOpen] = useState(false);
  const loggedIn = useContext(LoggedInContext);

  function handleToggleMenu() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <nav
        className={`navigation ${
          loggedIn ? "navigation_movies" : "navigation_register"
        } ${isOpen ? "navigation_open" : ""}`}
      >
        <ul
          className={`navigation__list ${
            isOpen ? "navigation__list_open" : ""
          }`}
        >
          <li
            className={`navigation__list-item ${
              isOpen ? "" : "navigation__list-item_hidden"
            }`}
          >
            <NavLink
              to="/"
              className={({ isActive }) =>
                `navigation__link ${
                  isActive ? "navigation__list-item_active" : ""
                }`
              }
            >
              {`${isOpen ? "Главная" : ""}`}
            </NavLink>
          </li>
          <li className="navigation__list-item">
            <NavLink
              to={`${loggedIn ? "/movies" : "/signup"}`}
              className={({ isActive }) =>
                `navigation__link ${
                  isActive ? "navigation__list-item_active" : ""
                }`
              }
            >
              {`${loggedIn ? "Фильмы" : "Регистрация"}`}
            </NavLink>
          </li>
          <li
            className={`navigation__list-item ${
              loggedIn ? "" : "navigation__list-item_hidden"
            }`}
          >
            <NavLink
              to="/saved-movies"
              className={({ isActive }) =>
                `navigation__link ${
                  isActive ? "navigation__list-item_active" : ""
                }`
              }
            >
              Сохраненные фильмы
            </NavLink>
          </li>
        </ul>
        <Link
          to={`${loggedIn ? "/profile" : "/signin"}`}
          className="navigation__button-link"
        >
          <button
            className={`navigation__button ${
              loggedIn
                ? "navigation__button_account"
                : "navigation__button_enter"
            }`}
            type="button"
          >
            {`${loggedIn ? "Аккаунт" : "Войти"}`}
          </button>
        </Link>
      </nav>
      <div
        className={`navigation__burger ${
          isOpen ? "navigation__burger_open" : ""
        }`}
        onClick={handleToggleMenu}
      ></div>
      <div
        className={`navigation__background ${
          isOpen ? "navigation__background_open" : ""
        }`}
        onClick={handleToggleMenu}
      >
        {" "}
      </div>
    </>
  );
}

export default Navigation;

import React from "react";
import "./NavTab.css";

function NavTab(props) {
  return (
    <nav className="navtab">
      <ul className="navtab__list">
        <li className="navtab__list-item">
          <a href="#" className="navtab__link">
            О проекте
          </a>
        </li>
        <li className="navtab__list-item">
          <a href="#" className="navtab__link">
            Технологии
          </a>
        </li>
        <li className="navtab__list-item">
          <a href="#" className="navtab__link">
            Студент
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default NavTab;

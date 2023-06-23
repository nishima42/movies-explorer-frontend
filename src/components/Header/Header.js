import React from "react";
import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation.js";

import "./Header.css";
import logo from "../../images/ME-logo.svg";

function Header(props) {
  return (
    <header className="header">
      <Link to="/" className="header__link">
        <img className="header__logo" alt="Логотип сайта" src={logo} />
      </Link>
      <Navigation />
    </header>
  );
}

export default Header;

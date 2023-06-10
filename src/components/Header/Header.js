import React from "react";
import Navigation from "../Navigation/Navigation.js";

import "./Header.css";
import logo from "../../images/ME-logo.svg";

function Header(props) {
  return (
    <header className="header">
      <img className="header__logo" alt="Логотип сайта" src={logo} />
      <Navigation />
    </header>
  );
}

export default Header;

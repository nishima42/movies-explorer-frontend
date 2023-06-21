import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound(props) {
  return (
    <section className="not-found">
      <h1 className="not-found__heading">404</h1>
      <p className="not-found__text">Страница не найдена</p>
      <Link className="not-found__link" to="/">Назад</Link>
    </section>
  );
}

export default NotFound;
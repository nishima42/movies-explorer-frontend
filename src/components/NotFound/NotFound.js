import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotFound.css";

function NotFound(props) {

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <section className="not-found">
      <h1 className="not-found__heading">404</h1>
      <p className="not-found__text">Страница не найдена</p>
      <button className="not-found__link" onClick={handleGoBack}>Назад</button>
    </section>
  );
}

export default NotFound;
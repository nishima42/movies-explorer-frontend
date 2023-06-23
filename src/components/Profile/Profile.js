import React from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header.js";
import "./Profile.css";

function Profile(props) {
  return (
    <>
      <Header />
      <section className="profile">
        <h1 className="profile__greeting">Привет, Рустам!</h1>
        <dl className="profile__container">
          <div className="profile__item">
            <dt className="profile__key">Имя</dt>
            <dd className="profile__value">Рустам</dd>
          </div>
          <div className="profile__item">
            <dt className="profile__key">E-mail</dt>
            <dd className="profile__value">mrj@che-kuhni.ru</dd>
          </div>
        </dl>
        <Link to="/" className="profile__edit-link">
          Редактировать
        </Link>
        <Link to="/" className="profile__logout-link">
          Выйти из аккаунта
        </Link>
      </section>
    </>
  );
}

export default Profile;

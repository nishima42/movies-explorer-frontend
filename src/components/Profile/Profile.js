import React from "react";
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
        <a className="profile__edit-link" href="#">
          Редактировать
        </a>
        <a className="profile__logout-link" href="#">
          Выйти из аккаунта
        </a>
      </section>
    </>
  );
}

export default Profile;

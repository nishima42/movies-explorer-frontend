import React from "react";
import { Link } from "react-router-dom";
import "../Login/Login.css";
import logo from "../../images/ME-logo.svg";

function Register(props) {
  return (
    <>
      <header className="register__header login__header">
        <Link to="/" className="register__logo-link login__logo-link">
          <img
            className="register__logo login__logo"
            alt="Логотип сайта"
            src={logo}
          />
        </Link>
        <h1 className="register__title login__title">Добро пожаловать!</h1>
      </header>
      <section class="register login">
        <form class="register__form login__form">
          <label class="register__label login__label">
            Имя
            <input
              class="register__input login__input"
              type="text"
              name="name"
              id="name"
              required
            />
          </label>
          <label class="register__label login__label">
            E-mail
            <input
              class="register__input login__input"
              type="email"
              name="email"
              id="email"
              required
            />
          </label>
          <label class="register__label login__label">
            Пароль
            <input
              class="register__input login__input"
              type="password"
              name="password"
              id="password"
              required
            />
          </label>
          <input
            class="register__submit login__submit"
            type="submit"
            value="Зарегистрироваться"
          />
        </form>
        <div class="register__enter-container login__container">
          <p class="register__text login__text">Уже зарегистрированы?</p>
          <Link class="register__link login__link" to="/signin">
            Войти
          </Link>
        </div>
      </section>
    </>
  );
}

export default Register;

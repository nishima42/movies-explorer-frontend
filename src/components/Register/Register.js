import React from "react";
import "./Register.css";
import logo from "../../images/ME-logo.svg";

function Register(props) {
  return (
    <>
      <header className="register__header">
        <img className="register__logo" alt="Логотип сайта" src={logo} />
        <h1 className="register__title">Добро пожаловать!</h1>
      </header>
      <section class="register">
        <form class="register__form">
          <label class="register__label">
            Имя
            <input
              class="register__input"
              type="text"
              name="name"
              id="name"
              required
            />
          </label>
          <label class="register__label">
            E-mail
            <input
              class="register__input"
              type="email"
              name="email"
              id="email"
              required
            />
          </label>
          <label class="register__label">
            Пароль
            <input
              class="register__input"
              type="password"
              name="password"
              id="password"
              required
            />
          </label>
          <input
            class="register__submit"
            type="submit"
            value="Зарегистрироваться"
          />
        </form>
        <div class="register__enter-container">
          <p class="register__text">Уже зарегистрированы?</p>
          <a class="register__link" href="#">
            Войти
          </a>
        </div>
      </section>
    </>
  );
}

export default Register;

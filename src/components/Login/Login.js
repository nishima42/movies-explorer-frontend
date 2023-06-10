import React from "react";
import "./Login.css";
import logo from "../../images/ME-logo.svg";

function Login(props) {
  return (
    <>
      <header className="login-header">
        <img className="header__logo" alt="Логотип сайта" src={logo} />
        <h1 className="login-header__title">Рады видеть!</h1>
      </header>
      <section className="login">
        <form className="login__form">
          <label className="login__label">
            E-mail
            <input
              className="login__input"
              type="email"
              name="email"
              id="email"
              required
            />
          </label>
          <label className="login__label">
            Пароль
            <input
              className="login__input"
              type="password"
              name="password"
              id="password"
              required
            />
          </label>
          <input className="login__submit" type="submit" value="Войти" />
        </form>
        <div className="login__enter-container">
          <p className="login__text">Еще не зарегистрированы?</p>
          <a className="login__link" href="#">
            Регистрация
          </a>
        </div>
      </section>
    </>
  );
}

export default Login;

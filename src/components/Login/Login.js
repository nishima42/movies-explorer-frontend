import React from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import logo from "../../images/ME-logo.svg";

function Login(props) {
  return (
    <>
      <header className="login__header">
        <Link to="/" className="login__logo-link">
          <img className="login__logo" alt="Логотип сайта" src={logo} />
        </Link>
        <h1 className="login__title">Рады видеть!</h1>
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
        <div className="login__container">
          <p className="login__text">Еще не зарегистрированы?</p>
          <Link className="login__link" to="/signup">
            Регистрация
          </Link>
        </div>
      </section>
    </>
  );
}

export default Login;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import logo from "../../images/ME-logo.svg";
import { ERROR_MESSAGE } from "../../utils/constants.js";

function Login(props) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [loginError, setLoginError] = useState(false);

  const { email, password } = formValue;
  const { email: emailError, password: passwordError } = errors;

  const isFormValid = email && password && !emailError && !passwordError;

  function handleChange(e) {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });

    validateField(name, value);
  }

  function validateField(fieldName, value) {
    let errorMessage = "";

    switch (fieldName) {
      case "email":
        if (!/^\S+@\S+\.\S+$/.test(value)) {
          errorMessage = "Некорректный email.";
        }
        break;
      case "password":
        if (value.length < 6) {
          errorMessage = "Пароль должен содержать не менее 6 символов.";
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: errorMessage,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = formValue;
    if (validateForm()) {
      props.onLogin(email, password);
    }
  }

  function validateForm() {
    const { email, password } = formValue;
    const emailValid = /^\S+@\S+\.\S+$/.test(email);
    const passwordValid = password.length >= 6;

    setErrors({
      email: emailValid ? "" : "Некорректный email.",
      password: passwordValid
        ? ""
        : "Пароль должен содержать не менее 6 символов.",
    });

    return emailValid && passwordValid;
  }

  useEffect(() => {
    setLoginError(props.serverError);
  }, [props.serverError])

  useEffect(() => {
    setLoginError(false);
  }, [])

  return (
    <>
      <header className="login__header">
        <Link to="/" className="login__logo-link">
          <img className="login__logo" alt="Логотип сайта" src={logo} />
        </Link>
        <h1 className="login__title">Рады видеть!</h1>
      </header>
      <section className="login">
        <form className="login__form" onSubmit={handleSubmit}>
          <label className="login__label">
            E-mail
            <input
              className="login__input"
              type="email"
              name="email"
              id="email"
              required
              value={email}
              onChange={handleChange}
              disabled={props.isSubmitting}
            />
            {emailError && <span className="login__error">{emailError}</span>}
          </label>
          <label className="login__label">
            Пароль
            <input
              className="login__input"
              type="password"
              name="password"
              id="password"
              required
              value={password}
              onChange={handleChange}
              disabled={props.isSubmitting}
            />
            {passwordError && (
              <span className="login__error">{passwordError}</span>
            )}
          </label>
          {loginError && (
              <span className="login__server-error">{ERROR_MESSAGE}</span>
            )}
          <input
            className={`login__submit ${
              isFormValid ? "" : "login__submit_disabled"
            }`}
            type="submit"
            value="Войти"
            disabled={!isFormValid || props.isSubmitting}
          />
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

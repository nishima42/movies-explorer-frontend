import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Login/Login.css";
import logo from "../../images/ME-logo.svg";
import { ERROR_MESSAGE } from "../../utils/constants.js";

function Register(props) {
  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [registerError, setRegisterError] = useState(false);

  const { name, email, password } = formValue;
  const {
    name: nameError,
    email: emailError,
    password: passwordError,
  } = errors;

  const isFormValid =
    name && email && password && !nameError && !emailError && !passwordError;

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
      case "name":
        if (!/^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(value)) {
          errorMessage = "Некорректное имя.";
        }
        break;
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

    const { name, email, password } = formValue;

    if (validateForm()) {
      props.onRegister(name, email, password);
    }
  }

  function validateForm() {
    const { name, email, password } = formValue;

    const nameValid = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(name);
    const emailValid = /^\S+@\S+\.\S+$/.test(email);
    const passwordValid = password.length >= 6;

    setErrors({
      name: nameValid ? "" : "Некорректное имя.",
      email: emailValid ? "" : "Некорректный email.",
      password: passwordValid
        ? ""
        : "Пароль должен содержать не менее 6 символов.",
    });

    return nameValid && emailValid && passwordValid;
  }

  useEffect(() => {
    setRegisterError(props.serverError);
  }, [props.serverError])

  useEffect(() => {
    setRegisterError(false);
  }, [])

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
      <section className="register login">
        <form className="register__form login__form" onSubmit={handleSubmit}>
          <label className="register__label login__label">
            Имя
            <input
              className="register__input login__input"
              type="text"
              name="name"
              id="name"
              required
              value={name}
              onChange={handleChange}
              disabled={props.isSubmitting}
            />
            {nameError && (
              <span className="register__error login__error">{nameError}</span>
            )}
          </label>
          <label className="register__label login__label">
            E-mail
            <input
              className="register__input login__input"
              type="email"
              name="email"
              id="email"
              required
              value={email}
              onChange={handleChange}
              disabled={props.isSubmitting}
            />
            {emailError && (
              <span className="register__error login__error">{emailError}</span>
            )}
          </label>
          <label className="register__label login__label">
            Пароль
            <input
              className="register__input login__input"
              type="password"
              name="password"
              id="password"
              required
              value={password}
              onChange={handleChange}
              disabled={props.isSubmitting}
            />
            {passwordError && (
              <span className="register__error login__error">
                {passwordError}
              </span>
            )}
          </label>
          {registerError && (
              <span className="register__server-error login__server-error">{ERROR_MESSAGE}</span>
            )}
          <input
            className={`register__submit login__submit ${
              isFormValid
                ? ""
                : "register__submit_disabled login__submit_disabled"
            }`}
            type="submit"
            value="Зарегистрироваться"
            disabled={!isFormValid || props.isSubmitting}
          />
        </form>
        <div className="register__enter-container login__container">
          <p className="register__text login__text">Уже зарегистрированы?</p>
          <Link className="register__link login__link" to="/signin">
            Войти
          </Link>
        </div>
      </section>
    </>
  );
}

export default Register;

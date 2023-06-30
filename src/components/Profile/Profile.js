import React from "react";
import { useState, useContext, useEffect } from "react";
import Header from "../Header/Header.js";
import "./Profile.css";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

function Profile(props) {
  const currentUser = useContext(CurrentUserContext);

  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
  });

  const [editProfileError, setEditProfileError] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const { name, email } = formValue;
  const { name: nameError, email: emailError } = errors;

  const isFormValid = name && email && !nameError && !emailError;

  const isDataChanged =
    name !== currentUser.name || email !== currentUser.email;

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
    const { name, email } = formValue;
    if (validateForm()) {
      props.onEditProfile(name, email);
    }
  }

  function validateForm() {
    const { name, email } = formValue;

    const nameValid = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(name);
    const emailValid = /^\S+@\S+\.\S+$/.test(email);

    setErrors({
      name: nameValid ? "" : "Некорректное имя.",
      email: emailValid ? "" : "Некорректный email.",
    });

    return nameValid && emailValid;
  }

  useEffect(() => {
    if (currentUser) {
      setFormValue({
        name: currentUser.name || "",
        email: currentUser.email || "",
      });
    }
  }, [currentUser]);

  useEffect(() => {
    setEditProfileError(props.serverError);
  }, [props.serverError])

  useEffect(() => {
    setEditProfileError(false);
  }, [])

  useEffect(() => {
    setIsConfirmed(props.showConfirmation);
  }, [props.showConfirmation])

  useEffect(() => {
    setIsConfirmed(false);
  }, [])

  return (
    <>
      <Header />
      <section className="profile">
        <h1 className="profile__greeting">Привет, {currentUser.name}!</h1>
        <form className="profile__form" onSubmit={handleSubmit}>
          <label className="profile__label">
            Имя
            <input
              className="profile__input"
              type="text"
              name="name"
              id="name"
              required
              value={name}
              onChange={handleChange}
              disabled={props.isSubmitting}
            />
          </label>
          {nameError && <span className="profile__error">{nameError}</span>}
          <label className="profile__label">
            E-mail
            <input
              className="profile__input"
              type="email"
              name="email"
              id="email"
              required
              value={email}
              onChange={handleChange}
              disabled={props.isSubmitting}
            />
          </label>
          {emailError && <span className="profile__error">{emailError}</span>}
          {isConfirmed && (
            <p className="profile__confirmation">
              Данные пользователя сохранены
            </p>
          )}
          {editProfileError && (
              <span className="profile__server-error">Что-то пошло не так</span>
            )}
          <input
            className={`profile__submit ${
              isFormValid && isDataChanged ? "" : "profile__submit_disabled"
            }`}
            type="submit"
            value="Редактировать"
            disabled={!isFormValid || !isDataChanged || props.isSubmitting}
          />
        </form>
        <p className="profile__logout-link" onClick={props.onLogout}>
          Выйти из аккаунта
        </p>
      </section>
    </>
  );
}

export default Profile;

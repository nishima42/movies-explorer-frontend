import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import "./App.css";

import Main from "../Main/Main.js";
import Movies from "../Movies/Movies.js";
import SavedMovies from "../SavedMovies/SavedMovies.js";
import Profile from "../Profile/Profile.js";
import Login from "../Login/Login.js";
import Register from "../Register/Register.js";
import NotFound from "../NotFound/NotFound.js";
import movieApi from "../../utils/MoviesApi.js";
import mainApi from "../../utils/MainApi.js";
import * as auth from "../../utils/auth.js";
import ProtectedRouteElement from "../ProtectedRoute/ProtectedRoute.js";

import { filterMovies } from "../../utils/movieFilter.js";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import LoggedInContext from "../../contexts/LoggedInContext.js";
import SavedMoviesContext from "../../contexts/SavedMoviesContext.js";

function App() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [shortsState, setShortsState] = useState(false);

  //Стейты поиска /saved-movies
  const [searchKeywordSaved, setSearchKeywordSaved] = useState("");
  const [shortsStateSaved, setShortsStateSaved] = useState(false);

  //Стейт для отфильтрованных фильмов /movies
  const [filteredMovies, setFilteredMovies] = useState([]);

  //Стейт для сохраненных фильмов
  const [savedMovies, setSavedMovies] = useState([]);
  //Стейт для отфильтрованных сохраненных фильмов
  const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);

  const [isPreloaderActive, setIsPreloaderActive] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);

  const navigate = useNavigate();

  const [serverError, setServerError] = useState(false);

  const [notFoundSaved, setNotFoundSaved] = useState(false);

  const [showConfirmation, setShowConfirmation] = useState(false);

  function handleRegister(name, email, password) {
    setServerError(false);
    setIsSubmitting(true);
    auth
      .register(name, email, password)
      .then((res) => {
        setIsSubmitting(false);
        console.log("Вы успешно зарегистрировались");
        handleLogin(email, password);
      })
      .catch((err) => {
        setIsSubmitting(false);
        setServerError(true);
        console.log(err);
      });
  }

  function handleLogin(email, password) {
    setServerError(false);
    setIsSubmitting(true);
    auth
      .authorize(email, password)
      .then((data) => {
        setIsSubmitting(false);
        if (data.token) {
          setLoggedIn(true);
          navigate("/movies", { replace: true });
          console.log("Вы успешно вошли в систему");
          getsavedMovies();
          mainApi
            .getUserInfo()
            .then((userInfo) => {
              if (userInfo) {
                setCurrentUser(userInfo);
              }
            })
            .catch((err) => {
              console.log(err);
              setServerError(true);
            });
        }
      })
      .catch((err) => {
        setIsSubmitting(false);
        setServerError(true);
        console.log(err);
      });
  }

  function handleLogOut() {
    setFilteredMovies([]);
    setShortsState(false);
    localStorage.clear();
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
    setLoggedIn(false);
    setCurrentUser({});
    navigate("/", { replace: true });
  }

  function tokenCheck() {
    const token = localStorage.getItem("token");
    if (token) {
      mainApi
        .getUserInfo()
        .then((userInfo) => {
          if (userInfo) {
            setCurrentUser(userInfo);
            setLoggedIn(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function getsavedMovies() {
    mainApi
      .getMovies()
      .then((res) => {
        setSavedMovies(res.movies);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleEditProfile(name, email) {
    setShowConfirmation(false);
    setServerError(false);
    setIsSubmitting(true);
    mainApi
      .patchUserInfo(name, email)
      .then((userInfo) => {
        setIsSubmitting(false);
        setCurrentUser(userInfo);
        setShowConfirmation(true);
      })
      .catch((err) => {
        setShowConfirmation(false);
        setIsSubmitting(false);
        setServerError(true);
        console.log(err);
      });
  }

  function handleCardLike(movie) {
    if (savedMovies.some((i) => i.nameRU === movie.nameRU)) {
      console.log("Фильм уже сохранен");
    } else {
      mainApi
        .saveMovie(movie)
        .then((savedMovie) => {
          setSavedMovies([...savedMovies, savedMovie]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleCardDelete(movie) {
    const deletedMovie = savedMovies.find((i) => i.nameRU === movie.nameRU);
    mainApi
      .deleteMovie(deletedMovie._id)
      .then((res) => {
        console.log(res);
        setSavedMovies(
          savedMovies.filter((movie) => movie.nameRU !== deletedMovie.nameRU)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function activatePreloader() {
    setIsPreloaderActive(true);
  }

  function deactivatePreloader() {
    setIsPreloaderActive(false);
  }

  //Функции для сохранения стейтов поиска /saved-movies
  function saveSearchKeywordSaved(keyword) {
    setSearchKeywordSaved(keyword);
  }
  function saveShortsStateSaved(state) {
    setShortsStateSaved(state);
  }

  function saveShortsState(state) {
    setShortsState(state);
  }

  function handleSearchSubmit(searchValue) {
    const allMovies = JSON.parse(localStorage.getItem("allMovies"));
    setShortsState(JSON.parse(localStorage.getItem("shortsState")));
    if (!allMovies) {
      activatePreloader();
      movieApi
        .getMovies()
        .then((movies) => {
          localStorage.setItem("allMovies", JSON.stringify(movies));
          const filtered = filterMovies(movies, searchValue, shortsState);
          localStorage.setItem("filteredMovies", JSON.stringify(filtered));
          deactivatePreloader();
          setFilteredMovies(filtered);
          if (filtered.length === 0) {
            setIsNotFound(true);
          } else {
            setIsNotFound(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const filtered = filterMovies(allMovies, searchValue, shortsState);
      localStorage.setItem("filteredMovies", JSON.stringify(filtered));
      setFilteredMovies(filtered);
      if (filtered.length === 0) {
        setIsNotFound(true);
      } else {
        setIsNotFound(false);
      }
    }
  }

  function handleSearchSubmitSaved(searchValue) {
    setSearchKeywordSaved(searchValue);
    const filtered = filterMovies(savedMovies, searchValue, shortsStateSaved);
    setFilteredSavedMovies(filtered);
    if (filtered.length === 0) {
      setNotFoundSaved(true);
    } else {
      setNotFoundSaved(false);
    }
  }

  //Повторный поиск при переключении чекбокса
  useEffect(() => {
    const allMovies = JSON.parse(localStorage.getItem("allMovies"));
    const searchKeyword = localStorage.getItem("searchKeyword");
    if (allMovies) {
      handleSearchSubmit(searchKeyword);
    }
  }, [shortsState]);

  //Повторный поиск при переключении чекбокса в сохраненных
  useEffect(() => {
    if (savedMovies && searchKeywordSaved) {
      handleSearchSubmitSaved(searchKeywordSaved);
    }
  }, [shortsStateSaved]);

  useEffect(() => {
    tokenCheck();
    getsavedMovies();
    setSearchKeywordSaved("");
  }, []);

  // запись размера экрана
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <LoggedInContext.Provider value={loggedIn}>
        <SavedMoviesContext.Provider value={savedMovies}>
          <Routes>
            <Route
              path="/signin"
              element={
                <Login
                  onLogin={handleLogin}
                  isSubmitting={isSubmitting}
                  serverError={serverError}
                />
              }
            />
            <Route
              path="/signup"
              element={
                <Register
                  onRegister={handleRegister}
                  isSubmitting={isSubmitting}
                  serverError={serverError}
                />
              }
            />
            <Route path="/" element={<Main />} />
            <Route
              path="/movies"
              element={
                <ProtectedRouteElement
                  element={Movies}
                  movies={filteredMovies}
                  isPreloaderActive={isPreloaderActive}
                  isNotFound={isNotFound}
                  windowWidth={windowWidth}
                  loggedIn={loggedIn}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  onSearchSubmit={handleSearchSubmit}
                  saveShortsState={saveShortsState}
                />
              }
            />
            <Route
              path="/saved-movies"
              element={
                <ProtectedRouteElement
                  element={SavedMovies}
                  loggedIn={loggedIn}
                  savedMovies={savedMovies}
                  filteredSavedMovies={filteredSavedMovies}
                  onCardDelete={handleCardDelete}
                  windowWidth={windowWidth}
                  onSearchSubmitSaved={handleSearchSubmitSaved}
                  onShortsChange={saveShortsStateSaved}
                  shortsState={shortsStateSaved}
                  searchKeywordSaved={searchKeywordSaved}
                  saveSearchKeyword={saveSearchKeywordSaved}
                  notFoundSaved={notFoundSaved}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRouteElement
                  element={Profile}
                  onLogout={handleLogOut}
                  onEditProfile={handleEditProfile}
                  loggedIn={loggedIn}
                  isSubmitting={isSubmitting}
                  serverError={serverError}
                  showConfirmation={showConfirmation}
                />
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </SavedMoviesContext.Provider>
      </LoggedInContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;

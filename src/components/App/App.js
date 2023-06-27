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

  //Стейты поиска /movies
  const [searchKeyword, setSearchKeyword] = useState("");
  const [shortsState, setShortsState] = useState(false);

  //Стейты поиска /saved-movies
  const [searchKeywordSaved, setSearchKeywordSaved] = useState("");
  const [shortsStateSaved, setShortsStateSaved] = useState(false);

  //Стейт для всех фильмаов с сервера
  const [allMovies, setAllMovies] = useState([]);
  //Стейт для отфильтрованных фильмов /movies
  const [filteredMovies, setFilteredMovies] = useState([]);

  //Стейт для сохраненных фильмов
  const [savedMovies, setSavedMovies] = useState([]);
  //Стейт для отфильтрованных сохраненных фильмов
  const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);

  const [isPreloaderActive, setIsPreloaderActive] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);

  const navigate = useNavigate();

  //Функции для сохранения стейтов поиска /movies

  function handleRegister(name, email, password) {
    auth
      .register(name, email, password)
      .then((res) => {
        console.log("Вы успешно зарегистрировались");
        handleLogin(email, password);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleLogin(email, password) {
    auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          setLoggedIn(true);
          navigate("/movies", { replace: true });
          console.log("Вы успешно вошли в систему");
          mainApi
            .getUserInfo()
            .then((userInfo) => {
              if (userInfo) {
                setCurrentUser(userInfo);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleLogOut() {
    localStorage.removeItem("token");
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
            navigate("/", { replace: true });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleEditProfile(name, email) {
    mainApi
      .patchUserInfo(name, email)
      .then((userInfo) => {
        setCurrentUser(userInfo);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function saveAllMovies(movies) {
    setAllMovies(movies);
  }

  function activatePreloader() {
    setIsPreloaderActive(true);
  }

  function deactivatePreloader() {
    setIsPreloaderActive(false);
  }

  function handleCardLike(movie) {
    console.log(movie);
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

  //Функции для сохранения стейтов поиска /movies
  function saveSearchKeyword(keyword) {
    setSearchKeyword(keyword);
  }
  function saveshortsState(state) {
    setShortsState(state);
  }

  //Функции для сохранения стейтов поиска /saved-movies
  function saveSearchKeywordSaved(keyword) {
    setSearchKeywordSaved(keyword);
  }
  function saveShortsStateSaved(state) {
    setShortsStateSaved(state);
  }

  function handleSearchSubmit(searchValue) {
    if (allMovies.length === 0) {
      activatePreloader();
      movieApi
        .getMovies()
        .then((movies) => {
          saveAllMovies(movies);
          const filtered = filterMovies(movies, searchValue, shortsState);
          deactivatePreloader();
          setFilteredMovies(filtered);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const filtered = filterMovies(allMovies, searchValue, shortsState);
      setFilteredMovies(filtered);
    }
  }

  function handleSearchSubmitSaved(searchValue) {
    const filtered = filterMovies(savedMovies, searchValue, shortsStateSaved);
    setFilteredSavedMovies(filtered);
  }

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    mainApi
      .getMovies()
      .then((res) => {
        setSavedMovies(res.movies);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (allMovies.length !== 0) {
      handleSearchSubmit(searchKeyword);
    }
  }, [shortsState]);

  useEffect(() => {
    if (filteredSavedMovies.length !== 0) {
      handleSearchSubmitSaved(searchKeywordSaved);
    }
  }, [shortsStateSaved]);

  useEffect(() => {
    if (allMovies.length !== 0) {
      const movies = filterMovies(allMovies, searchKeyword, shortsState);
      if (movies.length !== 0) {
        setFilteredMovies(movies);
        setIsNotFound(false);
      } else {
        setFilteredMovies([]);
        setIsNotFound(true);
      }
    } else {
      setFilteredMovies([]);
    }
  }, [allMovies, searchKeyword, shortsState]);

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
            <Route path="/signin" element={<Login onLogin={handleLogin} />} />
            <Route
              path="/signup"
              element={<Register onRegister={handleRegister} />}
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
                  onShortsChange={saveshortsState}
                  saveSearchKeyword={saveSearchKeyword}
                  searchKeyword={searchKeyword}
                  shortsState={shortsState}
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

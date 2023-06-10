import React from "react";
import "./Movies.css";
import Header from "../Header/Header.js";
import Footer from "../Footer/Footer.js";
import SearchForm from "../SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";

function Movies(props) {
  return (
    <>
      <Header />
      <SearchForm />
      <MoviesCardList />
      <section className="more-movies">
        <button className="more-movies__button" type="button">
          Ещё
        </button>
      </section>
      <Footer />
    </>
  );
}

export default Movies;

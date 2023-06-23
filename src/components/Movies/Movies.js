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
      <section className="movies__more">
        <button className="movies__more-button" type="button">
          Ещё
        </button>
      </section>
      <Footer />
    </>
  );
}

export default Movies;

import React from "react";
import Header from "../Header/Header.js";
import Footer from "../Footer/Footer.js";
import Promo from "../Promo/Promo.js";
import AboutProject from "../AboutProject/AboutProject.js";
import Techs from "../Techs/Techs.js";
import AboutMe from "../AboutMe/AboutMe.js";

function Main(props) {
  return (
    <>
      <Header />
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Footer />
    </>
  );
}

export default Main;

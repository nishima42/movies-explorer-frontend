import React from "react";
import "./More.css";

function More(props) {
  return (
      <section className="more">
        <button className="more__button" type="button" onClick={props.handleMoreClick}>
          Ещё
        </button>
      </section>
  );
}

export default More;

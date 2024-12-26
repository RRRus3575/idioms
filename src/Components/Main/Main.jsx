import React from "react";
import Hero from "../Hero/Hero";
import CardSection from "../Card-section/Card-section";
import IdiomsList from "../IdiomsList/IdiomsList";

const Main = ({ idioms, onFormSubmit }) => {
  return (
    <main>
      <Hero onFormSubmit={onFormSubmit} />
      <p>
        {idioms.idiom} - {idioms.language}
      </p>
      <CardSection onFormSubmit={onFormSubmit} />
      {/* <IdiomsList idioms={idioms} /> */}
    </main>
  );
};

export default Main;

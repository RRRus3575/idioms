import React from "react";
import Hero from "../Hero/Hero";
import CardSection from "../Card-section/Card-section";
import IdiomsBlock from "../IdiomsBlock/IdiomsBlock";

const MainHome = ({ onFormSubmit }) => {
  return (
    <main>
      <Hero onFormSubmit={onFormSubmit} />     
      <CardSection onFormSubmit={onFormSubmit} />
      <IdiomsBlock/>
    </main>
  );
};

export default MainHome;

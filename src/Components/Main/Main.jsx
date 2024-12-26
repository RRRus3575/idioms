import React from "react";
import sprite from "../../sprite.svg";
import styles from "./Main.module.css";
import Hero from "../Hero/Hero";
import CardSection from "../Card-section/Card-section";

const Main = () => {
  return (
    <main>
      <Hero />
      <CardSection />
    </main>
  );
};

export default Main;

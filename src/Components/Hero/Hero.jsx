import React from "react";
import styles from "./Hero.module.css";
import FormHero from "../FormHero/FormHero";

const Hero = ({ onFormSubmit }) => {
  return (
    <section className={styles.hero}>
      <h1 className="visually-hidden">Idiomo</h1>
      <p className="visually-hidden">Land of idioms</p>
      <svg className={styles.top}>
        <use xlinkHref={`/sprite.svg#dropsvg`} />
      </svg>
      <svg className={styles.bottom}>
        <use xlinkHref={`/sprite.svg#dropsvg`} />
      </svg>
      <svg className={styles.right}>
        <use xlinkHref={`/sprite.svg#dropsvg`} />
      </svg>
      <svg className={styles.image}>
        <use xlinkHref={`/sprite.svg#idiomo`} />
      </svg>
      <div>
        <FormHero onFormSubmit={onFormSubmit} />
        <p className={styles.text}>
          More than 10k idioms are available on the platform
        </p>
      </div>
    </section>
  );
};

export default Hero;

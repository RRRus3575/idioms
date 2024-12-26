import React from "react";
import sprite from "../../sprite.svg";
import styles from "./Hero.module.css";
import FormHero from "../Form-hero/Form-hero";

const Hero = () => {
  return (
    <section className={styles.hero}>
      <h1 className="visually-hidden">Idiomo</h1>
      <p className="visually-hidden">Land of idioms</p>
      <svg className={styles.top}>
        <use xlinkHref={`${sprite}#dropsvg`} />
      </svg>
      <svg className={styles.bottom}>
        <use xlinkHref={`${sprite}#dropsvg`} />
      </svg>
      <svg className={styles.right}>
        <use xlinkHref={`${sprite}#dropsvg`} />
      </svg>
      <svg className={styles.image}>
        <use xlinkHref={`${sprite}#idiomo`} />
      </svg>
      <div>
        <FormHero />
        <p className={styles.text}>
          More than 10k idioms are available on this language
        </p>
      </div>
    </section>
  );
};

export default Hero;

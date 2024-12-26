import React from "react";
import sprite from "../../sprite.svg";
import styles from "./form.module.css";

const FormHero = () => {
  return (
    <form className={styles.heroForm}>
      <label className={styles.inputLabel}>
        <svg className={styles.search} width="12px" height="12px">
          <use xlinkHref={`${sprite}#find`} />
        </svg>
        <input placeholder="Tap idiom here" className={styles.input} />
      </label>
      <div className="form-select">
        <select className={styles.select}>
          <option value="english" className={styles.option}>
            English
          </option>
        </select>
        <svg className={styles.icon}>
          <use xlinkHref={`${sprite}#down`} />
        </svg>
      </div>
      <button className={styles.button}>Search</button>
    </form>
  );
};

export default FormHero;

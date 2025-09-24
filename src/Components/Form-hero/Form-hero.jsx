import React, { useState } from "react";
import styles from "./Form-hero.module.css";
import { useMediaQuery } from "react-responsive";

const FormHero = ({ onFormSubmit }) => {
  const [formData, setFormData] = useState({
    idiom: "",
    language: "english",
  });

  const handleChange = (event) => {
    const { name, value } = event.target; // Получаем имя и значение поля
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Обновляем состояние
    }));
  };

  const isMobile = useMediaQuery({ maxWidth: 750 });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      idiom: formData.idiom.trim(),
      language: formData.language,
    };
    if (!payload.idiom) return;

    // ждём переход на /search?q=...
    const p = onFormSubmit?.(payload);
    if (p && typeof p.then === "function") {
      await p;
    }

    // очищаем только поле текста, язык оставляем
    setFormData((s) => ({ ...s, idiom: "" }));
  };

  return (
    <form className={styles.heroForm} onSubmit={handleSubmit}>
      <label className={styles.inputLabel}>
        <svg className={styles.search} width="16px" height="16px">
          <use xlinkHref={`/sprite.svg#find`} />
        </svg>
        <input
          name="idiom" 
          value={formData.idiom} 
          onChange={handleChange} 
          placeholder= {isMobile ? "Tap idiom" : "Tap idiom here"}
          className={styles.input}
        />
      </label>
      <div className={styles.formselect}>
        <select
          className={styles.select}
          name="language" 
          value={formData.language} 
          onChange={handleChange} 
        >
          <option value="english" className={styles.option}>
            English
          </option>
          <option value="german" className={styles.option}>
            German
          </option>
        </select>
        <svg className={styles.icon}>
          <use xlinkHref={`/sprite.svg#down`} />
        </svg>
      </div>
      <button type="submit" className={styles.button} aria-label="search">
         {isMobile ? 
          <svg width="16px" height="16px">
          <use xlinkHref={`/sprite.svg#find`} />
        </svg>         
          : "Search"}
      </button>
    </form>
  );
};

export default FormHero;

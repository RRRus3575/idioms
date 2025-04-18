import React, { useState } from "react";
import sprite from "../../sprite.svg";
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

  const handleSubmit = (event) => {
    event.preventDefault(); // Предотвращаем перезагрузку страницы
    onFormSubmit(formData); // Передаём данные в родительский компонент
    setFormData({ idiom: "", language: "english" }); // Сбрасываем форму
  };

  return (
    <form className={styles.heroForm} onSubmit={handleSubmit}>
      <label className={styles.inputLabel}>
        <svg className={styles.search} width="16px" height="16px">
          <use xlinkHref={`${sprite}#find`} />
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
          <use xlinkHref={`${sprite}#down`} />
        </svg>
      </div>
      <button type="submit" className={styles.button} aria-label="search">
         {isMobile ? 
          <svg width="16px" height="16px">
          <use xlinkHref={`${sprite}#find`} />
        </svg>         
          : "Search"}
      </button>
    </form>
  );
};

export default FormHero;

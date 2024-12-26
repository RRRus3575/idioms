import React, { useState } from "react";
import sprite from "../../sprite.svg";
import styles from "./form.module.css";

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

  const handleSubmit = (event) => {
    event.preventDefault(); // Предотвращаем перезагрузку страницы
    onFormSubmit(formData); // Передаём данные в родительский компонент
    setFormData({ idiom: "", language: "english" }); // Сбрасываем форму
  };

  return (
    <form className={styles.heroForm} onSubmit={handleSubmit}>
      <label className={styles.inputLabel}>
        <svg className={styles.search} width="12px" height="12px">
          <use xlinkHref={`${sprite}#find`} />
        </svg>
        <input
          name="idiom" // Указываем имя для обновления состояния
          value={formData.idiom} // Привязываем значение из состояния
          onChange={handleChange} // Обрабатываем изменения
          placeholder="Tap idiom here"
          className={styles.input}
        />
      </label>
      <div className="form-select">
        <select
          className={styles.select}
          name="language" // Указываем имя для обновления состояния
          value={formData.language} // Привязываем значение из состояния
          onChange={handleChange} // Обрабатываем изменения
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
      <button type="submit" className={styles.button}>
        Search
      </button>
    </form>
  );
};

export default FormHero;

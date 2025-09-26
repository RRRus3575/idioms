import React, { useState } from "react";
import styles from "./form.module.css";
import { useMediaQuery } from "react-responsive";
import LanguageSelect from "@/Components/LanguageSelect/LanguageSelect";


const FormHeader = ({ handleFormSubmit }) => {
  const [formData, setFormData] = useState({ idiom: "", language: "english" });
  const isMobile = useMediaQuery({ maxWidth: 480 });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // НЕ вызываем handleFormSubmit здесь, иначе будет редирект на каждый ввод
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleFormSubmit(formData);
  };

  return (
    <form className={styles.headerForm} onSubmit={onSubmit}>
      <label className={styles.inputLabel}>
        <svg className={styles.search} width="16" height="16" aria-hidden="true">
          <use xlinkHref="/sprite.svg#find" />
        </svg>
        <input
          name="idiom"
          value={formData.idiom}
          onChange={handleChange}
          placeholder={isMobile ? "Tap idiom" : "Tap idiom here"}
          className={styles.input}
          autoComplete="off"
        />
      </label>

      {/* <div className="form-select">
        <select
          name="language"            // ← важно!
          className={styles.select}
          value={formData.language}
          onChange={handleChange}
        >
          <option value="english" className={styles.option}>
            {isMobile ? "Eng" : "English"}
          </option>
          <option value="german" className={styles.option}>
            {isMobile ? "Ger" : "German"}
          </option>
        </select>
        <svg className={styles.icon} aria-hidden="true">
          <use xlinkHref="/sprite.svg#down" />
        </svg>
      </div> */}

      <LanguageSelect
        variant="header"
        value={formData.language}
        onChange={(code) => setFormData(s => ({ ...s, language: code }))}
        shortLabels={isMobile}
      />


      {/* Enter по инпуту вызовет submit */}
      <button className="hidden" aria-label="search" type="submit">Search</button>
    </form>
  );
};

export default FormHeader;

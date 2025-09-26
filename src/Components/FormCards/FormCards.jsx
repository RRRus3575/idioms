import React, { useState, useEffect } from "react";
import styles from "./FormCards.module.css";
import { useMediaQuery } from "react-responsive";
import LanguageSelect from "@/Components/LanguageSelect/LanguageSelect";



const FormCards = ({ handleFormSubmit }) => {
  const [formData, setFormData] = useState({
    idiom: "",
    language: "english",
  });

  const isMobile = useMediaQuery({ maxWidth: 400 });
  
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
        <svg className={styles.search} width="16px" height="16px">
          <use xlinkHref={`/sprite.svg#find`} />
        </svg>
        <input
          name="idiom"
          onChange={handleChange}
          placeholder= {isMobile ? "Tap idiom" : "Tap idiom here"}
          className={styles.input}
        />
      </label>
      {/* <div className="form-select">
      <label>
      <svg className={styles.icon}>
          <use xlinkHref={`/sprite.svg#down`} />
        </svg>
      <select className={styles.select} onChange={handleChange}>
          <option value="en" className={styles.option}>
          {isMobile ? "Eng" : "English"}
            
          </option>
          <option value="de" className={styles.option}>
          {isMobile ? "Ger" : "Germany"}
          </option>
        </select>
        
      </label>
        
      </div> */}

        <LanguageSelect
          variant="card"
          value={formData.language}
          onChange={(code)=> setFilters(f => ({ ...f, language: code }))}
          shortLabels={isMobile}
        />

      <button className="hidden" aria-label="search" type="submit">Search</button>
    </form>
  );
};

export default FormCards;

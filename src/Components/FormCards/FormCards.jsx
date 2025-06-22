import React, { useState, useEffect } from "react";
import styles from "./FormCards.module.css";
import { useMediaQuery } from "react-responsive";


const FormCards = ({ handleFormSubmit }) => {
  const [formData, setFormData] = useState({
    idiom: "",
    language: "english",
  });

  const isMobile = useMediaQuery({ maxWidth: 400 });
  
  
  const handleChange = (event) => {
    const { name, value } = event.target;

    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);

    handleFormSubmit(updatedFormData);


  };
  return (
    <form className={styles.headerForm}>
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
      <div className="form-select">
      <label>
      <svg className={styles.icon}>
          <use xlinkHref={`/sprite.svg#down`} />
        </svg>
      <select className={styles.select} onChange={handleChange}>
          <option value="english" className={styles.option}>
          {isMobile ? "Eng" : "English"}
            
          </option>
          <option value="german" className={styles.option}>
          {isMobile ? "Ger" : "Germany"}
          </option>
        </select>
        
      </label>
        
      </div>
      <button className="hidden">Search</button>
    </form>
  );
};

export default FormCards;

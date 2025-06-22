import React, { useState, useEffect } from "react";
import styles from "./form.module.css";
import { useMediaQuery } from "react-responsive";


const FormHeader = ({ handleFormSubmit }) => {
  const [formData, setFormData] = useState({
    idiom: "",
    language: "english",
  });

  const isMobile = useMediaQuery({ maxWidth: 480 });
  
  
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
        <select className={styles.select} onChange={handleChange}>
          <option value="english" className={styles.option}>
          {isMobile ? "Eng" : "English"}
            
          </option>
          <option value="german" className={styles.option}>
          {isMobile ? "Ger" : "Germany"}
          </option>
        </select>
        <svg className={styles.icon}>
          <use xlinkHref={`/sprite.svg#down`} />
        </svg>
      </div>
      <button className="hidden" aria-label="search">Search</button>
    </form>
  );
};

export default FormHeader;

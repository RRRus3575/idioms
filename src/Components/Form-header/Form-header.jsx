import React, { useState, useEffect } from "react";
import sprite from "../../sprite.svg";
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
          <use xlinkHref={`${sprite}#find`} />
        </svg>
        <input
          name="idiom"
          onChange={handleChange}
          placeholder="Tap idiom here"
          className={styles.input}
        />
      </label>
      <div className="form-select">
        <select className={styles.select} onChange={handleChange}>
          <option value="english" className={styles.option}>
          {isMobile ? "Eng" : "English"}
            
          </option>
          <option value="german" className={styles.option}>
            German
          </option>
        </select>
        <svg className={styles.icon}>
          <use xlinkHref={`${sprite}#down`} />
        </svg>
      </div>
      <button className="hidden">Search</button>
    </form>
  );
};

export default FormHeader;

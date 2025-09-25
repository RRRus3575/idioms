import React, { useRef, useState } from "react";
import styles from "./FormHero.module.css";
import { useMediaQuery } from "react-responsive";

const FormHero = ({ onFormSubmit }) => {
  const [formData, setFormData] = useState({ idiom: "", language: "english" });
  const isMobile = useMediaQuery({ maxWidth: 750 });
  const inputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
  };

  const clearIdiom = () => {
    setFormData((s) => ({ ...s, idiom: "" }));
    inputRef.current?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { idiom: formData.idiom.trim(), language: formData.language };
    if (!payload.idiom) return;
    const p = onFormSubmit?.(payload);
    if (p && typeof p.then === "function") await p;
  };

  return (
    <form className={styles.heroForm} onSubmit={handleSubmit}>
      <label className={styles.inputLabel}>
        <svg className={styles.search} width="16" height="16" aria-hidden>
          <use xlinkHref={`/sprite.svg#find`} />
        </svg>

        <input
          ref={inputRef}
          name="idiom"
          value={formData.idiom}
          onChange={handleChange}
          placeholder={isMobile ? "Tap idiom" : "Tap idiom here"}
          className={styles.input}
          autoComplete="off"
        />

        {/* крестик показываем только если есть текст */}
        {formData.idiom.length > 0 && (
          <button
            type="button"
            className={styles.clear}
            onClick={clearIdiom}
            aria-label="Clear search"
          >
            {/* Можешь заменить на <use xlinkHref="/sprite.svg#close" /> если иконка есть в спрайте */}
            <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden>
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        )}
      </label>

      <div className={styles.formselect}>
        <select
          className={styles.select}
          name="language"
          value={formData.language}
          onChange={handleChange}
        >
          <option value="english" className={styles.option}>English</option>
          <option value="german"  className={styles.option}>German</option>
        </select>
        <svg className={styles.icon} aria-hidden>
          <use xlinkHref={`/sprite.svg#down`} />
        </svg>
      </div>

      <button type="submit" className={styles.button} aria-label="search">
        {isMobile ? (
          <svg width="16" height="16" aria-hidden>
            <use xlinkHref={`/sprite.svg#find`} />
          </svg>
        ) : (
          "Search"
        )}
      </button>
    </form>
  );
};

export default FormHero;

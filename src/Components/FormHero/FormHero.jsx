// components/FormHero/FormHero.jsx
import React, { useEffect, useRef, useState } from "react";
import styles from "./FormHero.module.css";
import { useMediaQuery } from "react-responsive";
import LanguageSelect from "@/Components/LanguageSelect/LanguageSelect";


const FormHero = ({ onFormSubmit, initialIdiom = "", initialLanguage = "en", onClear }) => {
  const [formData, setFormData] = useState({ idiom: initialIdiom, language: initialLanguage });
  const [dirty, setDirty] = useState(false); // ← пользователь редактирует
  const prevInitialIdiom = useRef(initialIdiom);
  const prevInitialLang  = useRef(initialLanguage);

  const isMobile = useMediaQuery({ maxWidth: 750 });

  // Если initialIdiom реально поменялся (напр., после сабмита) — обновляем и сбрасываем dirty
  useEffect(() => {
    if (initialIdiom !== prevInitialIdiom.current) {
      prevInitialIdiom.current = initialIdiom;
      setFormData((s) => ({ ...s, idiom: initialIdiom }));
      setDirty(false);
    }
  }, [initialIdiom]);

  // Язык синхроним всегда по факту смены initialLanguage
  useEffect(() => {
    if (initialLanguage !== prevInitialLang.current) {
      prevInitialLang.current = initialLanguage;
      setFormData((s) => ({ ...s, language: initialLanguage }));
    }
  }, [initialLanguage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
    if (name === "idiom") setDirty(true); // пользователь начал редактировать
  };

  const clearIdiom = () => {
    setFormData((s) => ({ ...s, idiom: "" }));
    setDirty(true);
    onClear?.();
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

        {formData.idiom && (
          <button
            type="button"
            className={styles.clear}
            onClick={clearIdiom}
            aria-label="Clear search"
          >
            <svg className={styles.image} width="16" height="16" aria-hidden>
              <use xlinkHref="/sprite.svg#plus"/>
            </svg>
          </button>
        )}
      </label>

      {/* <div className={styles.formselect}>
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
          <use xlinkHref="/sprite.svg#down" />
        </svg>
      </div> */}
      <LanguageSelect
        variant="hero"
        value={formData.language} // 'en' | 'de' | 'uk' | 'it' | 'pt'
        onChange={(code) => setFormData(s => ({ ...s, language: code }))}
        shortLabels={isMobile}
      />


      <button type="submit" className={styles.button} aria-label="search">
        {isMobile ? (
          <svg width="16" height="16" aria-hidden>
            <use xlinkHref="/sprite.svg#find" />
          </svg>
        ) : (
          "Search"
        )}
      </button>
    </form>
  );
};

export default FormHero;

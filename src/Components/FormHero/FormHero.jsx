import React, { useEffect, useRef, useState, forwardRef } from "react";
import styles from "./FormHero.module.css";
import { useMediaQuery } from "react-responsive";
import LanguageSelect from "@/Components/LanguageSelect/LanguageSelect";

const FormHero = forwardRef(function FormHero(
  { onFormSubmit, initialIdiom = "", initialLanguage = "en", onClear },
  ref // ← обязательно второй параметр у forwardRef
) {
  const [formData, setFormData] = useState({ idiom: initialIdiom, language: initialLanguage });
  const [dirty, setDirty] = useState(false);
  const prevInitialIdiom = useRef(initialIdiom);
  const prevInitialLang  = useRef(initialLanguage);

  const isMobile = useMediaQuery({ maxWidth: 750 });

  useEffect(() => {
    if (initialIdiom !== prevInitialIdiom.current) {
      prevInitialIdiom.current = initialIdiom;
      setFormData((s) => ({ ...s, idiom: initialIdiom }));
      setDirty(false);
    }
  }, [initialIdiom]);

  useEffect(() => {
    if (initialLanguage !== prevInitialLang.current) {
      prevInitialLang.current = initialLanguage;
      setFormData((s) => ({ ...s, language: initialLanguage }));
    }
  }, [initialLanguage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
    if (name === "idiom") setDirty(true);
  };

  // если пользователь стер всё руками — сразу чистим поиск
  useEffect(() => {
    if (!dirty) return;
    if (formData.idiom.trim() === "") {
      onClear?.();
      setDirty(false);
    }
  }, [formData.idiom, dirty, onClear]);

  const clearIdiom = () => {
    setFormData((s) => ({ ...s, idiom: "" }));
    setDirty(false);
    onClear?.();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const q = formData.idiom.trim();

    if (!q) {           // пустая строка -> сбрасываем поиск
      onClear?.();
      return;
    }
    const p = onFormSubmit?.({ idiom: q, language: formData.language });
    if (p && typeof p.then === "function") await p;
  };

  return (
    <form ref={ref} className={styles.heroForm} onSubmit={handleSubmit}>
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
              <use xlinkHref="/sprite.svg#plus" />
            </svg>
          </button>
        )}
      </label>

      <LanguageSelect
        variant="hero"
        value={formData.language}
        onChange={(code) => setFormData((s) => ({ ...s, language: code }))}
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
});

export default FormHero;

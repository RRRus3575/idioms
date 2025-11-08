import React, { useEffect, useRef, useState, forwardRef } from "react";
import styles from "./FormHero.module.css";
import { useMediaQuery } from "react-responsive";
import LanguageSelect from "@/Components/LanguageSelect/LanguageSelect";

// Разрешённые коды (без 'ru'). При необходимости оставь 'all' для режима "все языки".
const ALLOWED_LANGS = new Set(["en", "de", "it", "pt", "uk", "all"]);

// Универсальная нормализация входящего кода языка
const normalizeLang = (x) => {
  const v = String(x ?? "en").toLowerCase().trim();
  return ALLOWED_LANGS.has(v) ? v : "en";
};

const FormHero = forwardRef(function FormHero(
  { onFormSubmit, initialIdiom = "", initialLanguage = "en", onClear },
  ref
) {
  const isMobile = useMediaQuery({ maxWidth: 750 });

  const [formData, setFormData] = useState({
    idiom: initialIdiom,
    language: normalizeLang(initialLanguage),
  });

  const [dirty, setDirty] = useState(false);
  const prevInitialIdiom = useRef(initialIdiom);
  const prevInitialLang = useRef(normalizeLang(initialLanguage));

  // Синхронизация извне: идиома
  useEffect(() => {
    if (initialIdiom !== prevInitialIdiom.current) {
      prevInitialIdiom.current = initialIdiom;
      setFormData((s) => ({ ...s, idiom: initialIdiom }));
      setDirty(false);
    }
  }, [initialIdiom]);

  // Синхронизация извне: язык (с нормализацией)
  useEffect(() => {
    const next = normalizeLang(initialLanguage);
    if (next !== prevInitialLang.current) {
      prevInitialLang.current = next;
      setFormData((s) => ({ ...s, language: next }));
    }
  }, [initialLanguage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "idiom") {
      setFormData((s) => ({ ...s, idiom: value }));
      setDirty(true);
    } else if (name === "language") {
      setFormData((s) => ({ ...s, language: normalizeLang(value) }));
    }
  };

  // Если пользователь стёр запрос — сразу чистим результаты
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
    if (!q) {
      onClear?.();
      return;
    }
    const lang = normalizeLang(formData.language); // финальная защита
    const p = onFormSubmit?.({ idiom: q, language: lang });
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
        // Любое значение с селекта прогоняем через normalizeLang
        onChange={(code) => setFormData((s) => ({ ...s, language: normalizeLang(code) }))}
        shortLabels={isMobile}
        // Если у компонента есть проп для ограничения опций — раскомментируй:
        // allowed={Array.from(ALLOWED_LANGS)}
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

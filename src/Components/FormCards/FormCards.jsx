import React, { useState, useEffect } from "react";
import styles from "./FormCards.module.css";
import { useMediaQuery } from "react-responsive";
import LanguageSelect from "@/Components/LanguageSelect/LanguageSelect";

// те же разрешённые языки, что и в FormHero
const ALLOWED_LANGS = new Set(["en", "de", "it", "pt", "uk", "all"]);

// та же нормализация, что и в FormHero
const normalizeLang = (x) => {
  const v = String(x ?? "en").toLowerCase().trim();
  return ALLOWED_LANGS.has(v) ? v : "en";
};

const FormCards = ({ handleFormSubmit, onClear }) => {
  const isMobile = useMediaQuery({ maxWidth: 400 });

  const [formData, setFormData] = useState({
    idiom: "",
    language: normalizeLang("en"),
  });

  const [dirty, setDirty] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "idiom") {
      setFormData((prev) => ({ ...prev, idiom: value }));
      setDirty(true);
    }
  };

  // если пользователь сам стёр запрос — чистим результаты
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
    const lang = normalizeLang(formData.language);
    const p = handleFormSubmit?.({ idiom: q, language: lang });
    if (p && typeof p.then === "function") await p;
  };

  return (
    <form className={styles.headerForm} onSubmit={handleSubmit}>
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
        variant="card"
        value={formData.language}
        onChange={(code) =>
          setFormData((s) => ({ ...s, language: normalizeLang(code) }))
        }
        shortLabels={isMobile}
      />

      {/* скрытая кнопка для submit по Enter */}
      <button className="hidden" aria-label="search" type="submit">
        Search
      </button>
    </form>
  );
};

export default FormCards;

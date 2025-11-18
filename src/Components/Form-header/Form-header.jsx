import React, { useState, useEffect } from "react";
import styles from "./form.module.css";
import { useMediaQuery } from "react-responsive";
import LanguageSelect from "@/Components/LanguageSelect/LanguageSelect";
import { normalizeLang } from "@/utils/lang";

const FormHeader = ({ handleFormSubmit = () => {}, onClear }) => {
  const isMobile = useMediaQuery({ maxWidth: 480 });

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

  // если юзер сам стёр запрос — чистим результаты
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

  const onSubmit = (e) => {
    e.preventDefault();
    const q = formData.idiom.trim();
    if (!q) {
      onClear?.();
      return;
    }
    const lang = normalizeLang(formData.language);
    handleFormSubmit({ idiom: q, language: lang });
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
        variant="header"
        value={formData.language}
        onChange={(code) =>
          setFormData((s) => ({ ...s, language: normalizeLang(code) }))
        }
        shortLabels={isMobile}
      />

      {/* Enter по инпуту вызовет submit */}
      <button className="hidden" aria-label="search" type="submit">
        Search
      </button>
    </form>
  );
};

export default FormHeader;

// src/Components/LanguageSelect/LanguageSelect.jsx
import React from "react";
import styles from "./LanguageSelect.module.css";

const ALLOWED = ["pt","it","de","en","uk"];
const LABELS  = { en:"English", de:"German", uk:"Ukrainian", it:"Italian", pt:"Portuguese" };
const SHORT   = { en:"Eng",     de:"Ger",    uk:"Ukr",       it:"Ita",     pt:"Por" };
const cx = (...a) => a.filter(Boolean).join(" ");

export default function LanguageSelect({
  value = "en",
  onChange,
  variant = "hero",     // 'hero' | 'header' | 'card'
  shortLabels = false,
  className = "",
  name = "language",
  id,
}) {
  const safe = ALLOWED.includes(value) ? value : "en";
  return (
    <div className={cx(styles.wrapper, styles[`v_${variant}`])}>
      <select
        id={id}
        name={name}
        className={cx(styles.select, styles[`v_${variant}`], className)}
        value={safe}
        onChange={(e) => onChange?.(e.target.value)}
        aria-label="Language"
      >
        {ALLOWED.map(code => (
          <option key={code} value={code} className={styles.option}>
            {shortLabels ? (SHORT[code] || LABELS[code]) : LABELS[code]}
          </option>
        ))}
      </select>
      <svg className={cx(styles.icon, styles[`v_${variant}`])} aria-hidden>
        <use xlinkHref="/sprite.svg#down" />
      </svg>
    </div>
  );
}

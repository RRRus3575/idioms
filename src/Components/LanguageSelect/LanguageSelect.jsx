import React, { useRef, useState, useEffect } from "react";
import styles from "./LanguageSelect.module.css";

const ALLOWED = ["pt","it","de","en","uk"];
const LABELS  = { en:"English", de:"German", uk:"Ukrainian", it:"Italian", pt:"Portug." };
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
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  const getLabel = (code) => (shortLabels ? (SHORT[code] || LABELS[code]) : LABELS[code]);

  useEffect(() => {
    const onDoc = (e) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const choose = (code) => {
    onChange?.(code);
    setOpen(false);
  };

  return (
    <div ref={wrapRef} className={cx(styles.wrapper, styles[`v_${variant}`], className)}>
      {/* кнопка-имитатор select */}
      <button
        id={id}
        name={name}
        type="button"
        className={cx(styles.selectBtn, styles[`v_${variant}`])}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        {getLabel(safe)}
        <svg className={cx(`${styles.icon} ${open ? styles.turned : ""}`, styles[`v_${variant}`])} aria-hidden>
          <use xlinkHref="/sprite.svg#down" />
        </svg>
      </button>

      {open && (
        <div className={styles.menuWrap}>
          <ul className={styles.menu} role="listbox" aria-activedescendant={`opt-${safe}`}>
            {ALLOWED.map((code, i) => (
              <li key={code}>
                <button
                  id={`opt-${code}`}
                  type="button"
                  role="option"
                  aria-selected={code === safe}
                  className={cx(styles.item, i === 0 && styles.first, code === safe && styles.active)}
                  onClick={() => choose(code)}
                >
                  {getLabel(code)}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

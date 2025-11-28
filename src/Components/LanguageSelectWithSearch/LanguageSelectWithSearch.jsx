import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./LanguageSelectWithSearch.module.css";

export default function LanguageSelectWithSearch({
  options = [],
  value = "",
  onChange,
  placeholder = "Search language of the idiom…",
  clear,
  validationErrors
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const rootRef = useRef(null);

  // синхронизируем текст в инпуте с выбранным значением
  useEffect(() => {
    const current = options.find((o) => o.value === value);
    setSearch(current ? current.label : "");
  }, [value, options]);

  // клик вне — закрываем
  useEffect(() => {
    const handler = (e) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return options.filter((o) => o.label.toLowerCase().includes(q));
  }, [options, search]);

  const handleSelect = (option) => {
    onChange?.(option.value);
    setOpen(false);
  };

  const handleClear = () => {
    if (clear) {
      clear();
    } else {
      onChange?.("");
    }
    setSearch("");
    setOpen(false);
  };

  const hasText = search.trim().length > 0;

  return (
    <div ref={rootRef}>
      <div className={styles.inputWrap} onClick={() => setOpen(true)}>
        <svg className={styles.search} width="16" height="16" aria-hidden>
          <use xlinkHref="/sprite.svg#find" />
        </svg>

        <input
          className={`${styles.input} ${validationErrors.text ? styles.inputError : ""}`}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            if (!open) setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
        />

        {/* если есть текст — показываем плюс/крестик */}
        {hasText ? (
          <button
            type="button"
            className={styles.clear}
            onClick={handleClear}
            aria-label="Clear language"
          >
            <svg className={styles.clearIcon} width="16" height="16" aria-hidden>
              <use xlinkHref="/sprite.svg#plus" />
            </svg>
          </button>
        ) : (
          // если текста нет — показываем стрелку
          <svg
            className={`${styles.arrow} ${open ? styles.arrowOpen : ""}`}
            width="16"
            height="16"
            aria-hidden
          >
            <use xlinkHref="/sprite.svg#down" />
          </svg>
        )}

        {open && (
          <ul className={styles.list}>
            {filtered.length === 0 && (
              <li className={styles.empty}>Nothing found</li>
            )}
            {filtered.map((opt) => (
              <li
                key={opt.value}
                className={styles.item}
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleSelect(opt);
                }}
              >
                {opt.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
